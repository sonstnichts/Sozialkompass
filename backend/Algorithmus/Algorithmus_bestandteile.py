# Contains the different functions of the Algorithm

# used to change an array as a string to a normal array
import itertools
import copy
from ast import literal_eval
from datetime import datetime

# Setting up variables for traversing through the dictionaries
others:str = "Sonstiges"
attributes:str = "Attribute"


# Scans the Application List for all existing Attributes and counts how often they occur.
# Result is output as a dictionary
def calculate_attributes(application_list) -> dict:

    attribute:dict = {} #creation of an empty dictionary for out output

    #the function loops through all applications in the application list and then through all requirements (attributes) for each application
    for application in application_list: 
        for requirement in application[attributes].items(): 
            
            #a requirement can be nested. if thats the case we need a more complicated counter
            #if its not nested we just check whether the attribute was already counted before 
            if (requirement[0] != others): 
                if requirement[0] in attribute: 
                    attribute[requirement[0]] += 1 
                else:
                    attribute[requirement[0]] = 1 
            
            #if it is nested we only want to count each attribute once per nested requirement
            #thus we have to create a new second list to check against and append any nested requirements there
            #this is a bit longer but basically works in the same way
            else: 
                for nested_requirements in requirement[1]: 
                    added_key = [] 
                    for nested_requirement in nested_requirements: 
                        for key in nested_requirement: 
                            if key in attribute: 
                                if key not in added_key: 
                                    added_key.append(key) 
                                    attribute[key] += 1
                            else:
                                added_key.append(key)
                                attribute[key] = 1
    return attribute #returns the attribute list

#a function which gets all applications that are not ruled out yet
def calculate_result_set(application_list) -> list[str]:

    result_set:list[str] = [] #creates a list for the result set

    for application in application_list: #loops through the applications
        result_set.append(application["Name"]) #gets the name of the application and adds it to the result set
    
    return result_set 

# ! THIS IS NOT THE FINAL IMPLEMENTATION
# ! IT DOES NOT WORK
# ! THESE COMMENTS ARE NOT FINAL BECAUSE I PROBABLY NEED TO DO A MAJOR REWORK HERE
def determine_attribute(all_attributes_original, attributes_numbered,brute_force_depth, application_list) -> str:
    #* adds alle relevant attributes to allAttributes
    attributes_ranked:list = [] #list of attributes ranked by relevance
    for attribute in attributes_numbered.items(): #loops through the attributes
        append_array = [] #creates a temporary array
        append_array.append(attribute[0])
        append_array.append(attribute[1])
        append_array.append(len(generate_answers(application_list, attribute[0], all_attributes_original[attribute[0]]))) #adds the number of possibilities to the attribute
        attributes_ranked.append(append_array) #adds the attribute to the list of attributes
       
    attributes_ranked.sort(key=lambda x: (x[1], x[2]), reverse=True) #sort attributesRanked by uses and distinctPossibilities
    if (brute_force_depth == 0): #if brute forcing is disabled
        return attributes_ranked[0][0] #returns the first attribute in the list
    attributes_ranked = attributes_ranked[:brute_force_depth] #cut attributesRanked to the length of bruteForceDepth    

    # * creates trees according to differently weighted attribute lists
    #! we will end up with a lot of permuatiations (n!) here, this is probably bad for the runtime
    #! we should probably cap this some other way (time?) or always set the brute force depth to a reasonable number
    #? maybe 5 for the brute force depth? that would be 120 permutations, which could still be very slow
    #? maybe we should take a semi-random sample of the permutations? would be faster
    #! something is still wrong here, [attribute, #nodes] is appended twice in some cases
    tree_list:list = [] #creates a list of trees
    attribute_combinations = list(itertools.permutations(attributes_ranked)) #creates a list of all possible combinations of attributes
    for attribute_sequence in attribute_combinations:
        tree_list.append(create_mock_tree(list(attribute_sequence), 0, application_list, all_attributes_original, [])) #creates a tree for each attribute combination and adds it to the treeList
    
    # * chooses the smallest tree
    tree_list.sort(key=lambda x: (x[1]), reverse=True) #sorts the treeList by the number of nodes
    best_attribute = tree_list[0][0] #gets the first attribute from the first tree in the treeList

    # * returns the first attribute which created the smallest tree
    return best_attribute

# we need to create a list of the nodes here and then just use the start attribute which leads to the fewest nodes
# ! THIS IS NOT THE FINAL IMPLEMENTATION
# ! IT DOES NOT WORK
# ! BECAUSE OF THIS IT IS NOT COMMENTED!
def create_mock_tree(attribute_sequence, index, application_list, all_attributes, node_list): #shortended implementation of algorithm.py, only diffences commented
    accepted_applications = []
    if(index >= len(attribute_sequence)): #checks if the index is out of bounds
        return
    question = attribute_sequence[index][0] #gets the question from the attribute sequence
    question_type = all_attributes[question]
    result_set = calculate_result_set(application_list) 
    node = create_node(question,result_set, [], "", "")
    possible_answers = generate_answers(application_list,question,question_type)
    for possible_answer in possible_answers:
        application_list_copy = copy.deepcopy(application_list)
        delete_rows(application_list_copy,question,possible_answer,question_type)
        remove_applications(application_list_copy)
        accepted_applications_copy = copy.deepcopy(accepted_applications)
        accept_applications(application_list_copy,accepted_applications_copy)
        node["Antworten"].append({"Bezeichnung":possible_answer})
        index += 1
        node_list.append(create_mock_tree(attribute_sequence,index,application_list,all_attributes, []))
    return [attribute_sequence[0][0], len(node_list)]


def create_node(question, result_set, skipped_attributes,nodeId,parentId,accepted_applications) -> dict:

    tree:dict = {} #creates the tree structure
    tree["_id"] = nodeId
    if parentId != "":
        tree["parentId"] = parentId
    else:
        tree["time"] = str(datetime.now())
    tree["Attribut"] = question #adds the question to the tree with the key "Frage"
    tree["Ergebnismenge"] = result_set #adds the result set to the tree with the key "Ergebnismenge"
    tree["Antworten"] = [] #creates an empty space for the answers
    if accepted_applications:
        tree["Akzeptiert"] = accepted_applications
    if skipped_attributes: #if any attributes were skipped:_
        tree["skippedAttributes"] = skipped_attributes #adds the skipped attributes to the tree with the key "skippedAttributes"

    return tree #returns the tree

#a function which just returns the most often used attribute as calculated by calculate_attributes
#* the plan is to replace this function once determine_attribute works
def return_max(allAttributesOriginal) -> str:
    return max(allAttributesOriginal, key = allAttributesOriginal.get)

def delete_rows(application_list_copy, question, answer_possibilities, questiontype):
    
    def check_result(questiontype,answers,results):

        returnvalue = True

        match questiontype:
            
            case "Auswahl":
                for answer in answers:
                    if answer in results:
                        returnvalue = False
            case "Ganzzahl":
                range = literal_eval(answers)
                if results[0] <= range [0] and results[1] >= range[1]:
                    returnvalue = False

        return returnvalue

    deleted_rows = []
    deleted_rows_other = []

    for id_application,application in enumerate(application_list_copy):
        if question in application[attributes]:
            if check_result(questiontype,answer_possibilities,application[attributes][question]):
                deleted_rows.append(id_application)
            else:
                del application[attributes][question]

        if others in application[attributes]:
            for id_lists,lists in enumerate(application[attributes][others]):
                for index, entry in enumerate(lists):
                    if question in entry:
                        if check_result(questiontype,answer_possibilities,entry[question]):
                            deleted_rows_other.append((id_application,id_lists,index))
                        else:
                            del lists[index][question]

    for deleted_row in reversed(deleted_rows_other):
        application_list_copy[deleted_row[0]][attributes][others][deleted_row[1]].pop(deleted_row[2])

    for deleted_row in reversed(deleted_rows):
        application_list_copy.pop(deleted_row)

def remove_applications(application_list_copy) -> None:
#optimise array operations
    rejected_applications = []
    removed_table_entries = []

    for id_application,application in enumerate(application_list_copy):
        if others in application[attributes]:
            for index_lists,lists in enumerate(application[attributes][others]):
                if not lists:
                    rejected_applications.append(id_application)
                else:
                    for index_list,entry in enumerate(lists):
                        if not entry:
                            removed_table_entries.append((id_application,index_lists,index_list))
    #Anträge entfernen


    for table_index in reversed(removed_table_entries):
        application_list_copy[table_index[0]][attributes][others][table_index[1]].pop(table_index[2])
        if not application_list_copy[table_index[0]][attributes][others][table_index[1]]:
            application_list_copy[table_index[0]][attributes][others].pop(table_index[1])
        if not application_list_copy[table_index[0]][attributes][others]:
            del application_list_copy[table_index[0]][attributes][others]

    for application_index in reversed(rejected_applications):
        application_list_copy.pop(application_index)

def accept_applications(application_list_copy,accepted_applications_copy) -> None:

    accepted_applications = []

    for id_application,application in enumerate(application_list_copy):
        if not application[attributes]:
            accepted_applications.append(id_application)
            accepted_applications_copy.append(application["Name"])

    #remove applications

    for application in reversed(accepted_applications):
        application_list_copy.pop(application)

# generates a list of all possible different answers that are left in the applicationlist for the chosen question.
def generate_answers(application_list:dict,question:str,attribute_category:str) -> list[str]: # Not done yet

    match attribute_category:

        # In case of a selection, the possible answers of the attributes are being returned-
        case "Auswahl":
            answers:list[str] = []

            for application in application_list:
                if question in application[attributes]:
                    for answer in application[attributes][question]:
                        if not answers.__contains__([answer]):
                            answers.append([answer])
                if others in application[attributes]:
                    for lists in application[attributes][others]:
                        for entry in lists:
                            if question in entry:
                                for answer in entry[question]:
                                    if not answers.__contains__([answer]):
                                        answers.append([answer])
            return answers

        # In case of a numberinput, ranges are created
        case "Ganzzahl":

            # Maximum value for an input of a user
            max_int = 10000000

            # Determines how many digits after the decimalpoint the algorithm accepts.
            # Just add zeros after the comma
            smallest_unit = 0.01

            # A list for all relevant lower and upper bounds is created
            lower_bounds = []
            upper_bounds = []
            
            # Boundlists are filled with the entries in the applicationlist.
            for application in application_list:
                if question in application[attributes]:
                    lower_bounds.append(application[attributes][question][0])
                    upper_bounds.append(application[attributes][question][1])
                if others in application[attributes]:
                    for lists in application[attributes][others]:
                        for entry in lists:
                            if question in entry:
                                lower_bounds.append(entry[question][0])
                                upper_bounds.append(entry[question][1])

            # In both lists duplicates are removed and result gets sorted
            lower_bounds = list(dict.fromkeys(lower_bounds))
            lower_bounds.sort()
            upper_bounds = list(dict.fromkeys(upper_bounds))
            upper_bounds.sort()

            # resultlist is created
            result = []

            # if there is no zero as a lowerBound, a lowerbound of zero is created
            lastvalue = lower_bounds[0]-smallest_unit
            if lower_bounds[0]>0:
                result.append(str([0,lastvalue]))
                lower_bounds.pop(0)
            else:
                lastvalue = -smallest_unit
                lower_bounds.pop(0)

            # two lists progressively get smaller
            while lower_bounds or upper_bounds:
                if lower_bounds:
                    if lower_bounds[0]>upper_bounds[0]:
                        result.append(str([lastvalue+smallest_unit,upper_bounds[0]]))
                        lastvalue = upper_bounds.pop(0)
                    else:
                        result.append(str([lastvalue+smallest_unit,lower_bounds[0]-smallest_unit]))
                        lastvalue = lower_bounds.pop(0)-smallest_unit
                else:
                    result.append(str([lastvalue+smallest_unit,upper_bounds[0]]))
                    lastvalue = upper_bounds.pop(0)
            # last entry with the highest upperbound and the maximum value is appended
            result.append(str([lastvalue+smallest_unit,max_int]))
            return result

# done
def delete_rows_none_of_the_above (application_list_copy, question) -> None:

    for application in application_list_copy:

        if question in application[attributes]:
            del application[attributes][question]

        if others in application[attributes]:
            for list in application[attributes][others]:
                for entry in list:
                    if question in entry:
                        del entry[question]

# an operation that takes an array of arrays and splits it into its subsets
# Example input: [["a", "b", "c"], ["c"], ["c", "d"], ["e", "f", "g"], ["f", "g"]]
# Example outupt: [["a", "b"], ["c"], ["d"], ["e"], ["f", "g"]]
def split_array(input_array):
    result_array = [] #creates an empty array for the results
    if not input_array: #checks if the input_array is empty
        return result_array #needs to stop here, otherwise the next line would throw an error
    result_array.append(input_array[0]) #adds the first element of the input array to the result array
    input_array.pop(0) #removes the first element of the array
    
    #* checks every array in the imput array against every array in the result array
    for sub_input in input_array: 
        for sub_result in result_array: 
            
            #* three distinct cases are checked
            #* 1. if the sub_array is a subset of the result
            # if this is the case we first check if its exactly the same array, in that case we do nothing as the array is already in the result
            # if its not the same we remove all elements from the sub result that are also in the sub input and add the sub input as a new array to the result
            if set(sub_input).issubset(set(sub_result)): 
                if sub_input == sub_result: 
                    continue 
                for element in sub_input: 
                    sub_result.remove(element) 
                if not sub_input in result_array: 
                    result_array.append(sub_input)
            
            #* 2. if the sub result is a subset of the sub input
            # again we first check if the inputs are the same, if they are we do nothing
            # ? is this even needed? this case would probably be caught by the first if statement
            # if it's not the same array we remove all elements that are already in the result from the input and add the modified input as a new array to the result
            elif set(sub_result).issubset(set(sub_input)): 
                if sub_input == sub_result: 
                    continue 
                for element in sub_result: 
                    sub_input.remove(element) 
                if not sub_input in result_array: 
                    result_array.append(sub_input) 

            #* 3. if the sub result and the sub input aren't subsets of each other
            # in this case we have to check all the elements against eachother
            # if the element is in both arrays we remove it from the sub input. if the current sub result is not atomar we remove the element from it and append it as a new array to the result
            # if the sub imput is modiefied so far to be totally unique we add it to the result
            else:
                for input_element in sub_input: 
                    for result_element in sub_result: 
                        if input_element == result_element: 
                            sub_input.remove(input_element) 
                            if len(sub_result) > 1: 
                                sub_result.remove(input_element) 
                                result_array.append([input_element]) 
                if not sub_input in result_array:
                    result_array.append(sub_input)

    return result_array #return the result array

#! not currently used
# used for generating the skip attribute
def handleskip(application_list,question):
    for application in application_list:
        if question in application[attributes]:
            del application[attributes][question]
        if others in application[attributes]:
            for lists in application[attributes][others]:
                for entry in lists:
                    if question in entry:
                        del entry[question]
            for list in application[attributes][others]:
                filter(lambda entry: entry,list)
            filter(lambda entry: entry,application[attributes][others])
            if not application[attributes][others]:
                del application[attributes][others]
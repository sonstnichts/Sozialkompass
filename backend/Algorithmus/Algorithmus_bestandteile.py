# Contains the different functions of the Algorithm

# used to change an array as a string to a normal array
import itertools
import copy
from ast import literal_eval
from datetime import datetime

# Scans the Application List for all existing Attributes and counts how often they occur.
# Result is output as a dictionary
def calculate_attributes(application_list):

    attribute = {}

    for application in application_list: #loops throught the applications
        for requirement in application["Attribute"].items(): #loops through all requirements (attributes) an application has
            if (requirement[0] != "Sonstiges"): #checks if the requirement  not nested
                if requirement[0] in attribute: #checks if the requirement is already in the attribute list
                    attribute[requirement[0]] += 1 #if it is it increases the counter
                else:
                    attribute[requirement[0]] = 1 #if it isn't it creates a new entry in the attribute list
            else: #if the requirement is nested
                for nested_requirements in requirement[1]: #loops through the information after the "sonstige" keyword
                    for nested_requirement in nested_requirements: #loops through the nested requirements themselves
                        for key in nested_requirement: #loops through the keys of each nested requirement (should only be one)
                            if key in attribute: #same check for adding an attribute as above
                                attribute[key] += 1
                            else:
                                attribute[key] = 1
    return attribute #returns the attribute list

def calculate_result_set(application_list):

    result_set = [] #creates a list for the result set

    for application in application_list: #loops through the applications
        result_set.append(application["Name"]) #gets the name of the application and adds it to the result set
    
    return result_set 

def determine_attribute(all_attributes_original, attributes_numbered,brute_force_depth, application_list):
    #* adds alle relevant attributes to allAttributes
    all_attributes = copy.deepcopy(all_attributes_original)
    for attribute in attributes_numbered.items(): #loops through the attributes
        all_attributes[attribute[0]]["uses"] = attributes_numbered[attribute[0]]
        all_attributes[attribute[0]]["distinctPossibilities"] =  len(generate_answers(application_list, attribute[0], all_attributes)) #adds the number of possibilities to the attribute
       
    #* sorts the attributeList by our relevance metric
    #? should this be more mathematical? right now we only rank by the number of uses and then the distinct possibilities
    #? we could do some cool maths or averages or something like that here
    attributes_ranked = [] #list of attributes ranked by relevance
    for key in all_attributes:
        if(all_attributes[key].get("uses") != None):
            attributes_ranked.append([key, all_attributes[key].get("uses"), all_attributes[key].get("distinctPossibilities")]) #adds the attribute and its relevance to the list
    
    attributes_ranked.sort(key=lambda x: (x[1], x[2]), reverse=True) #sort attributesRanked by uses and distinctPossibilities
    attributes_ranked = attributes_ranked[:brute_force_depth] #cut attributesRanked to the length of bruteForceDepth    

    # * creates trees according to differently weighted attribute lists
    #! we will end up with a lot of permuatiations (n!) here, this is probably bad for the runtime
    #! we should probably cap this some other way (time?) or always set the brute force depth to a reasonable number
    #? maybe 5 for the brute force depth? that would be 120 permutations, which could still be very slow
    #? maybe we should take a semi-random sample of the permutations? would be faster

    tree_list = [] #creates a list of trees
    attribute_combinations = list(itertools.permutations(attributes_ranked)) #creates a list of all possible combinations of attributes
    for attribute_sequence in attribute_combinations:
        tree_list.append(create_mock_tree(list(attribute_sequence), 0, application_list, all_attributes)) #creates a tree for each attribute combination and adds it to the treeList
    
    # * chooses the smallest tree
    #get the smallest tree from the treeList
    smallest_depth = 100000000 #sets the smallestDepth to a very high number
    smallest_tree = {} #creates a variable for the smallest tree
    
    for tree in tree_list: #evaluates every tree in the treeList
        if tree_depth(tree[0]) < smallest_depth: #checks if the depth of the tree is smaller than the smallestDepth
            smallest_depth = tree_depth(tree[0]) #if yes it sets the smallestDepth to the depth of the tree
            smallest_tree = tree #and sets the smallestTree to the tree

    # * returns the first attribute which created the smallest tree
    #return max(allAttributesOriginal, key = allAttributesOriginal.get) #old return statement for testing
    return smallest_tree[1][0][0]

def create_mock_tree(attribute_sequence, index, application_list, all_attributes): #shortended implementation of algorithm.py, only diffences commented
    result_set = calculate_result_set(application_list)
    if not attribute_sequence:
        return result_set
    question = attribute_sequence[index][0] #gets the question from the attributeSequence
    tree = create_subtree(question, result_set, [])
    if not application_list:
        answer_set = []
    else:
        answer_set = generate_answers(application_list, question, all_attributes)
    for possible_answer in answer_set:
        application_list_copy = copy.deepcopy(application_list)
        delete_rows(application_list_copy,question,possible_answer,all_attributes[question]["Kategorie"])
        remove_applications(application_list_copy)
        delete_columns(application_list_copy,question)
        if(len(attribute_sequence) - 1 > index): #checks if there are more attributes in the attributeSequence
            index += 1 #if yes it increases the index
            tree["Antworten"][possible_answer] = create_mock_tree(attribute_sequence, index, application_list_copy, all_attributes) #creates the subtree from the next attribute
    return [tree, attribute_sequence] #returns the tree and its coresponding attributeSequence

#! not sure if this is a great way to do this
#! probably not
#! should be reworked with a proper implementation
def tree_depth(tree):
    tree_depth = len(tree) #tree depth is the number of keys in the tree, which is very shallow. we need to evaluate the depth of the longest path on the tree
    return tree_depth

def create_node(question, result_set, skipped_attributes,nodeId,parentId):

    tree = {} #creates the tree structure
    tree["_id"] = nodeId
    if parentId != "":
        tree["parentId"] = parentId
    else:
        tree["time"] = str(datetime.now())
    tree["Attribut"] = question #adds the question to the tree with the key "Frage"
    tree["Ergebnismenge"] = result_set #adds the result set to the tree with the key "Ergebnismenge"
    tree["Antworten"] = [] #creates an empty space for the answers

    if skipped_attributes: #if any attributes were skipped
        tree["skippedAttributes"] = skipped_attributes #adds the skipped attributes to the tree with the key "skippedAttributes"

    return tree #returns the tree

def return_max(allAttributesOriginal):
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
        if question in application["Attribute"]:
            if check_result(questiontype,answer_possibilities,application["Attribute"][question]):
                deleted_rows.append(id_application)
            else:
                del application["Attribute"][question]

        if "Sonstiges" in application["Attribute"]:
            for id_lists,lists in enumerate(application["Attribute"]["Sonstiges"]):
                for index, entry in enumerate(lists):
                    if question in entry:
                        if check_result(questiontype,answer_possibilities,entry[question]):
                            deleted_rows_other.append((id_application,id_lists,index))
                        else:
                            del lists[index][question]

    for deleted_row in reversed(deleted_rows_other):
        application_list_copy[deleted_row[0]]["Attribute"]["Sonstiges"][deleted_row[1]].pop(deleted_row[2])

    for deleted_row in reversed(deleted_rows):
        application_list_copy.pop(deleted_row)

def remove_applications(application_list_copy):
#optimise array operations
    rejected_applications = []
    removed_table_entries = []

    for id_application,application in enumerate(application_list_copy):
        if "Sonstiges" in application["Attribute"]:
            for index_lists,lists in enumerate(application["Attribute"]["Sonstiges"]):
                if not lists:
                    rejected_applications.append(id_application)
                else:
                    for index_list,entry in enumerate(lists):
                        if not entry:
                            removed_table_entries.append((id_application,index_lists,index_list))
    #Anträge entfernen


    for table_index in reversed(removed_table_entries):
        application_list_copy[table_index[0]]["Attribute"]["Sonstiges"][table_index[1]].pop(table_index[2])
        if not application_list_copy[table_index[0]]["Attribute"]["Sonstiges"][table_index[1]]:
            application_list_copy[table_index[0]]["Attribute"]["Sonstiges"].pop(table_index[1])
        if not application_list_copy[table_index[0]]["Attribute"]["Sonstiges"]:
            del application_list_copy[table_index[0]]["Attribute"]["Sonstiges"]

    for application_index in reversed(rejected_applications):
        application_list_copy.pop(application_index)

def accept_applications(application_list_copy,accepted_applications_copy):

    accepted_applications = []

    for id_application,application in enumerate(application_list_copy):
        if not application["Attribute"]:
            accepted_applications.append(id_application)
            accepted_applications_copy.append(application["Name"])

    #remove applications

    for application in reversed(accepted_applications):
        application_list_copy.pop(application)

def generate_answers(application_list,question,attribute_category): # Not done yet

    match attribute_category:

        # In case of a selection, the possible answers of the attributes are being returned-
        case "Auswahl":
            answers = []

            for application in application_list:
                if question in application["Attribute"]:
                    for answer in application["Attribute"][question]:
                        if not answers.__contains__(answer):
                            answers.append([answer])
                if "Sonstiges" in application["Attribute"]:
                    for lists in application["Attribute"]["Sonstiges"]:
                        for entry in lists:
                            if question in entry:
                                for answer in entry[question]:
                                    if not answers.__contains__(answer):
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
                if question in application["Attribute"]:
                    lower_bounds.append(application["Attribute"][question][0])
                    upper_bounds.append(application["Attribute"][question][1])
                if "Sonstiges" in application["Attribute"]:
                    for lists in application["Attribute"]["Sonstiges"]:
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
def delete_rows_none_of_the_above (application_list_copy, question):

    for application in application_list_copy:

        if question in application["Attribute"]:
            del application["Attribute"][question]

        if "Sonstiges" in application["Attribute"]:
            for list in application["Attribute"]["Sonstiges"]:
                for entry in list:
                    if question in entry:
                        del entry[question]

def split_array(array):
    result_array = [] #creates an empty array for the results
    result_array.append(array[0]) #adds the first element of the array to the result array
    array.pop(0) #removes the first element of the array
    for sub_array in array: #iterates over the remaining elements of the array
        for result in result_array: #iterates over the elements of the result array
            for element in sub_array: #iterates over the elements of the sub array
                for result_element in result: #iterates over the elements of the result from the erlier iteration
                    if element == result_element: #if the element is already in the result array
                        sub_array.remove(element) #remove the element from the sub array
                        if len(result) > 1: #if the elment isn't already atomar
                            result.remove(element) #remove the element from the results
                            result_array.append([element]) #add the element to the result array
        if sub_array: #if the sub array isn't empty
            result_array.append(sub_array) #add the sub array to the result array
    return result_array #return the result array
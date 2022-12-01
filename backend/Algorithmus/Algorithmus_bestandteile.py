# Contains the different functions of the Algorithm

# used to change an array as a string to a normal array
import itertools
import copy
from ast import literal_eval

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

def create_subtree(question, result_set, skipped_attributes):

    tree = {} #creates the tree structure
    tree["Frage"] = question #adds the question to the tree with the key "Frage"
    tree["Ergebnismenge"] = result_set #adds the result set to the tree with the key "Ergebnismenge"
    tree["Antworten"] = {} #creates an empty space for the answers

    if skipped_attributes: #if any attributes were skipped
        tree["skippedAttributes"] = skipped_attributes #adds the skipped attributes to the tree with the key "skippedAttributes"

    return tree #returns the tree


def delete_rows(application_list_copy, question, answer_possibilities, questiontype):
    
    delete_rows = []

    match questiontype:

        case "Auswahl":

            for application in application_list_copy.items():
                for idx,condition in enumerate(application[1]["Attribute"]):
                    for row in condition.items():
                        if row[0] == question and row[1] != answer_possibilities:
                            delete_rows.append((application[0],idx))

        case "Ganzzahl":

            range = literal_eval(answer_possibilities)

            for application in application_list_copy.items():
                for idx,condition in enumerate(application[1]["Attribute"]):
                    for row in condition.items():
                        if row[0] == question and (row[1][0] > range[1] or row[1][1] < range[0]):
                            delete_rows.append((application[0],idx))
            
        
    #delete rows

    for delete_item in reversed(delete_rows):
        application_list_copy[delete_item[0]]["Attribute"].pop(delete_item[1])

def remove_applications(application_list_copy):

    rejected_applications = []

    for application in application_list_copy.items():
        if not application[1]["Attribute"]:
            rejected_applications.append(application[0])

    #Anträge entfernen

    for application in rejected_applications:
        del application_list_copy[application]

def delete_columns(application_list_copy, question):

    deleted_columns = []
    

    for antrag in application_list_copy.items():
        for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
            for zeilen in bedingungen.items():
                if zeilen[0] == question:
                    deleted_columns.append((antrag[0],idx))

    #Spalten löschen
    for delete_item in reversed(deleted_columns):
        del application_list_copy[delete_item[0]]["Attribute"][delete_item[1]][question]
        if not application_list_copy[delete_item[0]]["Attribute"][delete_item[1]]:
            application_list_copy[delete_item[0]]["Attribute"].pop(delete_item[1])

def accept_applications(application_list_copy,accepted_applications_copy):

    accepted_applications = []

    for application in application_list_copy.items():
        if not application[1]["Attribute"]:
            accepted_applications.append(application[0])
            accepted_applications_copy.append(application[0])

    #remove applications

    for application in accepted_applications:
        del application_list_copy[application]

def generate_answers(application_list,question,attribute):

    attribute_category = attribute[question]["Kategorie"]

    match attribute_category:

        # In case of a selection, the possible answers of the attributes are being returned-
        case "Auswahl":
            return attribute[question]["Antwortmoeglichkeiten"]

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
            for application in application_list.items():
                for requirements in application[1]["Attribute"]:
                    for entry in requirements.items():
                        if entry[0] == question:
                            lower_bounds.append(entry[1][0])
                            upper_bounds.append(entry[1][1])

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

def delete_rows_none_of_the_above (application_list_copy, question):

    for application in application_list_copy:

        if question in application["Attribute"]:
            del application["Attribute"][question]
            
        if "Sonstiges" in application["Attribute"]:
            for list in application["Attribute"]["Sonstiges"]:
                for entry in list:
                    if question in entry:
                        del entry[question]
    
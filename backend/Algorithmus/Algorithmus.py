import copy
from Algorithmus import Algorithmus_bestandteile
from bson.objectid import ObjectId


def create_tree(application_list, attribute, skipped_attributes,accepted_applications, brute_force_depth,nodelist,nodeId,parentId):

    # Creates a list of applications that can still be result based on the given answers
    result_set = Algorithmus_bestandteile.calculate_result_set(application_list)

    # Calculates which attributes still need to be asked for and calculates how often they still appeare
    attribute_list = Algorithmus_bestandteile.calculate_attributes(application_list)


    # terminates the algorithm if all attributes are cleared
    if not attribute_list:
        result_node = {}
        result_node["parentId"] = parentId
        result_node["_id"] = nodeId
        result_node["result"] = accepted_applications
        if skipped_attributes:
            result_node["skippedAttributes"] = skipped_attributes
        nodelist.append(result_node)
        return


    # Choses the attribute that should be asked first
    # Changes in the rule for choosing the attribute should happen in this method.
    question = Algorithmus_bestandteile.determine_attribute(attribute, attribute_list, brute_force_depth, application_list)
    question_type = attribute[question]

    # choose the template for the subtree
    node = Algorithmus_bestandteile.create_node(question,result_set,skipped_attributes,nodeId,parentId,accepted_applications)

    # determines the possible answers for the question
    possible_answers = Algorithmus_bestandteile.generate_answers(application_list,question,question_type)

    # iterates over all answers and recursivly creates trees
    for possible_answer in possible_answers:

        # create a copy of the application list to not change the original
        application_list_copy = copy.deepcopy(application_list)

        # remove irrelevant rows from the copy
        Algorithmus_bestandteile.delete_rows(application_list_copy,question,possible_answer,question_type)
        
        # check which applications are no longer relevant and remove those
        Algorithmus_bestandteile.remove_applications(application_list_copy)

        # Accepts applications in the passed array
        accepted_applications_copy = copy.deepcopy(accepted_applications)
        Algorithmus_bestandteile.accept_applications(application_list_copy,accepted_applications_copy)

        # recursivly fill the subtee
        #tree["Antworten"][str(possible_answer)] = create_tree(application_list_copy,attribute,skipped_attributes,accepted_applications_copy, brute_force_depth,nodelist)
        childNodeId = str(ObjectId())
        node["Antworten"].append({"Bezeichnung":possible_answer,"NodeId":childNodeId})
        create_tree(application_list_copy,attribute,skipped_attributes,accepted_applications_copy, brute_force_depth,nodelist,childNodeId,nodeId)

    if question_type == "Auswahl":
        application_list_copy = copy.deepcopy(application_list)
        skipped_copy = copy.deepcopy(skipped_attributes)
        Algorithmus_bestandteile.delete_rows(application_list_copy,question,"[-1]",question_type)
        Algorithmus_bestandteile.remove_applications(application_list_copy)
        skipped_copy.append(question)
        accepted_applications_copy = copy.deepcopy(accepted_applications)
        childNodeId = str(ObjectId())
        node["noneoftheabove"]=childNodeId
        create_tree(application_list_copy,attribute,skipped_copy,accepted_applications_copy,brute_force_depth,nodelist,childNodeId,nodeId)
    
    nodelist.append(node)
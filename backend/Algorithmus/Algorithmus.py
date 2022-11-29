import copy
from Algorithmus import Algorithmus_bestandteile

def create_tree(application_list, attribute, skipped_attributes,accepted_applications, brute_force_depth):

    # Creates a list of applications that can still be result based on the given answers
    result_set = Algorithmus_bestandteile.calculate_result_set(application_list)

    # Calculates which attributes still need to be asked for and calculates how often they still appeare
    attribute_list = Algorithmus_bestandteile.calculate_attributes(application_list)


    # terminates the algorithm if all attributes are cleared
    if not attribute_list:
        return_tree = {}
        return_tree["result"] = accepted_applications
        if skipped_attributes:
            return_tree["skippedAttributes"] = skipped_attributes
        return return_tree


    # Choses the attribute that should be asked first
    # Changes in the rule for choosing the attribute should happen in this method.
    question = Algorithmus_bestandteile.determine_attribute(attribute, attribute_list, brute_force_depth, application_list)
    question_type = attribute[question]["Kategorie"]

    # choose the template for the subtree
    tree = Algorithmus_bestandteile.create_subtree(question,result_set,skipped_attributes)

    # determines the possible answers for the question
    possible_answers = Algorithmus_bestandteile.generate_answers(application_list,question,attribute)

    # Durch Antwortmöglichkeiten iterieren und Teilbäume bilden
    for possible_answer in possible_answers:

        # create a copy of the application list to not change the original
        application_list_copy = copy.deepcopy(application_list)

        # remove irrelevant rows from the copy
        Algorithmus_bestandteile.delete_rows(application_list_copy,question,possible_answer,question_type)
        
        # check which applications are no longer relevant and remove those
        Algorithmus_bestandteile.remove_applications(application_list_copy)

        # remove irrelevant columns from the copy
        Algorithmus_bestandteile.delete_columns(application_list_copy,question)

        # Accepts applications in the passed array
        accepted_applications_copy = copy.deepcopy(accepted_applications)
        Algorithmus_bestandteile.accept_applications(application_list_copy,accepted_applications_copy)

        # recursivly fill the subtee
        tree["Antworten"][possible_answer] = create_tree(application_list_copy,attribute,skipped_attributes,accepted_applications_copy, brute_force_depth)

    # insert a skip option into the tree
    #! This option leads to a lot of new subtrees
    #! This causes the runtime of the alforithm and the file size of the result to increase drastically
    application_list_copy = copy.deepcopy(application_list)
    Algorithmus_bestandteile.delete_columns(application_list_copy,question)
    skipped_copy = copy.deepcopy(skipped_attributes)
    skipped_copy.append(question)
    accepted_applications_copy = copy.deepcopy(accepted_applications)
    Algorithmus_bestandteile.accept_applications(application_list_copy,accepted_applications_copy)
    tree["skip"] = create_tree(application_list_copy,attribute,skipped_copy,accepted_applications_copy,brute_force_depth)

    # insert a none of the above option in case of a category question
    if question_type == "Auswahl":
        application_list_copy = copy.deepcopy(application_list)
        Algorithmus_bestandteile.delete_rows_none_of_the_above(application_list_copy,question)
        Algorithmus_bestandteile.remove_applications(application_list_copy)
        Algorithmus_bestandteile.delete_columns(application_list_copy,question)
        tree["Nichts"] = create_tree(application_list_copy,attribute,skipped_attributes,accepted_applications,brute_force_depth)

    return tree


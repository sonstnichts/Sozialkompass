# Enthält die verschiedenen Bestandteile des Algorithmuses

# Scannt die Antragsliste nach allen vorhandenen Attributen und zählt, wie oft diese vorkommen.
# Ergebnis wird als Dictionary ausgegeben

# used to change an array as a string to a normal array
import itertools
import copy
from ast import literal_eval

def berechne_attribute(antragsliste):

    attribute = {}

    for antrag in antragsliste.items():
        for bedingungen in antrag[1]["Attribute"]:
            for zeilen in bedingungen.keys():
                if zeilen in attribute:
                    attribute[zeilen] += 1
                else:
                    attribute[zeilen] = 1

    return attribute

def berechne_ergebnismenge(antragsliste):

    ergebnismenge = []

    for antrag in antragsliste.keys():
        ergebnismenge.append(antrag)
    
    return ergebnismenge

def attribut_bestimmen(allAttributesOriginal, attributesNumbered,bruteForceDepth, applicationList):
    #* adds alle relevant attributes to allAttributes
    allAttributes = copy.deepcopy(allAttributesOriginal)
    for attribute in attributesNumbered.items(): #loops through the attributes
        allAttributes[attribute[0]]["uses"] = attributesNumbered[attribute[0]]
        allAttributes[attribute[0]]["distinctPossibilities"] =  len(antwortmöglichkeiten_generieren(applicationList, attribute[0], allAttributes)) #adds the number of possibilities to the attribute
       
    #* sorts the attributeList by our relevance metric
    #? should this be more mathematical? right now we only rank by the number of uses and then the distinct possibilities
    #? we could do some cool maths or averages or something like that here
    attributesRanked = [] #list of attributes ranked by relevance
    for key in allAttributes:
        if(allAttributes[key].get("uses") != None):
            attributesRanked.append([key, allAttributes[key].get("uses"), allAttributes[key].get("distinctPossibilities")]) #adds the attribute and its relevance to the list
    
    attributesRanked.sort(key=lambda x: (x[1], x[2]), reverse=True) #sort attributesRanked by uses and distinctPossibilities
    attributesRanked = attributesRanked[:bruteForceDepth] #cut attributesRanked to the length of bruteForceDepth    

    # * creates trees according to differently weighted attribute lists
    #! we will end up with a lot of permuatiations (n!) here, this is probably bad for the runtime
    #! we should probably cap this some other way (time?) or always set the brute force depth to a reasonable number
    #? maybe 5 for the brute force depth? that would be 120 permutations, which could still be very slow
    #? maybe we should take a semi-random sample of the permutations? would be faster

    treeList = [] #creates a list of trees
    attributeCombinations = list(itertools.permutations(attributesRanked)) #creates a list of all possible combinations of attributes
    for attributeSequence in attributeCombinations:
        treeList.append(create_mock_tree(list(attributeSequence), 0, applicationList, allAttributes)) #creates a tree for each attribute combination and adds it to the treeList
    
    # * chooses the smallest tree
    #get the smallest tree from the treeList
    smallestDepth = 100000000 #sets the smallestDepth to a very high number
    smallestTree = {} #creates a variable for the smallest tree
    
    for tree in treeList: #evaluates every tree in the treeList
        if tree_depth(tree[0]) < smallestDepth: #checks if the depth of the tree is smaller than the smallestDepth
            smallestDepth = tree_depth(tree[0]) #if yes it sets the smallestDepth to the depth of the tree
            smallestTree = tree #and sets the smallestTree to the tree

    # * returns the first attribute which created the smallest tree
    return smallestTree[1][0][0]

def create_mock_tree(attributeSequence, index, applicationList, allAttributes): #shortended implementation of algorithm.py, only diffences commented
    resultSet = berechne_ergebnismenge(applicationList)
    if not attributeSequence:
        return resultSet
    question = attributeSequence[index][0] #gets the question from the attributeSequence
    tree = teilbaum_erstellen(question, resultSet, [])
    if not applicationList:
        answerSet = []
    else:
        answerSet = antwortmöglichkeiten_generieren(applicationList, question, allAttributes)
    print(answerSet)
    for possibleAnswer in answerSet:
        applicationListMock = copy.deepcopy(applicationList)
        zeilen_loeschen(applicationListMock,question,possibleAnswer,allAttributes[question]["Kategorie"])
        antraege_entfernen(applicationListMock)
        spalten_loeschen(applicationListMock,question)
        if(len(attributeSequence) - 1 > index): #checks if there are more attributes in the attributeSequence
            index += 1 #if yes it increases the index
            tree["Antworten"][possibleAnswer] = create_mock_tree(attributeSequence, index, applicationListMock, allAttributes) #creates the subtree from the next attribute
    return [tree, attributeSequence] #returns the tree and its coresponding attributeSequence

#! not sure if this is a great way to do this
#! probably not
#! should be reworked with a proper implementation
def tree_depth(tree):
    treeDepth = len(tree) #tree depth is the number of keys in the tree, which is very shallow. we need to evaluate the depth of the longest path on the tree
    return treeDepth

def teilbaum_erstellen(frage,ergebnismenge,skippedAttributes):

    baum = {}
    baum["Frage"] = frage
    baum["Ergebnismenge"] = ergebnismenge
    baum["Antworten"] = {}

    if skippedAttributes:
        baum["skippedAttributes"] = skippedAttributes

    return baum


def zeilen_loeschen(antragsliste_neu,frage,antwortmoeglichkeit,questiontype):
    
    delete_rows = []

    match questiontype:

        case "Auswahl":

            for antrag in antragsliste_neu.items():
                for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
                    for zeilen in bedingungen.items():
                        if zeilen[0] == frage and zeilen[1] != antwortmoeglichkeit:
                            delete_rows.append((antrag[0],idx))

        case "Ganzzahl":

            range = literal_eval(antwortmoeglichkeit)

            for antrag in antragsliste_neu.items():
                for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
                    for zeilen in bedingungen.items():
                        if zeilen[0] == frage and (zeilen[1][0] > range[1] or zeilen[1][1] <range[0]):
                            delete_rows.append((antrag[0],idx))
            
        
    #Zeilen löschen

    for delete_item in reversed(delete_rows):
        antragsliste_neu[delete_item[0]]["Attribute"].pop(delete_item[1])

def antraege_entfernen(antragsliste_neu):

    abgelehnte_antraege = []

    for antrag in antragsliste_neu.items():
        if not antrag[1]["Attribute"]:
            abgelehnte_antraege.append(antrag[0])

    #Anträge entfernen

    for antrag in abgelehnte_antraege:
        del antragsliste_neu[antrag]

def spalten_loeschen(antragsliste_neu,frage):

    delete_columns = []
    

    for antrag in antragsliste_neu.items():
        for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
            for zeilen in bedingungen.items():
                if zeilen[0] == frage:
                    delete_columns.append((antrag[0],idx))

    #Spalten löschen
    for delete_item in reversed(delete_columns):
        del antragsliste_neu[delete_item[0]]["Attribute"][delete_item[1]][frage]
        if not antragsliste_neu[delete_item[0]]["Attribute"][delete_item[1]]:
            antragsliste_neu[delete_item[0]]["Attribute"].pop(delete_item[1])

def acceptApplications(antragslisteNeu,acceptedApplicationsCopy):

    acceptedApplications = []

    for antrag in antragslisteNeu.items():
        if not antrag[1]["Attribute"]:
            acceptedApplications.append(antrag[0])
            acceptedApplicationsCopy.append(antrag[0])

    #Anträge entfernen

    for antrag in acceptedApplications:
        del antragslisteNeu[antrag]

def antwortmöglichkeiten_generieren(applicationList,frage,attribute):

    attributkategorie = attribute[frage]["Kategorie"]

    match attributkategorie:

        # In case of a selection, the possible answers of the attributes are being returned-
        case "Auswahl":
            return attribute[frage]["Antwortmoeglichkeiten"]

        # In case of a numberinput, ranges are created
        case "Ganzzahl":

            # Maximum value for an input of a user
            maxInt = 10000000

            # Determines how many digits after the decimalpoint the algorithm accepts.
            # Just add zeros after the comma
            smallestUnit = 0.01

            # A list for all relevant lower and upper bounds is created
            lowerBounds = []
            upperBounds = []
            
            # Boundlists are filled with the entries in the applicationlist.
            for application in applicationList.items():
                for requirements in application[1]["Attribute"]:
                    for entry in requirements.items():
                        if entry[0] == frage:
                            lowerBounds.append(entry[1][0])
                            upperBounds.append(entry[1][1])

            # In both lists duplicates are removed and result gets sorted
            lowerBounds = list(dict.fromkeys(lowerBounds))
            lowerBounds.sort()
            upperBounds = list(dict.fromkeys(upperBounds))
            upperBounds.sort()

            # resultlist is created
            result = []

            # if there is no zero as a lowerBound, a lowerbound of zero is created
            lastvalue = lowerBounds[0]-smallestUnit
            if lowerBounds[0]>0:
                result.append(str([0,lastvalue]))
                lowerBounds.pop(0)
            else:
                lastvalue = -smallestUnit
                lowerBounds.pop(0)

            # two lists progressively get smaller
            while lowerBounds or upperBounds:
                if lowerBounds:
                    if lowerBounds[0]>upperBounds[0]:
                        result.append(str([lastvalue+smallestUnit,upperBounds[0]]))
                        lastvalue = upperBounds.pop(0)
                    else:
                        result.append(str([lastvalue+smallestUnit,lowerBounds[0]-smallestUnit]))
                        lastvalue = lowerBounds.pop(0)-smallestUnit
                else:
                    result.append(str([lastvalue+smallestUnit,upperBounds[0]]))
                    lastvalue = upperBounds.pop(0)
            # last entry with the highest upperbound and the maximum value is appended
            result.append(str([lastvalue+smallestUnit,maxInt]))
            return result

def deleteRowsNoneOfTheAbove (antragslisteNeu,frage):

    deleteRows = []

    for antrag in antragslisteNeu.items():
        for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
            for zeilen in bedingungen.items():
                if zeilen[0] == frage:
                    deleteRows.append((antrag[0],idx))
        
    #delete rows

    for deleteItem in reversed(deleteRows):
        antragslisteNeu[deleteItem[0]]["Attribute"].pop(deleteItem[1])
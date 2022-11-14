# Enthält die verschiedenen Bestandteile des Algorithmuses

# Scannt die Antragsliste nach allen vorhandenen Attributen und zählt, wie oft diese vorkommen.
# Ergebnis wird als Dictionary ausgegeben

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

def attribut_bestimmen(attributsliste):

    return max(attributsliste, key = attributsliste.get)



def teilbaum_erstellen(frage,ergebnismenge):

    baum = {}
    baum["Frage"] = frage
    baum["Ergebnismenge"] = ergebnismenge
    baum["Antworten"] = {}

    return baum


def zeilen_loeschen(antragsliste_neu,frage,antwortmoeglichkeit):
    
    delete_rows = []

    for antrag in antragsliste_neu.items():
        for idx,bedingungen in enumerate(antrag[1]["Attribute"]):
            for zeilen in bedingungen.items():
                if zeilen[0] == frage and zeilen[1] != antwortmoeglichkeit:
                    delete_rows.append((antrag[0],idx))
        
    #Zeilen löschen

    for delete_item in reversed(delete_rows):
        del antragsliste_neu[delete_item[0]]["Attribute"][delete_item[1]]

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

def antwortmöglichkeiten_generieren(antragsliste,frage,attribute):

    attributkategorie = attribute[frage]["Kategorie"]

    match attributkategorie:

        # Im Fall Auswahl werden die Antwortmöglichkeiten aus der Attributenliste zurückgegeben
        case "Auswahl":
            print(attribute[frage]["Antwortmoeglichkeiten"])
            return attribute[frage]["Antwortmoeglichkeiten"]
        
        # Im Fall Ganzzahl werden alle Möglichkeiten aus der Antragsliste mit allen Grenzen generiert
        # * I think this case should work now, someone else should have a look over this though!
        # TODO check if the cast to string works with the tree generation
        case "Ganzzahl":
            antwortmoeglichkeiten = [] #array of possible answer arrays
            antwortmoeglichkeitenFinal = [] #final array w/ string values

            for antrag in antragsliste.items():
                for bedingungen in antrag[1]["Attribute"]:
                    for zeilen in bedingungen.values(): 
                        if str(bedingungen.keys()) == ("dict_keys(['" + str(frage) + "'])"): #ensures that only the relevant int attributes are used, this solution is kinda bad though
                            if not antwortmoeglichkeiten: #if the antwortmöglichkeiten array is empty
                                if zeilen[0] != 0: #if the lower bound isnt zero
                                    antwortmoeglichkeiten.append([0, zeilen[0]-1]) #add a choice that is smaller than the array
                                antwortmoeglichkeiten.append(zeilen) #add the actual array
                                antwortmoeglichkeiten.append([zeilen[1]+1, 1000000]) #add a choice that is bigger than the array
                            else:
                                append_new(antwortmoeglichkeiten, zeilen) #compilcated adding process
            for i in antwortmoeglichkeiten: 
                antwortmoeglichkeitenFinal.append(str(i)) #casts all antwortmoeglichkeiten to a string for the tree generation
            return antwortmoeglichkeitenFinal #returns the string antwortmoeglichkeiten

# ! Some maths are wrong here. There are cases where a value can sink below 0, and the last upper bound doesn't seem to work
# ! Also the cases are apparantly sometimes miscategorized
# TODO proper implementation of the last case
# TODO fix maths
# TODO check if the cases work as intended
def append_new(answers, new): #function that append new array values and correctly adapts correcting the old arrays
    for old in answers: #loops through the antwortmoeglichkeiten array
        if old[0] == new[0]: #if the lower bound is the same
            if old[1] == new[1]: #and if the higher bound is the same 
                break #do nothing
            else: #else
                index = answers.index(old) #gets the position of the current object
                answers.insert(index+1, [new[1]+1, old[1]]) #insert a new array [higherBoundNew + 1, higherBoundOld] after the current array
                old = new #set the added array as i
                break
        elif old[0] < new[0]: #if the new lower bound is higher than the old lower bound
            index = answers.index(old) #gets the position of the current object
            answers[index-1][1] = new[0]-1 #set the lower higherBound to the new lowerBound -1
            answers.insert(index,new) #insert the new values at the current place
            new[1] = old[0]-1 #!bad math, can be -1; set the new higher bound als the next lower bound - 1 
            break
        elif old[0] > new[0]: #if the new lower bound is lower than the old lower bound
            index = answers.index(old) #gets the position of the current object
            answers.insert(index, [new[1]+1, old[1]]) #insert a new array [higherBoundNew + 1, higherBoundOld] after the current array
            old = new #set the added array as i
            break
        else:
            break
    return answers
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

def append_new(antwortmoeglichkeiten, zeilen): #function that append new array values and correctly adapts correcting ones
    return antwortmoeglichkeiten

def antwortmöglichkeiten_generieren(antragsliste,frage,attribute):

    attributkategorie = attribute[frage]["Kategorie"]

    match attributkategorie:

        # Im Fall Auswahl werden die Antwortmöglichkeiten aus der Attributenliste zurückgegeben
        case "Auswahl":
            return attribute[frage]["Antwortmoeglichkeiten"]
        
        # Im Fall Ganzzahl werden alle Möglichkeiten aus der Antragsliste mit allen Grenzen generiert
        # THIS CASE ISN'T FINAL
        # TODO check if the cast to string fucks something up elsewhere (it probably does)
        # TODO implement append_new
        case "Ganzzahl":
            antwortmoeglichkeiten = [] #array of possible answer arrays
            antwortmoeglichkeitenFinal = [] #final array w/ string values

            for antrag in antragsliste.items(): 
                for bedingungen in antrag[1]["Attribute"]:
                    for zeilen in bedingungen.values(): 
                        if len(antwortmoeglichkeiten) == 0: #if the antwortmöglichkeiten array is empty
                            if zeilen[0] != 0: #if the lower bound isnt zero
                                antwortmoeglichkeiten.append([0, zeilen[1]-1]) #add a choice that is smaller than the array
                            antwortmoeglichkeiten.append(zeilen) #add the actual array
                            antwortmoeglichkeiten.append([zeilen[1]+1, 1000000]) #add a choice that is bigger than the array
                        else: append_new(antwortmoeglichkeiten, zeilen) #compilcated adding process
            # print(antwortmoeglichkeiten)
            for i in antwortmoeglichkeiten: 
                antwortmoeglichkeitenFinal.append(str(i)) #casts all antwortmoeglichkeiten to a string for the tree generation
            return antwortmoeglichkeitenFinal #returns the string antwortmoeglichkeiten
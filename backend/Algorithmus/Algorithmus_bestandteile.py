# Enthält die verschiedenen Bestandteile des Algorithmuses

# Scannt die Antragsliste nach allen vorhandenen Attributen und zählt, wie oft diese vorkommen.
# Ergebnis wird als Dictionary ausgegeben

# used to change an array as a string to a normal array
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

def attribut_bestimmen(attributsliste):

    return max(attributsliste, key = attributsliste.get)



def teilbaum_erstellen(frage,ergebnismenge):

    baum = {}
    baum["Frage"] = frage
    baum["Ergebnismenge"] = ergebnismenge
    baum["Antworten"] = {}

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
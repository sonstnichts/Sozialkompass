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
            return attribute[frage]["Antwortmoeglichkeiten"]
        
        # Im Fall Ganzzahl werden alle Möglichkeiten aus der Antragsliste mit allen Grenzen generiert
        case "Ganzzahl":
            antwortmoeglichkeiten = []
            
            for antrag in antragsliste.items():
                for bedingungen in antrag[1]["Attribute"]:
                    for zeilen in bedingungen.values():
                        if zeilen == frage:
                            antwortmoeglichkeiten.append(zeilen)
            return antwortmoeglichkeiten
            # Erstelle Grenzen noch nicht fertig!
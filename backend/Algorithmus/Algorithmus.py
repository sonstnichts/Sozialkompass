import copy
from Algorithmus import Algorithmus_bestandteile

def baum_erstellen (antragsliste,attribute,skippedAttributes,acceptedApplications):

    # Bestimmt eine List der Anträge, welche noch in Frage kommen.
    ergebnismenge = Algorithmus_bestandteile.berechne_ergebnismenge(antragsliste)

    # Berechnet, welche Attribute noch abgefragt werden können und wie oft diese vorkommen.
    attributsliste = Algorithmus_bestandteile.berechne_attribute(antragsliste)


    # Wenn die Attributsliste keine Einträge mehr hat, terminiert der Algorithmus.
    if not attributsliste:
        returnTree = {}
        returnTree["result"] = acceptedApplications
        if skippedAttributes:
            returnTree["skippedAttributes"] = skippedAttributes
        return returnTree


    # Bestimmt, welches Attribut als erstes abgefragt werden soll.
    # Anpassungen der Regel zur Auswahl des Attributs sollte in dieser Methode passieren.
    frage = Algorithmus_bestandteile.attribut_bestimmen(attributsliste)
    questiontype = attribute[frage]["Kategorie"]

    # Template für einen Teilbaum bestimmen
    baum = Algorithmus_bestandteile.teilbaum_erstellen(frage,ergebnismenge,skippedAttributes)

    # Mögliche Antwortmöglichkeiten für frage bestimmen
    antwortmoeglichkeiten = Algorithmus_bestandteile.antwortmöglichkeiten_generieren(antragsliste,frage,attribute)

    # Durch Antwortmöglichkeiten iterieren und Teilbäume bilden
    for antwortmoeglichkeit in antwortmoeglichkeiten:

        # Manipulierbare Kopie der Datenbasis erstellen
        antragsliste_neu = copy.deepcopy(antragsliste)

        # Nicht relevante "Zeilen aus Datenbasis löschen"
        Algorithmus_bestandteile.zeilen_loeschen(antragsliste_neu,frage,antwortmoeglichkeit,questiontype)
        
        # Prüfen, ob Anträge nicht mehr relevant sind und diese löschen.
        Algorithmus_bestandteile.antraege_entfernen(antragsliste_neu)

        # Nicht relevante "Spalten" aus Datenbasis löschen"
        Algorithmus_bestandteile.spalten_loeschen(antragsliste_neu,frage)

        # Accepts applications in the passed array
        acceptedApplicationsCopy = copy.deepcopy(acceptedApplications)
        Algorithmus_bestandteile.acceptApplications(antragsliste_neu,acceptedApplicationsCopy)

        # Antwortenteil des Teilbaumes rekursiv mit neuem Teilbaum füllen
        baum["Antworten"][antwortmoeglichkeit] = baum_erstellen(antragsliste_neu,attribute,skippedAttributes,acceptedApplicationsCopy)

    # insert a skip option into the tree
    antragslisteNeu = copy.deepcopy(antragsliste)
    Algorithmus_bestandteile.spalten_loeschen(antragslisteNeu,frage)
    skippedCopy = copy.deepcopy(skippedAttributes)
    skippedCopy.append(frage)
    acceptedApplicationsCopy = copy.deepcopy(acceptedApplications)
    Algorithmus_bestandteile.acceptApplications(antragslisteNeu,acceptedApplicationsCopy)
    baum["skip"] = baum_erstellen(antragslisteNeu,attribute,skippedCopy,acceptedApplicationsCopy)

    # insert a none of the above option in case of a category question
    if questiontype == "Auswahl":
        antragslisteNeu = copy.deepcopy(antragsliste)
        Algorithmus_bestandteile.deleteRowsNoneOfTheAbove(antragslisteNeu,frage)
        Algorithmus_bestandteile.antraege_entfernen(antragslisteNeu)
        Algorithmus_bestandteile.spalten_loeschen(antragslisteNeu,frage)
        baum["Nichts"] = baum_erstellen(antragslisteNeu,attribute,skippedAttributes,acceptedApplications)

    return baum


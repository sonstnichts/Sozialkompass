#from pymongo import MongoClient
import json
from algorithmus import Algorithmus
from pathlib import Path

# Mit Mongodb verbinden

# client = MongoClient("mongodb://localhost:27017")

# Variablen für Collections erstellen

# db = client.sozialkompass
# antraege = db.antraege
# attribute = db.attribute
# baueme = db.baeume

file_dir = Path(__file__)
dir = file_dir.parent

def baum_laden():

    # Testdaten für Baum laden

    data = open(dir / "algorithmus/assets/Antraege.json")
    antragsliste = json.load(data)

    # Attribute laden

    data = open(dir / "algorithmus/assets/Attribute.json")
    attribute = json.load(data)

    # Baum mit Testdaten erstellen

    baum = Algorithmus.baum_erstellen(antragsliste,attribute)

    return baum

# Baum laden

baum = baum_laden()

# Baum mit Postleitzahl versehen

baum["Postleitzahl"] = 48149

# Baum ausgeben

print(json.dumps(baum,indent=4))

#Baum in Datei speichern (Fuer Debug)
with open(dir / "algorithmus/assets/baum.json", "w") as fp:
    json.dump(baum, fp)

# Baum in MongoDB speichern

# baueme.insert_one(baum)

    
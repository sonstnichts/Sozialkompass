#from pymongo import MongoClient
import json
from Algorithmus import Algorithmus
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

    data = open(dir / "Algorithmus/Antraege.json")
    antragsliste = json.load(data)

    # Attribute laden

    data = open(dir / "Algorithmus/Attribute.json")
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

# Baum in MongoDB speichern

# baueme.insert_one(baum)

    
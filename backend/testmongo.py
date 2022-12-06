from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from pathlib import Path

client = MongoClient("mongodb://sozialkompass-dev.uni-muenster.de:80",username = "root",password="rootpassword")

db = client.sozialkompass
treenodes = db.treenodes
antraege = db.antraege
attribute = db.attribute


file_dir = Path(__file__)
dir = file_dir.parent

data = open(dir / "algorithmus/assets/Antraege.json")
antraegelist = json.load(data)

data = open(dir / "algorithmus/assets/Attribute.json")
attributelist = json.load(data)

oid = str(ObjectId())
oid1 = str(ObjectId())
oid2 = str(ObjectId())
oid3 = str(ObjectId())
oid4 = str(ObjectId())



beispielnode = {
    "_id":oid,
    "Frage":"Alter",
    "Kategorie":"Auswahl",
    "Antworten":[
        {
            "Bezeichnung":["deutsch"],
            "NodeID":oid1
        },
        {
            "Bezeichnung":["italienisch","türkisch"],
            "NodeID":oid2
        }
    ],
    "NoneoftheAboveID":oid4,
    "SkipID":oid3
}
result = attribute.insert_many(attributelist)
#result = treenodes.find({"ParentID":{"$exists":False}})

print(result.acknowledged)
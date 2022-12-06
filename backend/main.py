#from pymongo import MongoClient
import json
from Algorithmus import Algorithmus
from pathlib import Path
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb://sozialkompass-dev.uni-muenster.de:80",username = "root",password="rootpassword")

db = client.sozialkompass
treenodes = db.treenodes

file_dir = Path(__file__)
dir = file_dir.parent

def load_tree(nodelist):

    # load apllication list from assets

    data = open(dir / "algorithmus/assets/Antraege.json")
    application_list = json.load(data)

    # load attribute list from assets

    data = open(dir / "algorithmus/assets/Attribute.json")
    attribute_list = json.load(data)

    attribute = {}
    for attribut in attribute_list:
        attribute[attribut["Name"]] = attribut["Kategorie"]



    # create a tree with the data in assets
    brute_force_depth = 10

    id = str(ObjectId())

    Algorithmus.create_tree(application_list,attribute,[],[], brute_force_depth,nodelist,id,"")


# load the tre
nodelist = []
load_tree(nodelist)
treenodes.drop()
treenodes.insert_many(nodelist)

print(len(nodelist))
# add the zip code to the tree

#tree["Postleitzahl"] = 48149

# return tree
#! This causes crashes if the tree is too big, comment this line out if you want it not to
#print(json.dumps(tree,indent=4))

#Baum in Datei speichern (Fuer Debug)
#with open(dir / "algorithmus/assets/baum.json", "w") as fp:
#    json.dump(tree, fp)

# Baum in MongoDB speichern

# baueme.insert_one(baum)
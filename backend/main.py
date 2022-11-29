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

def load_tree():

    # load apllication list from assets

    data = open(dir / "algorithmus/assets/Antraege.json")
    application_list = json.load(data)

    # load attribute list from assets

    data = open(dir / "algorithmus/assets/Attribute.json")
    attribute = json.load(data)

    # create a tree with the data in assets
    brute_force_depth = 10

    tree = Algorithmus.create_tree(application_list,attribute,[],[], brute_force_depth)

    return tree

# load the tree

tree = load_tree()

# add the zip code to the tree

tree["Postleitzahl"] = 48149

# return tree
#! This causes crashes if the tree is too big, comment this line out if you want it not to
print(json.dumps(tree,indent=4))

#Baum in Datei speichern (Fuer Debug)
with open(dir / "algorithmus/assets/baum.json", "w") as fp:
    json.dump(tree, fp)

# Baum in MongoDB speichern

# baueme.insert_one(baum)

    
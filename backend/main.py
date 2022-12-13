import json
from Algorithmus import Algorithmus
from pathlib import Path
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# In the face of errors
# Perseverance prevails
# Code eventually runs
# ~ ChatGPT, 2022

# load logindata from envfile
load_dotenv()
# setup connection to mongodb
MONGO_DB_ADDRESS = os.getenv("MONGO_DB_ADDRESS")
MONGO_DB_USER = os.getenv("MONGO_DB_USER")
MONGO_DB_PASSWORD = os.getenv("MONGO_DB_PASSWORD")
client = MongoClient(MONGO_DB_ADDRESS, username= MONGO_DB_USER, password=MONGO_DB_PASSWORD)

# setup for databases and collections
db = client.sozialkompass
treenodes = db.treenodes
attributes = db.attribute
applications = db.antraege

file_dir = Path(__file__)
dir = file_dir.parent

def generate_tree():

    # load apllication list from assets

    # data = open(dir / "algorithmus/assets/Antraege.json")
    # application_list = json.load(data)

    # load applications list from database

    application_list = list(applications.find())

    # load attribute list from assets

    # data = open(dir / "algorithmus/assets/Attribute.json")
    # attribute_list = json.load(data)

    # load applications list from database

    attribute_list = list(attributes.find({},{"Name":1,"_id":0,"Kategorie":1}))

    attribute = {}
    for attribut in attribute_list:
        attribute[attribut["Name"]] = attribut["Kategorie"]

    # create a tree with the data in assets
    brute_force_depth = 0

    # list of nodes that will be saved in the Database
    nodelist = []

    # creates ID for first node of the tree
    id = str(ObjectId())

    # creates the tree and fills nodelist
    Algorithmus.create_tree(application_list,attribute,[],[], brute_force_depth,nodelist,id,"")

    # delete old nodes
    treenodes.drop()
    # insert new nodes
    treenodes.insert_many(nodelist)

    print(len(nodelist))

if __name__ == "__main__":
    generate_tree()
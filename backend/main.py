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

# create path to local assets
file_dir = Path(__file__)
dir = file_dir.parent

def generate_tree():

    # asks for the method of input
    insertionmode = input("Should the input data for the algorithm come from the database? [Y/n]")

    if insertionmode == "Y" or insertionmode == "y":
        # load applications list from database
        application_list = list(applications.find())
        # load applications list from database
        attribute_list = list(attributes.find({},{"Name":1,"_id":0,"Kategorie":1}))

    elif insertionmode == "N" or insertionmode == "n":
        # load application list from assets
        data = open(dir / "Algorithmus/assets/Antraege_countryGroup.json", encoding = 'utf-8')
        application_list = json.load(data)
        # load attribute list from assets
        data = open(dir / "Algorithmus/assets/Attribute_countryGroup.json", encoding = 'utf-8')
        attribute_list = json.load(data)

    else:
        print("This was not a valid input.")
        return

    
    print("Algorithm in progress...")
    print("This could take a minute...")

    attribute = {}
    for attribut in attribute_list:
        attribute[attribut["Name"]] = attribut["Kategorie"]

    # sets the depth of the brute force 
    #! This currently isn't used. It might never be.
    brute_force_depth = 0

    # list of nodes that will be saved in the Database
    nodelist = []

    # creates ID for first node of the tree
    id = str(ObjectId())

    # creates the tree and fills nodelist
    Algorithmus.create_tree(application_list,attribute,[],[], brute_force_depth,nodelist,id,"")

    print("Algorithm ran successfully and generated " + str(len(nodelist))+ " nodes.")

    # asks if the output should be saved in the database
    savingmode = input("Do you want to save the nodes in the database? [Y/n]")
    if savingmode == "Y" or savingmode == "y":
        # delete old nodes
        treenodes.drop()
        # insert new nodes
        treenodes.insert_many(nodelist)

    print("Done!")

if __name__ == "__main__":
    generate_tree()
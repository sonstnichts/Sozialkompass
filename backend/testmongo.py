import json
from Algorithmus import Algorithmus
from pathlib import Path
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os


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


if __name__ == "__main__":
    hallo = applications.find_one({"Name":"BAfoeG"},{"Beschreibung":True})["Beschreibung"]

    print(hallo)
from dotenv import load_dotenv
#load .env to set env variables
load_dotenv()
import os
from pathlib import Path
from flask import Flask, jsonify, make_response, request
from flask_restful import Resource, Api
from flask_talisman import Talisman
from flask_wtf import CSRFProtect
from pymongo import MongoClient
from flask_cors import CORS
from main import generate_tree


MONGO_DB_ADDRESS = os.getenv("MONGO_DB_ADDRESS")
MONGO_DB_USER = os.getenv("MONGO_DB_USER")
MONGO_DB_PASSWORD = os.getenv("MONGO_DB_PASSWORD")
client = MongoClient(MONGO_DB_ADDRESS, username= MONGO_DB_USER, password=MONGO_DB_PASSWORD)


#Import our four different MongoDB collections
db = client.sozialkompass
treenodes = db.treenodes
attribute = db.attribute
aemter = db.aemter
antraege = db.antraege

#Declare our Flask app and Api and set Cross origin (only for developent)
app = Flask(__name__)
api = Api(app)
CORS(app)

if "sozialkompass" not in client.list_database_names():
    generate_tree(docker_deploy=True)


# Activate when deployed
# CSRFProtect(app)


# Note: A secret key is included in the sample so that it works.
# If you use this code in your application, replace this with a truly secret
# key. See https://flask.palletsprojects.com/quickstart/#sessions.
app.secret_key = '4e/;.A*F{4e@E&A;6YS{fkogyQOisvv(LTw~49n>urDOxWdPDX{5TL]!llT62o'


#Security Headers -> at deployment
# Talisman(app)

file_dir = Path(__file__)
dir = file_dir.parent



class SendResults(Resource):
    '''
    This class sends the final result of the quiz 
    '''
    def post(self):
        '''
        Post request receives a list of the results and returns for each antrag the corresponding details in a single response
        '''
        args = request.get_json()
        result = []
        for application in args.keys():
            #Exclude object_id, cause it's bad
            #Search in database for the antraege
            data = aemter.find_one({"Antraege."+application:{"$exists":True}},{"_id":False})
            entry = {}
            entry["Antrag"] = application
            entry["Name"] = data["Name"]
            entry["Adresse"] = data["Adresse"]["Straße"]+" "+str(data["Adresse"]["Postleitzahl"])+" "+data["Adresse"]["Stadt"]
            entry["Link"] = data["Link"]
            entry["Kontakt"] = data["Kontakt"]
            entry["Beschreibung"] = antraege.find_one({"Name":application},{"Beschreibung":True})["Beschreibung"]
            result.append(entry)
                  
        return jsonify(result)



class SendTree(Resource):
    '''
    This class sends each node to client
    '''
    def get(self):
        '''
        GET method for the first node
        The first one has no parent, so the client cannot request an id
        '''
        #TODO Store current node in Cookie and return it automatically when a user returns to sozialkompass
        
        #Search in db for node without parent
        result = treenodes.find_one({"parentId":{"$exists": False}})
        attribut = attribute.find_one({"Name":result["Attribut"]})
        result["Frage"] = attribut["Frage"]
        result["Beschreibung"] = attribut["Beschreibung"]
        result["Kategorie"] = attribut["Kategorie"]

        #special case for "Auswahl", we have to look at every answer
        if attribut["Kategorie"]=="Auswahl":
            checkedAnswers = []
            for ans in result["Antworten"]:
                if ans["Bezeichnung"] not in checkedAnswers:
                    checkedAnswers.append(ans["Bezeichnung"][0])
            answers = attribute.find_one({"Name":result["Attribut"]},{"Antwortmoeglichkeiten":1})
            for ans in answers["Antwortmoeglichkeiten"]:
                if ans not in checkedAnswers:
                    result["Antworten"].append({"Bezeichnung":[ans],"NodeId":result["noneoftheabove"]})
        # insert all answers
        response = make_response(jsonify(result), 200)
        return response

    def post(self):
        '''
        POST request for every next nodem, client sends corresponding id
        '''

        #Get json(id) from client
        args = request.get_json()
        #if client wants a reset -> important for cookie feature in the future
        if args["_id"] == "reset":
            result = treenodes.find_one({"parentId":{"$exists": False}})
        else:
            #Search for next node in DB with the id
            result = treenodes.find_one({"_id":args["_id"]})
        if "Attribut" in result:
            attribut = attribute.find_one({"Name":result["Attribut"]})
            result["Frage"] = attribut["Frage"]
            result["Kategorie"] = attribut["Kategorie"]
            if attribut["Kategorie"]=="Auswahl":
                checkedAnswers = []
                for ans in result["Antworten"]:
                    if ans["Bezeichnung"] not in checkedAnswers:
                        checkedAnswers.append(ans["Bezeichnung"][0])
                answers = attribute.find_one({"Name":result["Attribut"]},{"Antwortmoeglichkeiten":1})
                for ans in answers["Antwortmoeglichkeiten"]:
                    if ans not in checkedAnswers:
                        result["Antworten"].append({"Bezeichnung":[ans],"NodeId":result["noneoftheabove"]})

        
        response = jsonify(result)
       
        return response



#Add classes to our api and set routes
api.add_resource(SendTree, "/api/tree")
api.add_resource(SendResults, "/api/results")



if __name__ == "__main__":  
    app.run()
        
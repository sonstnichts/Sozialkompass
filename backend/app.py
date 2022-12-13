from dotenv import load_dotenv
load_dotenv()
import os
from pathlib import Path
from flask import Flask, jsonify, make_response, request, session
from flask_restful import Resource, Api
import json
from flask_talisman import Talisman
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import set_access_cookies, unset_jwt_cookies, get_jwt, create_refresh_token, set_refresh_cookies
import datetime
from flask_mongoengine import MongoEngine
from flask_security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, auth_required, decorators, changeable, utils
from flask_wtf import CSRFProtect
import bcrypt
from pymongo import MongoClient
from flask_cors import CORS
import bson





# # no forms so no concept of flashing
# SECURITY_FLASH_MESSAGES = False

# # Need to be able to route backend flask API calls. Use 'accounts'
# # to be the Flask-Security endpoints.
# SECURITY_URL_PREFIX = '/api/accounts'

# # Turn on all the great Flask-Security features
# SECURITY_RECOVERABLE = True
# SECURITY_TRACKABLE = True
# SECURITY_CHANGEABLE = True
# SECURITY_CONFIRMABLE = True
# SECURITY_REGISTERABLE = True
# SECURITY_UNIFIED_SIGNIN = True

# # These need to be defined to handle redirects
# # As defined in the API documentation - they will receive the relevant context
# SECURITY_POST_CONFIRM_VIEW = "/confirmed"
# SECURITY_CONFIRM_ERROR_VIEW = "/confirm-error"
# SECURITY_RESET_VIEW = "/reset-password"
# SECURITY_RESET_ERROR_VIEW = "/reset-password"
# SECURITY_REDIRECT_BEHAVIOR = "spa"

# # CSRF protection is critical for all session-based browser UIs
# # enforce CSRF protection for session / browser - but allow token-based
# # API calls to go through
# SECURITY_CSRF_PROTECT_MECHANISMS = ["session", "basic"]
# SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS = True

# # Send Cookie with csrf-token. This is the default for Axios and Angular.
# SECURITY_CSRF_COOKIE_NAME = "XSRF-TOKEN"
# WTF_CSRF_CHECK_DEFAULT = False
# WTF_CSRF_TIME_LIMIT = None


MONGO_DB_ADDRESS = os.getenv("MONGO_DB_ADDRESS")
MONGO_DB_USER = os.getenv("MONGO_DB_USER")
MONGO_DB_PASSWORD = os.getenv("MONGO_DB_PASSWORD")
client = MongoClient(MONGO_DB_ADDRESS, username= MONGO_DB_USER, password=MONGO_DB_PASSWORD)

db = client.sozialkompass
treenodes = db.treenodes
attribute = db.attribute
aemter = db.aemter

app = Flask(__name__)
api = Api(app)
CORS(app)
# In your app
# Enable CSRF on all api endpoints.
# CSRFProtect(app)


# app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", 'pf9Wkove4IKEAXvy-cQkeDPhv9Cb3Ag-wyJILbq_dFw')
# Note: A secret key is included in the sample so that it works.
# If you use this code in your application, replace this with a truly secret
# key. See https://flask.palletsprojects.com/quickstart/#sessions.
app.secret_key = '4e/;.A*F{4e@E&A;6YS{fkogyQOisvv(LTw~49n>urDOxWdPDX{5TL]!llT62o'

#IMPORTANT set to really secret at deployment
app.config["JWT_SECRET_KEY"] = "Secret KEY"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
#IMPORTANT set to True at deployment
app.config["JWT_COOKIE_SECURE"] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

app.config["SECURITY_PASSWORD_SALT"] = "odhvoenonvoenrvonepo43p43jfk34f"
salt = "odhvoenonvoenrvonepo43p43jfk34f"

jwt = JWTManager(app)

#Security Headers -> bei deployment auf server
# Talisman(app)

file_dir = Path(__file__)
dir = file_dir.parent


# Create database connection object
db = MongoEngine(app)



#Define Users and their roles
class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)
    permissions = db.ListField(max_length=255)

class User(db.Document, UserMixin):
    email = db.StringField(max_length=255, unique=True)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    fs_uniquifier = db.StringField(max_length=64, unique=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])


user_datastore = MongoEngineUserDatastore(db, User, Role)
#flask-security instance
app.security = Security(app, user_datastore)

#Access token refresh to prevent random logout
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now()
        target_timestamp = datetime.datetime.timestamp(now + datetime.timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
          
            set_access_cookies(response, access_token)
            
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response



class Treenodes(db.Document):
    parentId = db.StringField()
    Frage = db.StringField()
    Kategorie = db.StringField()
    Antworten = db.ListField()
    NoneoftheAboveID = db.StringField()
    SkipID = db.StringField()



class SendResults(Resource):
    def get(self):
        #Exclude object_id, cause it's bad
        cursor = aemter.find({}, {"_id": False})
        cur_list = list(cursor)        
        return jsonify(cur_list)



class SendTree(Resource):
    #GET request for the first node
    def get(self):
        print("success")
        #check if session exists, then send last node
        # first_cookie = request.cookies.get("firstlogin")
        # id_cookie = request.cookies.get("_id")
        # if first_cookie == treenodes.find_one({"parentId":{"$exists": False}})["_id"]:
        #     result = treenodes.find_one({"_id":id_cookie})
        #     #Add attributes to result
        #     attribut = attribute.find_one({"Name":result["Attribut"]})
        #     result["Frage"] = attribut["Frage"]
        #     result["Beschreibung"] = attribut["Beschreibung"]
        #     result["Kategorie"] = attribut["Kategorie"]
        #     response = make_response(jsonify(result),200)
        #     return response

        #else send first node
        result = treenodes.find_one({"parentId":{"$exists": False}})
        attribut = attribute.find_one({"Name":result["Attribut"]})
        result["Frage"] = attribut["Frage"]
        result["Beschreibung"] = attribut["Beschreibung"]
        result["Kategorie"] = attribut["Kategorie"]
        response = make_response(jsonify(result), 200)
        return response

    #POST request for every next node, frontend sends corresponding id
    def post(self):

        #Get json from frontend
        args = request.get_json()
        #if frontend wants a reset
        if args["_id"] == "reset":
            result = treenodes.find_one({"parentId":{"$exists": False}})
        else:
            #Search for next node in DB
            result = treenodes.find_one({"_id":args["_id"]})
        if "Attribut" in result:
            attribut = attribute.find_one({"Name":result["Attribut"]})
            result["Frage"] = attribut["Frage"]
            result["Kategorie"] = attribut["Kategorie"]
        #result["Beschreibung"] = attribut["Beschreibung"]
        response = jsonify(result)
        #set cookie for first node id to check if old session is valid with new tree (if a new tree is generated)
        #set cookie for current node to continue
        first_id = treenodes.find_one({"parentId":{"$exists": False}})["_id"]
        # response.set_cookie("_id", args["_id"])
        # response.set_cookie("firstlogin", first_id)
        return response

class Register(Resource):
    method_decorators = [jwt_required()]
    def post(self):
        #User authentication true if admin
        current_user = get_jwt_identity()
        user_from_db = app.security.datastore.find_user(email=current_user)
        admin_role = app.security.datastore.find_role("admin")
        user_roles = user_from_db.roles

        if admin_role in user_roles:
            
            #Get Data from request (sent via json)
            new_user = request.get_json()

            #Salt is a hash protection
            salt = bcrypt.gensalt()
            new_user["password"] = bcrypt.hashpw(new_user["password"].encode("utf-8"), salt)

            #Check if user already exists
            if not app.security.datastore.find_user(email=new_user["email"]):
                #create or find the role provided ##### NO ADMIN PROTECTION YET
                role = app.security.datastore.find_or_create_role(name = new_user["role"])
                user = app.security.datastore.create_user(email=new_user["email"], password=new_user["password"])
                #Each user needs a role
                app.security.datastore.add_role_to_user(user, new_user["role"]) 
                return make_response(jsonify({"msg": "User created successfully"}), 201)
            else:
                return make_response(jsonify({"msg": "Username already exists"}), 409)
        else:
            return make_response(jsonify({"msg": "You don't have the permissions to create a user"}), 409)

class ChangePassword(Resource):
    method_decorators = [jwt_required()]
    def post(self):
        user_details = request.get_json()
        #Check if user exists
        user_from_db = app.security.datastore.find_user(email=user_details["email"])

        
        password = bcrypt.hashpw(user_details["password"].encode("utf-8"), salt)
        user_from_db["password"] = password
        

        response = jsonify({'change password': True})
        return response

class Login(Resource):
    def post(self):
        login_details = request.get_json()
        
        #Check if user exists
        user_from_db = app.security.datastore.find_user(email=login_details["email"])

        if user_from_db:
            #check if password is correct
            # if bcrypt.checkpw(login_details["password"].encode("utf-8"),user_from_db["password"].encode("utf-8")):
            if utils.verify_password(password=login_details["password"], password_hash=user_from_db["password"]):
                access_token = create_access_token(identity=user_from_db["email"])
                refresh_token = create_refresh_token(identity=user_from_db["email"])
                response = jsonify({'login': True})
                set_access_cookies(response, access_token)
                set_refresh_cookies(response, refresh_token)
                response.status_code = 200
                return response
           

        return make_response(jsonify({'msg': 'The username or password is incorrect'}), 401)


class Refresh(Resource):
    method_decorators = [jwt_required()]
    def post(self):
        current_user = get_jwt_identity()
        user_from_db = app.security.datastore.find_user(email=current_user)
        access_token = create_access_token(identity=user_from_db["email"])

        response = jsonify({"refresh": True})
        response.status_code = 200
        set_access_cookies(response, access_token)

        return response


class Logout(Resource):
    def post(self):
        response = jsonify({"logout": True})
        unset_jwt_cookies(response)
        response.status_code = 200
        return response


class Profile(Resource):
    method_decorators = [jwt_required()]
    def get(self):
        current_user = get_jwt_identity()
        user_from_db = app.security.datastore.find_user(email=current_user)
        
        if user_from_db:
            del user_from_db.password
            
            return make_response(jsonify({"profile": user_from_db}), 200)
        return make_response(jsonify({"msg": "Profile not found"}))

############# DELETE AT DEPLOYMENT
class AdminCreator(Resource):
 def post(self):
        #Get data from JSON HTTP POST
        new_user = request.get_json()

        #Salt is a hash protection
        salt = bcrypt.gensalt()
        new_user["password"] = bcrypt.hashpw(new_user["password"].encode("utf-8"), salt)

        #Check if user is in database
        if not app.security.datastore.find_user(email=new_user["email"]):
            user =  app.security.datastore.create_user(email=new_user["email"], password=new_user["password"])
            role = app.security.datastore.find_or_create_role(name = "admin")
            app.security.datastore.add_role_to_user(user, role)
            return make_response(jsonify({"msg": "User created successfully"}), 201)
        else:
            return make_response(jsonify({"msg": "Username already exists"}), 409)





api.add_resource(SendTree, "/api/tree")
api.add_resource(Register, "/api/register")
api.add_resource(Login, "/api/login")
api.add_resource(Profile, "/api/profile")
api.add_resource(AdminCreator, "/api/admin")
api.add_resource(Logout, "/api/logout")
api.add_resource(Refresh, "/api/refresh")
api.add_resource(ChangePassword, "/api/resetPassword")
api.add_resource(SendResults, "/api/results")


if __name__ == "__main__":  
        app.run(debug=True)
        
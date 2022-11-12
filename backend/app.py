import os
from pathlib import Path
from flask import Flask, jsonify, make_response, request, render_template_string
from flask_restful import Resource, Api
import json
from flask_talisman import Talisman
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from flask_mongoengine import MongoEngine
from flask_security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, auth_required
from flask_wtf import CSRFProtect
import bcrypt

# no forms so no concept of flashing
SECURITY_FLASH_MESSAGES = False

# Need to be able to route backend flask API calls. Use 'accounts'
# to be the Flask-Security endpoints.
SECURITY_URL_PREFIX = '/api/accounts'

# Turn on all the great Flask-Security features
SECURITY_RECOVERABLE = True
SECURITY_TRACKABLE = True
SECURITY_CHANGEABLE = True
SECURITY_CONFIRMABLE = True
SECURITY_REGISTERABLE = True
SECURITY_UNIFIED_SIGNIN = True

# These need to be defined to handle redirects
# As defined in the API documentation - they will receive the relevant context
SECURITY_POST_CONFIRM_VIEW = "/confirmed"
SECURITY_CONFIRM_ERROR_VIEW = "/confirm-error"
SECURITY_RESET_VIEW = "/reset-password"
SECURITY_RESET_ERROR_VIEW = "/reset-password"
SECURITY_REDIRECT_BEHAVIOR = "spa"

# CSRF protection is critical for all session-based browser UIs
# enforce CSRF protection for session / browser - but allow token-based
# API calls to go through
SECURITY_CSRF_PROTECT_MECHANISMS = ["session", "basic"]
SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS = True

# Send Cookie with csrf-token. This is the default for Axios and Angular.
SECURITY_CSRF_COOKIE_NAME = "XSRF-TOKEN"
WTF_CSRF_CHECK_DEFAULT = False
WTF_CSRF_TIME_LIMIT = None




app = Flask(__name__)
api = Api(app)

# In your app
# Enable CSRF on all api endpoints.
# CSRFProtect(app)


app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", 'pf9Wkove4IKEAXvy-cQkeDPhv9Cb3Ag-wyJILbq_dFw')


jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "Secret KEY"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

#Security Headers -> bei deployment auf server
# Talisman(app)

file_dir = Path(__file__)
dir = file_dir.parent

# MongoDB Config
app.config['MONGODB_DB'] = 'local'
app.config['MONGODB_HOST'] = 'localhost'
app.config['MONGODB_PORT'] = 27017

# Create database connection object
db = MongoEngine(app)




#User und deren Rollen definieren
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
#flask-security instanz erschaffen
app.security = Security(app, user_datastore)



class SendTree(Resource):
    def get(self):
        baum = open(dir / "algorithmus/assets/baum.json")
        return json.load(baum) 

class Register(Resource):
    def post(self):
        #Daten aus JSON POST anfragen
        new_user = request.get_json()

        #Salt ist ein Schutz fuer das Passwort beim hashen
        salt = bcrypt.gensalt()
        new_user["password"] = bcrypt.hashpw(new_user["password"].encode("utf-8"), salt)

        #Kontrolle ob user schon in Datenbanl
        if not app.security.datastore.find_user(email=new_user["email"]):
            app.security.datastore.create_user(email=new_user["email"], password=new_user["password"]) 
            return make_response(jsonify({"msg": "User created successfully"}), 201)
        else:
            return make_response(jsonify({"msg": "Username already exists"}), 409)


class Login(Resource):
    def post(self):
        login_details = request.get_json()
        #Schauen ob user schon in Datenbank
        
        user_from_db = app.security.datastore.find_user(email=login_details["email"])

        if user_from_db:
            #Passwort auf Korrektheit pruefen
            if bcrypt.checkpw(login_details["password"].encode("utf-8"),user_from_db["password"].encode("utf-8")):
                print("match")
                return make_response(jsonify({"msg": "Passwort korrekt!"}), 200)
            
           

        return make_response(jsonify({'msg': 'The username or password is incorrect'}), 401)



api.add_resource(SendTree, "/api/tree")
api.add_resource(Register, "/api/register")
api.add_resource(Login, "/api/login")


if __name__ == "__main__":  
    # with app.app_context():
        # Create a user to test with
        # role = app.security.datastore.find_or_create_role(name="standard", permissions="osna") 
        app.run(debug=True)
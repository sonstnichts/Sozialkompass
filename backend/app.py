from pathlib import Path
from flask import Flask
from flask_restful import Resource, Api
import json
from flask_talisman import Talisman

app = Flask(__name__)
api = Api(app)

#Security Headers -> bei deployment auf server
# Talisman(app)

file_dir = Path(__file__)
dir = file_dir.parent

class SendTree(Resource):
    def get(self):
        baum = open(dir / "algorithmus/assets/baum.json")
        return json.load(baum)    

api.add_resource(SendTree, "/tree")

if __name__ == "__main__":
    app.run(debug=True)
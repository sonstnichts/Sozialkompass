from unittest import TestCase
from ..Algorithmus.Algorithmus_bestandteile import *
import json

# load apllication list from assets

data = open(dir / "algorithmus/assets/test_antraege.json")
application_list = json.load(data)

# load attribute list from assets

data = open(dir / "algorithmus/assets/test_attributes.json")
attributes = json.load(data)

class test_functions(TestCase):

    def test_delete_rows_none_of_the_above(self):

        question = "Staatsangehoerigkeit"

        result = [
                    {
                        "Name": "Bafög",
                        "Attribute": {
                        "Berufsstatus": "Studierender",
                        "Ausbildungsstaette": [
                            "Universität",
                            "Akademie",
                            "Fachhochschule",
                            "Hochschule"
                        ],
                        "Alter bei Beginn der Ausbildung": [0, 45],
                        "Sonstiges": [
                            [
                            {},
                            {
                                "Jahre in Deutschland": [5, 1000]
                            }
                            ]
                        ]
                        }
                    },
                    {
                        "Name": "Kindergeld",
                        "Attribute": {
                        "Kinder Anzahl": [1, 50],
                        "Sonstiges": [
                            [{}],
                            [
                            {
                                "Alter bei Beginn der Ausbildung": [0, 17]
                            }
                            ]
                        ]
                        }
                    }
                ]

        self.assertDictEqual(delete_rows_none_of_the_above(application_list,question),result)

class test_calculate_attributes(TestCase):
    def test_normal(self):
        result = {["Berufsstatus", 1], ["Ausbildungsstaette", 1], ["Alter bei Beginn der Ausbildung", 2], ["Staatsangehörigkeit", 3], ["Jahre in Deutschland", 1], ["Kinder Anzahl", 1]}
        self.assertDictEqual(calculate_attributes(application_list), result)
from unittest import TestCase
from ..Algorithmus.Algorithmus_bestandteile import *
#from Algorithmus import Algorithmus_bestandteile
import json
from pathlib import Path

# load apllication list from assets
file_dir = Path(__file__)
dir = file_dir.parent.parent

data = open(dir / "algorithmus/assets/test_antraege.json")
application_list = json.load(data)

# load attribute list from assets

data = open(dir / "algorithmus/assets/test_attributes.json")
attributes = json.load(data)

# set variable for test_asset path:
test_asset_path = "tests/test_assets"

class test_delete_rows_none_of_the_above(TestCase):

    def test_delete_rows_none_of_the_above(self):

        question = "Staatsangehoerigkeit"

        # load input data
        data = open(dir / test_asset_path / "test_delete_rows_none_of_the_above_input.json")
        application_list = json.load(data)
        
        #load result data
        data = open(dir / test_asset_path / "test_delete_rows_none_of_the_above_result.json")
        result = json.load(data)

        delete_rows_none_of_the_above(application_list,question)
        self.assertListEqual(application_list,result)

# class test_accept_applications(TestCase):
    
#     def test_accept_applications(self):

#         # load input data
#         data = open(dir / test_asset_path / "test_accept_applications.json")
#         application_list = json.load(data)
        
#         #load result data
#         data = open(dir / test_asset_path / "test_delete_rows_none_of_the_above_result.json")
#         result = json.load(data)

class test_delete_rows(TestCase):

    def test_delete_rows(self):

        # load input data

        data = open(dir / "algorithmus/assets/test_antraege.json")
        application_list = json.load(data)


        # load result data
        
        data = open(dir / test_asset_path / "test_accept_applications.json")
        result = json.load(data)

        question = "Staatsangehoerigkeit"
        answer_possibilities = "deutsch"
        questiontype = "Auswahl"

        delete_rows(application_list,question,answer_possibilities,questiontype)
        self.assertListEqual(application_list,result)

class test_calculate_attributes(TestCase):
    def test_normal(self):
        #{'d': 1, 'c': 1, 'f': 1}
        result = {"Berufsstatus": 1, "Ausbildungsstaette": 1, "Alter bei Beginn der Ausbildung" : 2, "Staatsangehörigkeit" : 3, "Jahre in Deutschland" : 1, "Kinder Anzahl" : 1}
        self.assertDictEqual(calculate_attributes(application_list), result)
    
    def test_true(self):
        self.assertTrue(self)

    def test_false(self):
        self.assertFalse(self)
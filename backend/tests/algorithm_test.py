from unittest import TestCase
from ..Algorithmus.Algorithmus_bestandteile import *
#from Algorithmus import Algorithmus_bestandteile
import json
from pathlib import Path

# load apllication list from assets
file_dir = Path(__file__)
dir = file_dir.parent.parent

data = open(dir / "tests/test_assets/test_antraege.json")
application_list = json.load(data)

# load attribute list from assets

data = open(dir / "tests/test_assets/test_attributes.json")
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

class test_remove_applications(TestCase):

    def test_remove_applications(self):

        # load input data
        data = open(dir / test_asset_path / "test_remove_applications_input.json")
        application_list = json.load(data)
        
        #load result data
        data = open(dir / test_asset_path / "test_remove_applications_result.json")
        result = json.load(data)

        remove_applications(application_list)
        self.assertListEqual(application_list,result)

class test_delete_rows(TestCase):

    # case where the attributes to be deleted are in the main section
    def test_delete_rows_2(self):

        data = open(dir / test_asset_path / "test_delete_rows_2_input.json")
        application_list = json.load(data)


        # load result data
        
        data = open(dir / test_asset_path / "test_delete_rows_2_result.json")
        result = json.load(data)

        question = "Staatsangehoerigkeit"
        answer_possibilities = ["Ausland"]
        questiontype = "Auswahl"

        delete_rows(application_list,question,answer_possibilities,questiontype)
        self.assertListEqual(application_list,result)


class test_generate_answers(TestCase):

    def test_generate_answers(self):

        question = "Staatsangehoerigkeit"
        attribute_category = "Auswahl"

        # load input data
        data = open(dir / test_asset_path /"test_antraege.json")
        application_list = json.load(data)
        
        #load result data
        data = open(dir / test_asset_path / "test_generate_answers_result.json")
        result = json.load(data)

        self.assertListEqual(generate_answers(application_list,question,attribute_category),result)


class test_calculate_attributes(TestCase):
    #{'a': 1, 'b': 2, 'c': 4} -> how the attributes are formated
    def test_normal(self):
        result = {"Berufsstatus": 1, "Ausbildungsstaette": 1, "Alter bei Beginn der Ausbildung" : 2, "Staatsangehoerigkeit" : 2, "Jahre in Deutschland" : 1, "Kinder Anzahl" : 1} #result list for the test
        self.assertDictEqual(calculate_attributes(application_list), result) #checks the wanted results against the actual results

    def test_empty(self):
        input = {}
        result = {}
        self.assertDictEqual(calculate_attributes(input), result)

    def test_only_nested(self):
        data = open(dir / test_asset_path / "test_only_nested.json")
        input = json.load(data)
        result = {"Staatsangehoerigkeit" : 2, "Jahre in Deutschland" : 1, "Alter bei Beginn der Ausbildung" : 1} #result list for the test
        self.assertDictEqual(calculate_attributes(input), result)

    #maybe a test for only nested attributes?
class test_calculate_result_set(TestCase):
    #['Wohngeld', 'Elterngeld', 'Kindergeld'] -> how the result set is formated
    def test_normal(self):
        result = ["Bafoeg", "Kindergeld"] #result list for the test
        self.assertListEqual(calculate_result_set(application_list), result) #checks the wanted results against the actual results

# class test_create_subtree(TestCase):
#     # {'Frage': 'Kinder_Anzahl', 'Ergebnismenge': ['Wohngeld', 'Elterngeld', 'Kindergeld'], 'Antworten': {}} -> how the tree is formated
#     def test_normal(self):
#         question = "Kinder Anzahl"
#         result_set = ["Bafoeg", "Kindergeld"]
#         skippedAttributes = []
#         result = {"Frage": "Kinder Anzahl", "Ergebnismenge": ["Bafoeg", "Kindergeld"], "Antworten": {}} #result list for the test
#         self.assertDictEqual(create_subtree(question, result_set, skippedAttributes), result) #checks the wanted results against the actual results

class test_split_array(TestCase):
    def test_normal(self):
        array = [["a", "b", "c"], ["c"], ["c", "d"]]
        result = [["a", "b"], ["c"], ["d"]]
        self.assertEqual(split_array(array), result)

    def test_subset(self):
        array = [["e", "f", "g"], ["f", "g"]]
        result = [["e"], ["f", "g"]]
        self.assertEqual(split_array(array), result)

    def test_normal_subset_combination(self):
        array = [["a", "b", "c"], ["c"], ["c", "d"], ["e", "f", "g"], ["f", "g"]]
        result = [["a", "b"], ["c"], ["d"], ["e"], ["f", "g"]]
        self.assertEqual(split_array(array), result)

    def test_equals(self):
        array = [["a", "b", "c"], ["a", "b", "c"]]
        result = [["a", "b", "c"]]
        self.assertEqual(split_array(array), result)
    
    def test_empty(self):
        array = []
        result = []
        self.assertEqual(split_array(array), result)
    
    def test_only_one_array(self):
        array = [["a", "b", "c"]]
        result = [["a", "b", "c"]]
        self.assertEqual(split_array(array), result)
    
    def test_double_subset(self):
        array = [["c", "d"], ["c", "d", "e", "f", "g"], ["f", "g"]]
        result = [["c", "d"], ["e"], ["f", "g"]]
        self.assertEqual(split_array(array), result)
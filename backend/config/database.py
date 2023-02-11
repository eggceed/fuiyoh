from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json
load_dotenv('.env')
username=os.getenv('name')
password=os.getenv('password')
client = MongoClient(f'mongodb://{username}:{password}@mongo.exceed19.online:8443/?authMechanism=DEFAULT')
# print(username,password)
db = client['exceed03']
menu = db['Default_menu']
order_count = db['Order_count']
order_menu = db['Order_menu']
seasoning_status = db['Seasoning_status']

if not order_count.find_one({}):
    order_count.insert_one({"order_count":0,"menu_count":0})
if not menu.find_one({}):
    a = json.load(open('config/test.json'))
    for i in a['init_menu']:
        order_count.update_one({},{"$set":{"menu_count":order_count.find_one({})['menu_count']+1}})
        menu.insert_one({"menu_id":order_count.find_one({})['menu_count'],"menu_name":i['menu_name'],"menu_url":i['menu_url'],"ingredient":i['ingredient'],"salt_gram":i['salt_gram'],"msg_gram":i['msg_gram']})

if not seasoning_status.find_one({}):
    seasoning_status.insert_many([{"seasoning_name":"salt","is_available":False},{"seasoning_name":"msg","is_available":False}])

    

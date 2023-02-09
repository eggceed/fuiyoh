from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv('.env')
username=os.getenv('name')
password=os.getenv('password')
client = MongoClient(f'mongodb://{username}:{password}@mongo.exceed19.online:8443/?authMechanism=DEFAULT')

print(username,password)
db = client['exceed03']
menu = db['Deafualt_menu']
order_count = db['Order_count']
order_menu = db['Order_menu']
seasoning_status = db['seasoning_status']

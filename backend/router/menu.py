from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Default_menu(BaseModel):
    menu_id:int
    menu_name:str
    menu_url:str
    ingredient:list(str)
    msg_gram:int
    salt_gram:int

class Order_menu(BaseModel):
    menu_id:int
    menu_name:str
    salt:int
    msg:int
    order_id:int
    order_time:datetime
    order_status:str



router = APIRouter(prefix='/menu')

@router.get('/')
def all_menu_list():
    return list(collection.find({},{'_id':0}))
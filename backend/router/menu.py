from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Default_menu:
    menu_name:str
    sugar-gram:int
    salt-gram:int

class Order_menu:
    menu_name:str
    sugar-gram:int
    salt-gram:int
    order_id:int
    order_time:datetime
    order_status:str

router = APIRouter(prefix='/menu')

@router.get('/')
def all_menu_list():
    return list(collection.find({},{'_id':0}))
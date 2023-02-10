from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Default_menu(BaseModel):
    menu_name:str
    menu_url:str
    menu_id:int=0
    ingredient:List[str]=[]
    msg_gram:int=0
    salt_gram:int=0

class Order_menu(BaseModel):
    menu_id:int
    menu_name:str
    salt:int=0
    msg:int=0
    order_id:int=0
    order_time:Union[datetime,None]=None
    order_status:str=''



router = APIRouter(prefix='/seasoning')

@router.get('/')
def nothing():
    return 'ok'
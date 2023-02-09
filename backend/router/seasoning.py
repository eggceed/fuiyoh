from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Default_menu(BaseModel):
    menu_name:str
    menu_url:str
    msg_gram:int=0
    salt_gram:int=0

class Order_menu(BaseModel):
    menu_name:str
    order_id:int
    order_time:datetime
    order_status:str
    salt:int=0
    msg:int=0



router = APIRouter(prefix='/seasoning')

@router.get('/')

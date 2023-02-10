from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Default_menu(BaseModel):
    menu_id:int
    menu_name:str
    menu_url:str
    ingredient:List[str]=[]
    msg_gram:int=0
    salt_gram:int=0

class Order_menu(BaseModel):
    menu_id:int
    menu_name:str
    salt:int=0
    msg:int=0
    order_id:int=0
    order_time:Union[datetime,str,None]=None
    order_status:str=''



router = APIRouter(prefix='/menu')


@router.get('/')
def all_menu_list():
    return list(menu.find({},{'_id':0}))

@router.get('/current')
def get_currnt_order_menu():
    if not order_menu.find_one({}):
        raise HTTPException(status_code=400,detail='did not do any menu before')
    menu_current=order_menu.find_one({'order_id':order_count.find_one({})['order_count']},{"_id":0})
    menu_current=Order_menu(order_id=menu_current['order_id'],menu_id=menu_current['menu_id'],menu_name=menu_current['menu_name'],salt=menu_current['salt'],msg=menu_current['msg'],order_time=menu_current['order_time'],order_status=menu_current['order_status'])
    # print(menu_current)
    if menu_current.order_status=='Complete':
        raise HTTPException(status_code=400,detail='Nothing menu to do')
    return {menu_current}

@router.get('/current/status')
def update_currnt_order_status(order_id:int,order_status:str):
    pass
    if not order_menu.find_one({}):
        raise HTTPException(status_code=400,detail='did not do any menu before')
    menu_current=order_menu.find_one({'order_id':order_count.find_one({})['order_count']},{"_id":0})
    return menu_current

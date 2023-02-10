from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException,Body
from config.database import *
from typing import Union,Optional,List

class Default_menu(BaseModel):
    menu_id:int=0
    menu_name:str=''
    menu_url:str=''
    ingredient:List[str]=[]
    msg_gram:int=0
    salt_gram:int=0

class Order_menu(BaseModel):
    menu_id:int=0
    menu_name:str=''
    salt:int=0
    msg:int=0
    order_id:int=0
    order_time:Union[datetime,None]=None
    order_status:str=''



router = APIRouter(prefix='/menu')

@router.get('/')
def all_menu_list():
    if menu.find_one({},{'_id':0})==None:
        raise HTTPException(status_code=400,detail='no menu')
    return list(menu.find({},{'_id':0}))

@router.post('/add')
def update_new_menu(default_menu:Default_menu):
    cnt=order_count.find_one({},{'_id':0})
    cnt['menu_count']+=1
    if default_menu.menu_name=='':
        raise HTTPException(status_code=400,detail='menu_name is required')
    new_menu = Default_menu(menu_id=cnt['menu_count'],menu_name=default_menu.menu_name,menu_url=default_menu.menu_url,ingredient=default_menu.ingredient,msg_gram=default_menu.msg_gram,salt_gram=default_menu.salt_gram)
    menu.insert_one(new_menu.dict())
    order_count.update_one({},{'$set':cnt})
    return {'message':'success'}

@router.post('/order')
def post_order_menu(default_menu:Default_menu):
    cnt=order_count.find_one({},{'_id':0})
    cnt['order_count']+=1
    if order_menu.find_one({'order_status':'ordering'},{'_id':0}):
        raise HTTPException(status_code=400,detail='already ordering')
    if default_menu.menu_id==None:
        raise HTTPException(status_code=400,detail='menu_name not found')
    if default_menu.menu_name=='':
        raise HTTPException(status_code=400,detail='menu_name is required')
    new_order_menu = Order_menu(menu_id=default_menu.menu_id,menu_name=default_menu.menu_name,msg=default_menu.msg_gram/5,salt=default_menu.salt_gram/5,order_id=cnt['order_count'],order_time=str(datetime.now()),order_status='ordering')
    order_menu.insert_one(new_order_menu.dict())
    
    order_count.update_one({},{'$set':cnt})
    return {'order_id':(cnt['order_count'])}

@router.get('/current')
def get_current_order_menu():
    if order_menu.find_one({},{'_id':0})==None:
        raise HTTPException(status_code=400,detail='no order')
    return list(order_menu.find({},{'_id':0}))


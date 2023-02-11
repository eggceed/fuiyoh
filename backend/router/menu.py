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
    order_time:Union[datetime,str,None]=None
    order_status:str=''



router = APIRouter(prefix='/menu')


@router.get('/')
def all_menu_list():
    if menu.find_one({},{'_id':0})==None:
        raise HTTPException(status_code=400,detail='no menu')
    return list(menu.find({},{'_id':0}))
@router.get('/num/{menu_id}')
def some_menu_show(menu_id:int):
    if menu.find_one({},{'_id':0})==None:
        raise HTTPException(status_code=400,detail='no menu')
    if not menu.find_one({'menu_id':menu_id},{'_id':0}):
        raise HTTPException(status_code=400,detail='menu_id not found')
    return menu.find_one({'menu_id':menu_id},{'_id':0})
@router.post('/add')
def update_new_menu(default_menu:Default_menu):
    cnt=order_count.find_one({},{'_id':0})
    cnt['menu_count']+=1
    if menu.find_one({'menu_name':default_menu.menu_name},{'_id':0}):
        raise HTTPException(status_code=400,detail='menu_name already exist')
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
    if default_menu.msg_gram and default_menu.salt_gram and seasoning_status.find_one({'msg':False},{'_id':0}) and seasoning_status.find_one({'salt':False},{'_id':0}):
        raise HTTPException(status_code=400,detail='salt and msg not available')
    if default_menu.msg_gram and seasoning_status.find_one({'msg':False},{'_id':0}):
        raise HTTPException(status_code=400,detail='msg not available')
    if default_menu.salt_gram and seasoning_status.find_one({'salt':False},{'_id':0}):
        raise HTTPException(status_code=400,detail='salt not available')
    new_order_menu = Order_menu(menu_id=default_menu.menu_id,menu_name=default_menu.menu_name,msg=default_menu.msg_gram/5,salt=default_menu.salt_gram/5,order_id=cnt['order_count'],order_time=str(datetime.now()),order_status='ordering')
    order_menu.insert_one(new_order_menu.dict())
    order_count.update_one({},{'$set':cnt})
    return {'order_id':(cnt['order_count'])}

@router.get('/current')
def get_currnt_order_menu():
    if not order_menu.find_one({}):
        raise HTTPException(status_code=400,detail='did not do any menu before')
    menu_current=order_menu.find_one({'order_id':order_count.find_one({})['order_count']},{"_id":0})
    menu_current=Order_menu(order_id=menu_current['order_id'],menu_id=menu_current['menu_id'],menu_name=menu_current['menu_name'],salt=menu_current['salt'],msg=menu_current['msg'],order_time=menu_current['order_time'],order_status=menu_current['order_status'])
    # print(menu_current)
    if menu_current.order_status=='Complete':
        raise HTTPException(status_code=400,detail='Nothing menu to do')
    return menu_current

@router.get('/current/status/{order_id}')
def get_currnt_order_status(order_id:int):
    pass
    if not order_menu.find_one({}):
        raise HTTPException(status_code=400,detail='did not do any menu before')
    menu_current=order_menu.find_one({'order_id':order_id},{"_id":0})
    if not menu_current:
        raise HTTPException(status_code=400,detail='Order id not found')
    return menu_current

@router.get('/search/{menu_name}')
def search_menu(menu_name:str):
    if menu.find_one({},{'_id':0})==None:
        raise HTTPException(status_code=400,detail='no menu')
    if not menu.find_one({'menu_name':menu_name},{'_id':0}):
        raise HTTPException(status_code=400,detail='menu_name not found')
    return menu.find_one({'menu_name':menu_name},{'_id':0})

@router.put('/current/order/status')
def update_current_order_status(order:Order_menu):
    if not order_menu.find_one({}):
        raise HTTPException(status_code=400,detail='did not do any menu before')
    if not order_menu.find_one({'order_id':order.order_id}):
        raise HTTPException(status_code=400,detail='Order id not found')
    order_menu.update_one({'order_id':order.order_id},{'$set':{'order_status':order.order_status}})
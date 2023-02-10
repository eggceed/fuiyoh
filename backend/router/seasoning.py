from pydantic import BaseModel
from datetime import datetime,timedelta
from fastapi import APIRouter,HTTPException
from config.database import *
from typing import Union,Optional,List

class Seasoning(BaseModel):
    seasoning_name:str=''
    is_available:bool=False



router = APIRouter(prefix='/seasoning')

@router.post('/')
def update_seasoning_status(seasoning:Seasoning):
    if seasoning.seasoning_name not in ['msg','salt']:
        raise HTTPException(status_code=400,detail='seasoning name not found')
    seasoning_status.update_one({'seasoning_name':seasoning.seasoning_name},{'$set':{'is_available':seasoning.is_available}})
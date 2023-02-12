# Database
### Order_count
back-end use to generate order_id
|    Attributes    | Data type |
|------------------|-----------|
|   order_count    |    int    |
|    menu_count    |    int    |
### Default_menu
front-end get defual menu from back end with this form and post back menu after edit the ingredian with this form
###
| Attributes | Data_type |
|------------|-----------|
|   menu_id  |    int    |
| menu_names |    str    |
| menu_url   |    str    |
| ingredient | list(str) |
| salt_gram  |    int    |
|  msg_gram  |    int    |

### Order_menu
back-end recieve data from front-end send forward with hardware and get update status from hardware to return back to front-end to display

| Attributes | Data_type |
|------------|-----------|
|   menu_id  |    int    |
| menu_names |    str    |
|    salt    |    int    |
|    msg     |    int    |
|  order_id  |    int    |
| order_time |  datetime |
|order_status|    str    |

### Seasoning_status
|   Attributes    | Data_type |
|-----------------|-----------|
| seasoning_name  |    str    |
|  is_available   |   bool    |


# method
base_url:exceed03@group3.exceed19.online

## GET get_all_menu_list()

back-end get all menu from database and send to front-end

endpoint: /menu/

    return list of Default menu form

## GET get_some_menu_show({num_id})
back-end get some menu from database and send to front-end

endpoint: /menu/num/{menu_id}
    
    return default menu form

## GET search_menu()
backend get specified menu name to find in database and send to frontend

endpoint: /menu/search/{menu_name}

    return default menu from

## POST update_new_menu(json:{menu_name:str,menu_url:str,ingredient:list(str),salt_gram:int,msg_gram:int})
front-end add new menu send to back-edn for insert to database

endpoint: /menu/add/
    
    return {add_compelte:}
## POST order_menu(json:{order_id:int,menu_name:str,msg_gram:int,salt_gram:int})

front end edit order from defualt menu and send to back-end. back-end covert default menu form to order form and upload to database

endpoint: /menu/order/

    return {order_id}
## GET get_current_order_menu()
back-end send order menu to hardware

end point: /menu/current/

    return order menu form
## POST update_current_order_status(json:{order_id:int,status:str})
hardware update status of order menu back to back-end to update database

endpoint: /menu/order/status/

## GET get_order_status(json{order_id:int}})
front end get status of order menu from backend to display if finished

endpoint: /menu/current/status

    return  {status}

## POST update_seasoning_status(json:{seasoning_name:str,is_avialable:bool})
hardware update status to back-end

endpoint: /seasoning/




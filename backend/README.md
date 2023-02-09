# Database
### Order_count
back-end use to generate order_id
|    Attributes    | Data type |
|------------------|-----------|
|   order_count    |    int    |
|  finished_count  |    int    |
### Default_menu
front-end get defual menu from back end with this form and post back menu after edit the ingredian with this form
###
| Attributes | Data_type |
|------------|-----------|
| menu_names |    str    |
| sugar_gram |    int    |
| salt_gram  |    int    |

### Order_menu
back-end recieve data from front-end send forward with hardware and get update status from hardware to return back to front-end to display

| Attributes | Data_type |
|------------|-----------|
| menu_names |    str    |
|    sugar   |    int    |
|    salt    |    int    |
|  order_id  |    int    |
| order_time |  datetime |
|order_status|    str    |

### Ingredient_status
|   Attributes    | Data_type |
|-----------------|-----------|
| ingredient_name |    str    |
|  is_available   |   bool    |


# method
base_url:exceed03@group3.exceed19.online

## GET get_all_menu_list()

back-end get all menu from database and send to front-end

endpoint: /menu/

    return list of Default menu form
## POST order_menu(json:{order_id,menu_name,sugar,salt})

front end edit order from defualt menu and send to back-end. back-end covert default menu form to order form and upload to database

endpoint: /menu/order/

    return {order_id}
## GET get_current_order_menu()
back-end send order menu to hardware

end point: /menu/current/

    return order menu form
## PUT update_current_order_status(json:{order_id,status})
hardware update status of order menu back to back-end to update database

endpoint: /menu/order/status/

## GET get_order_status({order_id}})
front end get status of order menu from backend to display if finished

endpoint: /menu/current/status

    return  {status}

## POST update_ingredient_status(json:{ingredient_name,is_avialable})
hardware update status to back-end

endpoint: /ingredient/



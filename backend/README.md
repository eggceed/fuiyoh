# Database
### Order count
back-end use to generate order_id
| Attributes | Data type |
|------------|-----------|
|   count    |    int    |
### Default menu
front-end get defual menu from back end with this form and post back menu after edit the ingredian with this form
###
| Attributes | Data type |
|------------|-----------|
| menu-names |    str    |
| sugar-gram |    int    |
| salt-gram  |    int    |

### Order menu
back-end recieve data from front-end send forward with hardware and get update status from hardware to return back to front-end to display

| Attributes | Data type |
|------------|-----------|
| menu-names |    str    |
|    sugar   |    int    |
|    salt    |    int    |
|  order_id  |    int    |
| order_time |  datetime |
|order_status|    str    |

# method
base_url:exceed03@group3.exceed19.online

## get all_menu_list()

back-end get all menu from database and send to front-end

endpoint: /menu/

    return list of Default menu form
## post order_menu(json:{order_id,menu_name,sugar,salt})

front end edit order from defualt menu and send to back-end. back-end covert default menu form to order form and upload to database

endpoint: /menu/order/

    return {order_id}
## get current_order_menu()
back-end send order menu to hardware

end point: /menu/order/

    return order menu form
## put update_current_order_status(json:{order_id,status})
hardware update status of order menu back to back-end to update database

endpoint: /menu/order/status/

## get order_status({order_id}})
front end get status of order menu from backend to display if finished

endpoint: /menu/order/status

    return  {status}



### Database
### Default menu
front-end get defual menu from back end with this form and post back menu after edit the ingredian with this form

1. menu-names:str
2. sugar-gram:int
3. salt-gram:int

### order menu
back-end recieve data from front-end send forward with hardware and get update status from hardware to return back to front-end to display

1. menu-names:str
2. sugar:int
3. salt:int
4. order_id:int
5. time:datetime
6. status:str


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
## get get_order_menu()
back-end send order menu to hardware

end point: /menu/order/

    return order menu form
## put update_status(json:{order_id,status})
hardware update status of order menu back to back-end to update database

endpoint: /menu/order/status/

    send with order menu form

## get get_finished_order({order_id}})
front end get status of order menu from backend to display if finished

endpoint /menu/order/status

    return  {status}



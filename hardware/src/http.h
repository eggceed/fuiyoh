#include <HTTPClient.h>
#include <ArduinoJson.h>

typedef struct sOrderMenu {
  int menuId;
  String menuName;
  int salt;
  int msg;
  int orderId = -1;
  String datetime;
  String status;
} OrderMenu;

DynamicJsonDocument GET_current_order() throw (char*);
OrderMenu fromJson(DynamicJsonDocument json);
bool PUT_order_status(void* param) throw (char*);

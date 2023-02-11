#include <HTTPClient.h>
#include <ArduinoJson.h>

typedef struct sOrderMenu {
  int salt;
  int msg;
  int orderId = -1;
  String status;
} OrderMenu;

DynamicJsonDocument GET_current_order() throw (char*);
OrderMenu fromJson(DynamicJsonDocument json);
bool PUT_order_status(OrderMenu* order);
bool PUT_seasoning_status(String seasoning, bool isAvailable);

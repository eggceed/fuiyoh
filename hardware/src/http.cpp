#include "http.h"

const String API_URL = "https://ecourse.cpe.ku.ac.th/exceed03";

HTTPClient http;

DynamicJsonDocument GET_current_order() throw (char*) {
  /*
   * Returns JSON object which is the current order of the system.
   * Throws an exception string if the response code is not 200.
   */
  String endpoint = API_URL + "/menu/current";
  http.begin(endpoint);
  int responseCode = http.GET();
  if (responseCode != 200) throw "HTTP Error";  

  DynamicJsonDocument doc(1024);
  String payload = http.getString();
  deserializeJson(doc, payload);

  return doc;
}

OrderMenu fromJson(DynamicJsonDocument json) {
  OrderMenu order;
  String status = json["order_status"].as<String>();
  if (status != "working") return order;
  order.menuId = json["menu_id"].as<int>();
  order.menuName = json["menu_names"].as<String>();
  order.salt = json["salt"].as<int>();
  order.msg = json["msg"].as<int>();
  order.orderId = json["order_id"].as<int>();
  order.datetime = json["order_time"].as<String>();
  order.status = status;
  return order;
}

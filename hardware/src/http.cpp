#include "http.h"

const String API_URL = "https://ecourse.cpe.ku.ac.th/exceed03";

DynamicJsonDocument GET_current_order() throw (char*) {
  /*
   * Returns JSON object which is the current order of the system.
   * Throws an exception string if the response code is not 200.
   */
  HTTPClient http;
  String endpoint = API_URL + "/menu/current";
  http.begin(endpoint);
  int responseCode = http.GET();
  if (responseCode == 400) {
    String payload = http.getString();
    throw "GET /menu/current: " + payload;
  }
  if (responseCode != 200) throw "GET /menu/current: HTTP Error";  

  DynamicJsonDocument doc(1024);
  String payload = http.getString();
  deserializeJson(doc, payload);

  http.end();

  return doc;
}

OrderMenu fromJson(DynamicJsonDocument json) {
  OrderMenu order;
  String status = json["order_status"].as<String>();
  if (status != "ordering") return order;
  order.menuId = json["menu_id"].as<int>();
  order.menuName = json["menu_names"].as<String>();
  order.salt = json["salt"].as<int>();
  order.msg = json["msg"].as<int>();
  order.orderId = json["order_id"].as<int>();
  order.datetime = json["order_time"].as<String>();
  order.status = status;
  return order;
}

bool PUT_order_status(OrderMenu order) throw (char*) {
  HTTPClient http;
  DynamicJsonDocument doc(1024);
  doc["menu_id"] = order.menuId;
  doc["menu_names"] = order.menuName;
  doc["salt"] = order.salt;
  doc["msg"] = order.msg;
  doc["order_id"] = order.orderId;
  doc["order_time"] = order.datetime;
  doc["status"] = "Complete";

  String body;
  serializeJson(doc, body);

  String endpoint = API_URL + "/menu/order/status";
  http.begin(endpoint);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.PUT(body);
  if (responseCode == 400) {
    String payload = http.getString();
    throw "PUT /menu/order/status: " + payload;
  }
  if (responseCode != 200) throw "PUT /menu/order/status: HTTP Error";
  http.end();
  return true;
}

bool PUT_seasoning_status(String seasoning, bool isAvailable) throw (char*) {
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["seasoning_name"] = seasoning;
  doc["is_available"] = isAvailable;

  String body;
  serializeJson(doc, body);

  String endpoint = API_URL + "/seasoning";
  http.begin(endpoint);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.PUT(body);
  if (responseCode == 400) {
    String payload = http.getString();
    throw "PUT /seasoning: " + payload;
  }
  if (responseCode != 200) throw "PUT /seasoning: HTTP Error";
  http.end();
  return true;
}

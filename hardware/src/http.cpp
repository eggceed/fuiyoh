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
  order.salt = json["salt"].as<float>();
  order.msg = json["msg"].as<float>();
  order.orderId = json["order_id"].as<int>();
  order.status = status;
  return order;
}

bool PUT_order_status(OrderMenu* order) {
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["order_id"] = order->orderId;
  doc["order_status"] = "complete";

  String body;
  serializeJson(doc, body);

  String endpoint = API_URL + "/menu/current/order/status";
  http.begin(endpoint);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.PUT(body);
  if (responseCode == 400) {
    String payload = http.getString();
    Serial.println("PUT /menu/current/order/status: " + payload);
    return false;
  }
  if (responseCode != 200) { Serial.println("PUT /menu/current/order/status: HTTP Error " + String(responseCode)); return false; }
  http.end();
  return true;
}

bool PUT_seasoning_status(String seasoning, bool isAvailable) {
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["seasoning_name"] = seasoning;
  doc["is_available"] = isAvailable;

  String body;
  serializeJson(doc, body);

  String endpoint = API_URL + "/seasoning/";
  http.begin(endpoint);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.PUT(body);
  if (responseCode == 400) {
    String payload = http.getString();
    Serial.println("PUT /seasoning: " + payload);
    return false;
  }
  if (responseCode != 200) { Serial.println("PUT /seasoning: HTTP Error " + String(responseCode)); return false; }
  http.end();
  return true;
}

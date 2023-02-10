#include <Arduino.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "http.h"

void updateCurrentOrder(void* param);

OrderMenu current_order;

void setup() {
  Serial.begin(115200);
  //TODO: Create a task to function updateCurrentOrder as Core: 0, Priority: 0.
}

void loop() {

}

void updateCurrentOrder(void* param) {
  while (1) {
    try {
      DynamicJsonDocument doc = GET_current_order();
      current_order = fromJson(doc);
    } catch (char* ex) {
      Serial.print("Exception Caught: ");
      Serial.println(ex);
    }
    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

#include <Arduino.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "http.h"

const String SALT_STR = "salt";
const String MSG_STR = "msg";
bool SALT_STATUS = true;
bool MSG_STATUS = true;
int SALT_DURATION = 0;
int MSG_DURATION = 0;

TaskHandle_t taskGETCurrentOrder;     // P: 0 C: 0
TaskHandle_t taskPUTOrderStatus;      // P: 1 C: 0
TaskHandle_t taskPUTSeasoningStatus;  // P: 1 C: 0
TaskHandle_t taskOpenValves;          // P: 2 C: 1
TaskHandle_t taskMonitorSeasoning;    // P: 1 C: 1

void fetchCurrentOrder(void* param);
void updateOrderStatus(void* param);
void updateSeasoningStatus(void* param);
void prepareSeasoning(void* param);
void checkSeasoning(void* param);
void initTasks();

OrderMenu current_order;

void setup() {
  Serial.begin(115200);
  initTasks();
}

void loop() {
  // This function runs as Priority 1 Core 1.
}

void fetchCurrentOrder(void* param) {
  /*
   * Try to fetch current order from backend.
   */
  while (1) {
    try {
      DynamicJsonDocument doc = GET_current_order();
      current_order = fromJson(doc);
      if (current_order.status == "ordering") {
        SALT_DURATION = current_order.salt;
        MSG_DURATION = current_order.msg;
      }
    } catch (char* ex) {
      Serial.print("Exception Caught: ");
      Serial.println(ex);
    }
    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

void updateOrderStatus(void* param) {
  /*
   * Try to send Complete order status to current order in backend.
   */
  while (1) {
    try {
      if (PUT_order_status(current_order)) vTaskDelete(nullptr);
    } catch (char* ex) {
      Serial.print("Exception Caught: ");
      Serial.println(ex);
    }
    vTaskDelay(10000 / portTICK_PERIOD_MS);
  }
}

void updateSeasoningStatus(void* param) {
  /*
   * Try to send two of the seasonings' status to backend.
   */
  while (1) {
    bool successes[2] = {false, false};
    try {
      successes[0] = PUT_seasoning_status(SALT_STR, SALT_STATUS);
      successes[1] = PUT_seasoning_status(MSG_STR, MSG_STATUS);
      if (std::all_of(
            std::begin(successes),
            std::end(successes),
            [](bool b) { return b; })
          ) {
        vTaskDelete(nullptr);
      }
    } catch (char* ex) {
      Serial.print("Exception Caught: ");
      Serial.println(ex);
    }
    vTaskDelay(10000 / portTICK_PERIOD_MS);
  }
}

void initTasks() {
  xTaskCreatePinnedToCore(
      fetchCurrentOrder,
      "GET Current Order",
      10240,  // Stack size
      NULL,  // Parameters, takes void*
      0,  // Priority
      &taskGETCurrentOrder,  // Task Handle to register
      0  // CPU Core (0 or 1)
  );
}

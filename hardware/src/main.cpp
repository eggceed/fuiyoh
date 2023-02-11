#include <Arduino.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "main.h"
#include "mywifi.h"
#include "http.h"
#include "FS.h"

#define SERVO_PIN 26    // LEFT, OPEN: 180, CLOSE: 90
#define SERVO_PIN_1 25  // RIGHT

const String SALT_STR = "salt";
const String MSG_STR = "msg";
bool SALT_STATUS = true;
bool MSG_STATUS = true;
int SALT_DURATION = 0;
int MSG_DURATION = 0;
bool working = false;

TaskHandle_t taskGETCurrentOrder;     // P: 1 C: 1
TaskHandle_t taskPUTOrderStatus;      // P: 2 C: 1
TaskHandle_t taskPUTSeasoningStatus;  // P: 2 C: 1
TaskHandle_t taskOpenValves;          // P: 1 C: 0
TaskHandle_t taskMonitorSeasoning;    // P: 0 C: 0

void fetchCurrentOrder(void* param);
void updateOrderStatus(void* param);
void updateSeasoningStatus(void* param);
void prepareSeasoning(void* param);
void checkSeasoning(void* param);
void initTasks();

Servo myservo; 
Servo myservo_1;
DetectionSensor detect = DetectionSensor(14, 34);
DetectionSensor detect_1 = DetectionSensor(12, 32);
OrderMenu current_order;

void setup() {
  Serial.begin(115200);
  myservo.attach(SERVO_PIN);  
  myservo_1.attach(SERVO_PIN_1);
  pinMode(detect.laser, OUTPUT);
  pinMode(detect_1.laser, OUTPUT);
  pinMode(detect.ldr, INPUT);
  pinMode(detect_1.ldr, INPUT);
  digitalWrite(detect.laser, HIGH);
  digitalWrite(detect_1.laser, HIGH);
  connect_WiFi();
  initTasks();
}

void loop() {
  delay(100);
  // This function runs as Priority 1 Core 1.
}

void fetchCurrentOrder(void* param) {
  /*
   * Try to fetch current order from backend.
   */
  if (taskPUTOrderStatus != nullptr) vTaskDelete(taskPUTOrderStatus);
  while (1) {
    try {
      DynamicJsonDocument doc = GET_current_order();
      current_order = fromJson(doc);
      if (!working && current_order.status == "ordering" && MSG_STATUS && SALT_STATUS) {
        Serial.println("Will now work on an order " + String(current_order.orderId));
        SALT_DURATION = current_order.salt;
        MSG_DURATION = current_order.msg;
        working = true;
        xTaskCreatePinnedToCore(
            prepareSeasoning,
            "Prepare Seasoning",
            2048,
            NULL,
            1,
            &taskOpenValves,
            0
        );
      }
    } catch (char* ex) {
      Serial.print("Exception Caught: ");
      Serial.println(ex);
    }
    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

void prepareSeasoning(void* param) {
  while(1) {
    myservo.write(180);
    vTaskDelay((SALT_DURATION * 1000) / portTICK_PERIOD_MS);
    myservo.write(100);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    myservo_1.write(90);
    vTaskDelay((MSG_DURATION * 1000) / portTICK_PERIOD_MS);
    myservo_1.write(0);
    SALT_DURATION = 0;
    MSG_DURATION = 0;
    Serial.println("Finished dispensing...");
    xTaskCreatePinnedToCore(
        updateOrderStatus,
        "Update Order Status",
        20480,
        NULL,
        2,
        &taskPUTOrderStatus,
        1
    );
    vTaskDelete(nullptr);
  }
}

void updateOrderStatus(void* param) {
  /*
   * Try to send Complete order status to current order in backend.
   */
  while (1) {
      if (PUT_order_status(&current_order)) { 
        working = false;
        Serial.println("Finished updating order: " + String(current_order.orderId));
        vTaskDelete(nullptr);
      }
    vTaskDelay(10000 / portTICK_PERIOD_MS);
  }
}

void updateSeasoningStatus(void* param) {
  /*
   * Try to send two of the seasonings' status to backend.
   */
  int tries = 0;
  while (1) {
    bool successes[2] = {false, false};
      successes[0] = PUT_seasoning_status(SALT_STR, SALT_STATUS);
      successes[1] = PUT_seasoning_status(MSG_STR, MSG_STATUS);
      if (std::all_of(
            std::begin(successes),
            std::end(successes),
            [](bool b) { return b; })
          ) {
        Serial.println("Finished updating seasoning status.");
        vTaskResume(taskMonitorSeasoning);
        vTaskDelete(nullptr);
      tries++;
      if (tries >= 10) {
        Serial.println("Cannot complete request to backend. Perhaps backend is in maintenance?");
        vTaskDelete(nullptr);
      }
    vTaskDelay(10000 / portTICK_PERIOD_MS);
  }
}}

const int countThreshold = 6;
int checkCounts[2] = {0, 0};
DetectionSensor sensors[2] = {detect, detect_1};

void checkSeasoning(void* param) {
  /*
   * Check seasoning level every 100ms, if any is empty, update the corressponding seasoning state.
   * SALT = 0
   * MSG = 1
   */
  while (1) {
    for (int i = 0; i < 2; i++) {
      if (checkCounts[i] >= countThreshold) {
        if (!i && SALT_STATUS) {
          SALT_STATUS = false;
          Serial.println("SALT: UNAVAILABLE");
          xTaskCreatePinnedToCore(
            updateSeasoningStatus,
            "Update Seasoning Status",
            10240,
            NULL,
            2,
            &taskPUTSeasoningStatus,
            1
          );
          vTaskSuspend(taskMonitorSeasoning);
        }
        else if (i && MSG_STATUS) { 
          MSG_STATUS = false;
          Serial.println("MSG: UNAVAILABLE");
          xTaskCreatePinnedToCore(
            updateSeasoningStatus,
            "Update Seasoning Status",
            10240,
            NULL,
            2,
            &taskPUTSeasoningStatus,
            1
          );
          vTaskSuspend(taskMonitorSeasoning);
        }
      }
      int light = (analogRead(sensors[i].ldr));
      // Serial.println("Light: "+ String(sensors[i].ldr)+":" + String(light));
      if (light >= 3100) {
        checkCounts[i] += 1;
      } else {
        checkCounts[i] = 0;
        if (!i && !SALT_STATUS) {
          SALT_STATUS = true;
          Serial.println("SALT: AVAILABLE");
          xTaskCreatePinnedToCore(
            updateSeasoningStatus,
            "Update Seasoning Status",
            10240,
            NULL,
            2,
            &taskPUTSeasoningStatus,
            1
          );
          vTaskSuspend(taskMonitorSeasoning);
        } else if (i && !MSG_STATUS) {
          MSG_STATUS = true;
          Serial.println("MSG: AVAILABLE");
          xTaskCreatePinnedToCore(
            updateSeasoningStatus,
            "Update Seasoning Status",
            10240,
            NULL,
            2,
            &taskPUTSeasoningStatus,
            1
          );
          vTaskSuspend(taskMonitorSeasoning);
        }
      }
    }
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

void initTasks() {
  xTaskCreatePinnedToCore(
      checkSeasoning,
      "Monitor Seasoning",
      2048,
      NULL,
      0,
      &taskMonitorSeasoning,
      0
  );
  xTaskCreatePinnedToCore(
      fetchCurrentOrder,
      "GET Current Order",
      20480,  // Stack size
      NULL,  // Parameters, takes void*
      1,  // Priority
      &taskGETCurrentOrder,  // Task Handle to register
      1  // CPU Core (0 or 1)
  );
}

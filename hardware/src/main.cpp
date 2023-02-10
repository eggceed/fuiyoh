#include <Arduino.h>
#include <ESP32Servo.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#define SERVO_PIN 26
#define SERVO_PIN_1 25
TaskHandle_t Task_SERVO = NULL;
TaskHandle_t Task_SERVO_1 = NULL;
Servo myservo; 
Servo myservo_1;
int pos = 0;  
int pos1 = 0;
void sweep_servo(void *param);
void sweep_servo1(void *param);

void setup() {

  xTaskCreatePinnedToCore(sweep_servo, "sweep", 1000, NULL, 1, &Task_SERVO, 0);
  xTaskCreatePinnedToCore(sweep_servo1, "sweep1", 1000, NULL, 1, &Task_SERVO, 1);
  myservo.attach(26);  
  myservo_1.attach(25);
}

void loop() {
}

void sweep_servo (void *param){
    while(1){
        for (int pos = 0; pos <= 90; pos += 1) {
    myservo.write(pos);
    delay(45); 
  }
  for (int pos = 90; pos >= 0; pos -= 1) {
    myservo.write(pos);
    delay(45); 
  }
    }
}

void sweep_servo1(void *param){
    while(1){
        for (int pos1 = 0; pos1 <= 90; pos1 += 1) {
    myservo_1.write(pos1);
    delay(45); 
  }
  for (int pos1 = 90; pos1 >= 0; pos1 -= 1) {
    myservo_1.write(pos1);
    delay(45); 
  }
    }
}
#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#define LASER 14
#define RED 33
#define LDR 34

void setup() {
  Serial.begin(115200);
  pinMode(14, OUTPUT);  
  pinMode(34, INPUT);
  pinMode(33, OUTPUT);
}

void loop() {
  digitalWrite(14, HIGH);
  int light = map(analogRead(LDR),0,4095,0,255);
  Serial.println(light);
  if(light >= 255)
  {
    digitalWrite(33, HIGH);
  }
  else{
    digitalWrite(33, LOW);
  }
} 
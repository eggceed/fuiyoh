#include <Arduino.h>

struct DetectionSensor {
  const int laser;
  const int ldr;
  DetectionSensor(int laser, int ldr) :
    laser(laser), ldr(ldr) {}
};

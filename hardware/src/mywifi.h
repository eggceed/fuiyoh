#include <WiFi.h>
#include "wifi_credentials.h"

void connect_WiFi() {
  WiFi.begin(SSID, PASSWD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.print("OK! IP=");
  Serial.println(WiFi.localIP());
  Serial.println("----------------------------------");
}

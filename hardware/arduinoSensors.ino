#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <Adafruit_TSL2591.h>
#include <Adafruit_VEML6075.h>
#include "SoftwareSerial.h"
#include <ArduinoJson.h>

SoftwareSerial sdsSerial(2, 3); // RX, TX for SDS011

Adafruit_BME280 bme;
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
Adafruit_VEML6075 uv = Adafruit_VEML6075();

float p25, p10;

void readSDS011() {
  byte m[10];
  if (sdsSerial.available() > 0) {
    if (sdsSerial.read() == 0xAA) {
      for (int i = 0; i < 10; i++) {
        m[i] = sdsSerial.read();
      }
      if (m[9] == 0xAB && (byte)(m[0] + m[1] + m[2] + m[3] + m[4] + m[5] + m[6]) == m[7]) {
        p25 = (float)(((m[3] * 256) + m[2])) / 10;
        p10 = (float)(((m[5] * 256) + m[4])) / 10;
      }
    }
  }
}

void setup() {
  Serial.begin(9600);
  sdsSerial.begin(9600);
  
  if (!bme.begin()) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
  
  if (!tsl.begin()) {
    Serial.println("Could not find a valid TSL2591 sensor, check wiring!");
    while (1);
  }

  if (!uv.begin()) {
    Serial.println("Could not find a valid VEML6075 sensor, check wiring!");
    while (1);
  }

  tsl.setGain(TSL2591_GAIN_MED);
  tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
}

void loop() {
  StaticJsonDocument<512> doc;

  float temperature = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F;
  
  uint16_t full, ir;
  tsl.getLuminosity(&full, &ir);
  float lux = tsl.calculateLux(full, ir);

  float uva = uv.readUVA();
  float uvb = uv.readUVB();
  float index = uv.readUVIndex();

  int airQuality = analogRead(A0); // MQ135 connected to A0

  readSDS011();

  doc["temperature_C"] = temperature;
  doc["humidity_%"] = humidity;
  doc["pressure_hPa"] = pressure;
  doc["light_lux"] = lux;
  doc["UVA"] = uva;
  doc["UVB"] = uvb;
  doc["UV_index"] = index;
  doc["air_quality_raw"] = airQuality;
  doc["PM2.5_µg/m3"] = p25;
  doc["PM10_µg/m3"] = p10;

  serializeJson(doc, Serial);
  Serial.println();

  delay(5000);
}

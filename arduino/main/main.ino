#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h> //use version 5, not 6 b/c of problems with buffer
#include "config.h"

void setup()
{
  Serial.begin(115200);
  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);

  WiFi.begin(ssid, password); //Connect to the WiFi network

  while (WiFi.status() != WL_CONNECTED)
  { //Wait for connection
    delay(500);
    Serial.println("Waiting to connect...");
    Serial.print("MAC: ");
    Serial.println(WiFi.macAddress());
  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP()); //Print the local IP
}

int checkForNewMode() {
  HTTPClient http;  //Declare an object of class HTTPClient
  http.begin(host, fingerprint);  //Specify request destination
  http.addHeader("Content-Type", "application/json");  //Specify content-type header
  String postMessage = "{\"data\": {\"key\": \"04eda352470370b797680e2b80a9c8aaa80c3a39\", \"rgbid\": \"rgblivingroom\"}}";
  int httpCode = http.POST(postMessage);
  Serial.print("http result:");
  Serial.println(httpCode);
  //http.writeToStream(&Serial);
  String payload = http.getString();
  http.end();
  Serial.println("payload: " + payload);
  DynamicJsonBuffer jsonBuffer;
  JsonObject& data = jsonBuffer.parseObject(payload);
  int newmodesetting = data["result"]["data"]["mode"];
  Serial.print("mode: ");
  Serial.println(newmodesetting);
  int newpower = data["result"]["data"]["power"];
  Serial.print("power: ");
  Serial.println(newpower);
  //Serial.println(power);
  if (newpower == 1) {
    //Serial.println(newmodesetting);
    //Serial.println(modesetting);
    if (newmodesetting != modesetting) {
      modesetting = newmodesetting;
    }
  } else {
    modesetting = 0;
  }
  power = newpower;
  return modesetting;
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    int oldmode = modesetting;
    int newmode = checkForNewMode();
    if (oldmode != newmode) {
      setMode(newmode);
    } else if (newmode == 9) {
      setMode(9);
    }
  } else {

    Serial.println("Error in WiFi connection");

  }
  delay(numsecdelay * 1000);    //Send a request every few seconds
}

void setMode(int data) {
  if (data == 0)             // Checks whether value of data is equal to 0
  {
    Serial.println("Off");
    //turn off for now
    digitalWrite(REDPIN, LOW);
    digitalWrite(GREENPIN, LOW);
    digitalWrite(BLUEPIN, LOW);
    return;
  }
  else if (data == 2)
  {
    Serial.println("Red");
    //RED
    digitalWrite(REDPIN, HIGH);
    digitalWrite(GREENPIN, LOW);
    digitalWrite(BLUEPIN, LOW);
    delay(delay_mode);
    return;
  }
  else if (data == 3)
  {
    Serial.println("Green");
    //GREEN
    digitalWrite(REDPIN, LOW);
    digitalWrite(GREENPIN, HIGH);
    digitalWrite(BLUEPIN, LOW);
    delay(delay_mode);
    return;
  }
  else if (data == 4)
  {
    Serial.println("Blue");
    //BLUE
    digitalWrite(REDPIN, LOW);
    digitalWrite(GREENPIN, LOW);
    digitalWrite(BLUEPIN, HIGH);
    delay(delay_mode);
    return;
  }
  else if (data == 5)
  {
    Serial.println("Magenta");
    //MAGENTA
    digitalWrite(REDPIN, HIGH);
    digitalWrite(GREENPIN, LOW);
    digitalWrite(BLUEPIN, HIGH);
    delay(delay_mode);
    return;
  }
  else if (data == 6)
  {
    Serial.println("Yellow");
    //YELLOW
    digitalWrite(REDPIN, HIGH);
    digitalWrite(GREENPIN, HIGH);
    digitalWrite(BLUEPIN, LOW);
    delay(delay_mode);
    return;
  }
  else if (data == 7)
  {
    Serial.println("Cyan");
    //CYAN
    digitalWrite(REDPIN, LOW);
    digitalWrite(GREENPIN, HIGH);
    digitalWrite(BLUEPIN, HIGH);
    delay(delay_mode);
    return;
  }
  else if (data == 8)
  {
    Serial.println("White");
    //WHITE
    digitalWrite(REDPIN, HIGH);
    digitalWrite(GREENPIN, HIGH);
    digitalWrite(BLUEPIN, HIGH);
    delay(delay_mode);
    return;
  }
  else if (data == 9)
  {
    int r, g, b;
    Serial.println("fade");
    // fade from blue to violet
    for (r = 0; r < 256; r++) {
      analogWrite(REDPIN, r);
      delay(FADESPEED);
      Serial.println("fade");
    }
    int newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
    // fade from violet to red
    for (b = 255; b > 0; b--) {
      analogWrite(BLUEPIN, b);
      delay(FADESPEED);
      Serial.println("fade");
    }
    newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
    Serial.println("fade");
    // fade from red to yellow
    for (g = 0; g < 256; g++) {
      analogWrite(GREENPIN, g);
      delay(FADESPEED);
      Serial.println("fade");
    }
    newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
    // fade from yellow to green
    for (r = 255; r > 0; r--) {
      analogWrite(REDPIN, r);
      delay(FADESPEED);
      Serial.println("fade");
    }
    newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
    // fade from green to teal
    for (b = 0; b < 256; b++) {
      analogWrite(BLUEPIN, b);
      delay(FADESPEED);
      Serial.println("fade");
    }
    newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
    // fade from teal to blue
    for (g = 255; g > 0; g--) {
      analogWrite(GREENPIN, g);
      delay(FADESPEED);
      Serial.println("fade");
    }
    newmode = checkForNewMode();
    if (newmode != 9) {
      setMode(newmode);
      return;
    }
  }
}


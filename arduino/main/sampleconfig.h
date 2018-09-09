#define REDPIN 5
#define GREENPIN 4
#define BLUEPIN 2
#define FADESPEED 20     // make this higher to slow down


const unsigned int delay_mode = 100;

const char *ssid = "networkname";
const char *password = "networkpassword";
const char* host = "https://us-central1-appname.cloudfunctions.net/getrgbsettings";
const unsigned int numsecdelay = 5;
const char* fingerprint = "AA AA 12 AA B3 4A 43 BB BB BB BB AA AA AA AA AA AA YY YY XX"; //or thumbprint on windows. get from dev console on chrome in security

unsigned int modesetting = 3;
unsigned int power = 1;
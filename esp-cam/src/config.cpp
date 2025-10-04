#include "config.h"
#include "utils.h"
#include <SPIFFS.h>

std::map<String, String> config;

// Loaded from config file
char ssid[64];
char password[64];
bool serialEnabled = true;

// Function to load config from SPIFFS
bool loadConfig() {
    // Initialize SPIFFS
    if (!SPIFFS.begin(true)) {
        serialPrintln("SPIFFS mount failed");
        return false;
    }

    // Open config file
    File configFile = SPIFFS.open("/config.txt", "r");
    if (!configFile) {
        serialPrintln("Config file not found");
        return false;
    }

    // Read key-value pairs
    while (configFile.available()) {
        // Read a line from the file
        String line = configFile.readStringUntil('\n');
        line.trim();
        if (line.startsWith("#") || line.length() == 0)
            continue; // Skip comments/empty

        // Split at '='
        int sep = line.indexOf('=');
        if (sep > 0) {
            String key = line.substring(0, sep);
            String value = line.substring(sep + 1);
            config[key] = value;
        }
    }

    // Close file
    configFile.close();

    // Set credentials
    if (config.count("SSID"))
        strcpy(ssid, config["SSID"].c_str());
    if (config.count("PASSWORD"))
        strcpy(password, config["PASSWORD"].c_str());

    // Set serial enabled
    serialEnabled = (config["SERIAL"] == "true");

    return true;
}
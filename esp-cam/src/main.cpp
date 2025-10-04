
#include "config.h"
#include "esp_camera.h"
#include "server.h"
#include "utils.h"
#include <WiFi.h>

// Connect to WiFi
bool connectToWiFi() {
    // Check if WiFi credentials are provided
    if (strlen(ssid) == 0 || strlen(password) == 0) {
        serialPrintln("WiFi credentials not set!");
        return false; // Cannot connect without credentials
    }

    // Start connecting to WiFi
    WiFi.begin(ssid, password);
    serialPrint("Connecting to WiFi");

    // Set timeout for WiFi connection (30 seconds)
    unsigned long startTime = millis();
    const unsigned long timeout = 30000; // 30 seconds

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED) {
        // Check for timeout
        if (millis() - startTime > timeout) {
            serialPrintln("\nWiFi connection timeout!");
            return false; // Connection failed due to timeout
        }

        // Wait and print a dot
        delay(500);
        serialPrint(".");
    }

    // Connected
    serialPrintln("\nWiFi connected!");
    serialPrint("ESP32-CAM IP address: ");
    serialPrintln(WiFi.localIP().toString());
    return true;
}

// Setup the camera
bool setupCamera() {
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sccb_sda = SIOD_GPIO_NUM;
    config.pin_sccb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG; // Set the format to JPEG
    config.frame_size = FRAMESIZE_UXGA;   // Set the resolution to 1600x1200
    config.fb_count = 1;                  // Number of frame buffers
    config.jpeg_quality = 12;             // Set JPEG quality (range 10-63; lower = better quality but larger file)

    // Initialize the camera
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        serialPrintf("Camera init failed with error 0x%x", err);
        return false; // Initialization failed
    }

    // Initialization successful
    return true;
}

// Setup function
void setup() {
    // Setup the serial connection
    setupSerial();

    // Load config (env variables)
    if (!loadConfig())
        return;

    // Connect to WiFi
    if (!connectToWiFi())
        return;

    // Setup the camera
    if (!setupCamera())
        return;

    // Setup web server
    if (!setupWebServer())
        return;
}

// Loop function
void loop() {
    server.handleClient(); // Handle incoming client requests
}
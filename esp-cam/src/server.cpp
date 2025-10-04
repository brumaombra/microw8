#include "server.h"
#include "esp_camera.h"
#include "utils.h"

WebServer server(80);

// Handler for the /capture endpoint
bool handleCapture() {
    // Capture a frame from the camera
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb) {
        server.send(500, "text/plain", "Camera capture failed");
        return false; // Capture failed
    }

    // Send the image as pure JPEG
    server.send_P(200, "image/jpeg", (const char *)fb->buf, fb->len);
    esp_camera_fb_return(fb);
    return true; // Capture and send successful
}

// Setup the web server
bool setupWebServer() {
    server.on("/capture", handleCapture);
    server.begin();
    serialPrintln("HTTP server started");
    return true;
}
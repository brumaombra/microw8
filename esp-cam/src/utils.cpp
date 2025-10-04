#include "utils.h"
#include "config.h"
#include <stdarg.h>

// Setup the serial connection
void setupSerial() {
    Serial.begin(115200);
}

// Custom serial print
void serialPrint(String msg) {
    if (serialEnabled)
        Serial.print(msg);
}

// Custom serial println
void serialPrintln(String msg) {
    if (serialEnabled)
        Serial.println(msg);
}

// Custom serial printf
void serialPrintf(const char *format, ...) {
    if (serialEnabled) {
        va_list args;
        va_start(args, format);
        Serial.printf(format, args);
        va_end(args);
    }
}
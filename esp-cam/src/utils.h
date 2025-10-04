#ifndef UTILS_H
#define UTILS_H

#include <Arduino.h>

void setupSerial();
void serialPrint(String msg);
void serialPrintln(String msg);
void serialPrintf(const char *format, ...);

#endif
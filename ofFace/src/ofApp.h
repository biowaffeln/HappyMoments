#pragma once

#include "ofMain.h"
#include "ofxFaceTracker.h"

class ofApp : public ofBaseApp
{
public:
  void setup();
  void update();
  void draw();
  void keyPressed(int key);

  ofVideoGrabber cam;
  ofxFaceTracker tracker;
  ExpressionClassifier classifier;
  int smileCount = 0;
  int neutralCount = 0;
  int threshold = 5;
  bool smiling = false;
  ofImage faceImg;
};

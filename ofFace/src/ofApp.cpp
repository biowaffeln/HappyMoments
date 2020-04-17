#include "ofApp.h"
#include "ofxArgParser.h"

void ofApp::setup()
{
  ofSetVerticalSync(true);
  cam.setup(640, 480);

  tracker.setup();
  tracker.setRescale(.5);
  classifier.load("expressions");

  vector<string> keys = ofxArgParser::allKeys();
  for (int i = 0; i < keys.size(); i++)
  {
    if (keys[i] == "threshold")
      threshold = std::stoi(ofxArgParser::getValue(keys[i]));
  }
}

void ofApp::update()
{
  cam.update();
  if (cam.isFrameNew())
  {
    ofLog() << (tracker.getFound() ? "face detected" : "no face detected");
    if (tracker.update(ofxCv::toCv(cam)))
    {
      classifier.classify(tracker);
      int expression = classifier.getPrimaryExpression();
      // ofLog() << expression;
      if (expression == 0)
        neutralCount++;
      if (expression == 1)
        smileCount++;

      if (smileCount > threshold && !smiling)
      {
        ofLog() << "cheese!";
        faceImg = cam.getPixels();
        faceImg.save("face.jpg");
        smiling = true;
        neutralCount = 0;
      }
      if (neutralCount > threshold && smiling)
      {
        smiling = false;
        smileCount = 0;
      }
    }
  }
}

void ofApp::draw()
{
}

void ofApp::keyPressed(int key)
{
}

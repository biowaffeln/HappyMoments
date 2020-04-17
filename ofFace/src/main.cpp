#include "ofApp.h"
#include "ofAppNoWindow.h"
#include "ofxArgParser.h"

int main(int argc, const char **argv)
{
    ofAppNoWindow window;
    ofSetupOpenGL(&window, 640, 480, OF_WINDOW);
    ofxArgParser::init(argc, argv);
    return ofRunApp(std::make_shared<ofApp>());
}

# pyFace

A python script for face detection using openCV, keras, and the [face_recognition](https://github.com/ageitgey/face_recognition) library.

## installation

_requirements:_

- python 3.6
- dlib (see installation [here](https://github.com/davisking/dlib#compiling-dlib-python-api))

This project uses `pipenv`. To install the dependencies, run `pipenv install`. Then execute the script with `pipenv run python main.py`.

## Usage

Run the main.py script. The application connects to a webcam, categorizes the recognized face into seven categories (Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise), and prints the result to the console.

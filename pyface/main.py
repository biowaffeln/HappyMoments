import numpy as np
import cv2
import face_recognition
import pyscreenshot
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import img_to_array

classifier = load_model("./models/model_v6_23.hdf5")
cap = cv2.VideoCapture(0)
class_labels = {0: 'Angry', 1: 'Disgust', 2: 'Fear',
                3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}

while True:
    ret, frame = cap.read()
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    face_locations = face_recognition.face_locations(
        image, number_of_times_to_upsample=0)

    for face_location in face_locations:
        top, right, bottom, left = face_location
        # print(" Face Location - Top: {}, Left: {}, Bottom: {}, Right: {}".format(
        #     top, left, bottom, right))
        face_image = image[top:bottom, left:right]
        cv2.imshow("face", face_image)

        resized = cv2.resize(face_image, (48, 48))
        resized = resized.astype("float") / 255.0
        resized = img_to_array(resized)
        resized = np.expand_dims(resized, axis=0)

        result = classifier.predict(resized)[0]
        print(result)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

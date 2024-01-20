from tensorflow.keras.models import load_model
import numpy as np
import cv2
import requests


def preprocess_new_video(video_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH):
    new_frames = frame_extract(
        video_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH)
    new_features = np.array([new_frames])
    return new_features


def frame_extract(video_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH):
    FRAME_LIST = []
    video_reader = cv2.VideoCapture(video_path)
    video_frame_count = int(video_reader.get(cv2.CAP_PROP_FRAME_COUNT))
    skip_frames_window = max(int(video_frame_count/SEQUENCE_LENGTH), 1)
    for frame_counter in range(SEQUENCE_LENGTH):
        video_reader.set(cv2.CAP_PROP_POS_FRAMES,
                         frame_counter*skip_frames_window)
        success, frame = video_reader.read()

        if not success:
            break
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        normalise_frame = resized_frame/255
        FRAME_LIST.append(normalise_frame)
    video_reader.release()
    return FRAME_LIST


def ActivityDetection():
    CLASS_NAME = ["fights", "nofights"]

    loaded_model = load_model('model.h5')

    IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64
    SEQUENCE_LENGTH = 20

    # new_video_path = "1.mpg"
    new_video_path = "3.avi"
    new_features = preprocess_new_video(
        new_video_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH)

    new_predictions = loaded_model.predict(new_features)

    predicted_labels = np.argmax(new_predictions, axis=1)
    predicted_class = CLASS_NAME[predicted_labels[0]]

    print(f"The predicted class for the new video is: {predicted_class}")
    body = {
        'prediction': predicted_class,
    }
    url = 'http://localhost:8000/api/recieveActivityPrediction'
    response = requests.post(url, json=body)

    # Check the response
    if response.status_code == 200:
        print('Activity Data sent successfully:', response.json())
    else:
        print('Error:', response.status_code, response.text)

# app.py
from flask import Flask, jsonify, request
from threading import Thread, Lock
import detect
import activity
import face
import traffic
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)


class DetectionData:
    def __init__(self):
        self.detection_result = ""
        self.detection_lock = Lock()
        self.stop_detection_flag = False


detection_data = DetectionData()
detection_thread = None
traffic_thread = None
activity_thread = None
face_thread = None


@app.route('/start-detection', methods=['POST'])
def start_detection():
    global detection_thread

    message = request.json.get('message', '')
    print(f"Received message: {message}")

    if message == "Start":
        if detection_thread is None or not detection_thread.is_alive():
            detection_thread = Thread(target=detect.run_detection)
            detection_thread.start()
            print("Started")
            return jsonify({"status": "Detection started"}), 200
        else:
            return jsonify({"status": "Detection already running"}), 200
    elif message == "Stop":
        if detection_thread and detection_thread.is_alive():
            detect.stop_detection(detection_data)
            return jsonify({"status": "Detection stopped"}), 200
        else:
            return jsonify({"status": "No detection running"}), 200
    else:
        return jsonify({"status": "Invalid message"}), 400


@app.route('/start-traffic', methods=['POST'])
def start_traffic():
    global traffic_thread

    message = request.json.get('message', '')
    print(f"Received message: {message}")

    if message == "Start":
        if traffic_thread is None or not traffic_thread.is_alive():
            traffic_thread = Thread(target=traffic.traffic)
            traffic_thread.start()
            print("Started")
            return jsonify({"status": "Traffic Detection started"}), 200
        else:
            return jsonify({"status": "Traffic Detection already running"}), 200
    else:
        return jsonify({"status": "Invalid message"}), 400


@app.route('/start-activity', methods=['POST'])
def start_activity():
    global activity_thread

    message = request.json.get('message', '')
    print(f"Received message: {message}")

    if message == "Start":
        if activity_thread is None or not activity_thread.is_alive():
            activity_thread = Thread(target=activity.ActivityDetection)
            activity_thread.start()
            print("Started")
            return jsonify({"status": "Activity Detection started"}), 200
        else:
            return jsonify({"status": "Activity Detection already running"}), 200
    else:
        return jsonify({"status": "Invalid message"}), 400


@app.route('/start-face', methods=['POST'])
def start_face():
    global face_thread

    message = request.json.get('message', '')
    print(f"Received message: {message}")

    if message == "Start":
        if face_thread is None or not face_thread.is_alive():
            face_thread = Thread(target=face.capture_and_verify)
            face_thread.start()
            print("Started Face")
            return jsonify({"status": "Face Detection started"}), 200
        else:
            return jsonify({"status": "Face Detection already running"}), 200
    else:
        return jsonify({"status": "Invalid message"}), 400


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

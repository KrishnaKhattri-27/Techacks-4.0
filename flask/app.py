# app.py
from flask import Flask, jsonify, request
from threading import Thread, Lock
import detect
from flask_cors import CORS


from tensorflow.keras.models import load_model

# model = load_model('model.h5')

app = Flask(__name__)
CORS(app)

# predictions = model.predict(input_data)


class DetectionData:
    def __init__(self):
        self.detection_result = ""
        self.detection_lock = Lock()
        self.stop_detection_flag = False


detection_data = DetectionData()
detection_thread = None  # Initialize the detection thread variable globally


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


if __name__ == '__main__':
    # start_detection()
    app.run(host='127.0.0.1', port=5000, debug=True)

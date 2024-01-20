# detect.py
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image as img
import cv2
import torch
import numpy as np
import base64
import requests
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name="dohky5q86",
    api_key="971431767226324",
    api_secret="lZcQav4UbfAHM3M2GbcxZ9YtbdM"
)


def run_detection():
    processor = ViTImageProcessor.from_pretrained(
        'google/vit-base-patch16-224')
    model = ViTForImageClassification.from_pretrained(
        'google/vit-base-patch16-224')

    cap = cv2.VideoCapture(0)
    print("Starting Camera")

    while True:
        ret, frame = cap.read()

        if frame is not None:
            rgb_frame_manual_swap = frame[:, :, [2, 1, 0]]
            pil_image = img.fromarray(rgb_frame_manual_swap)

            inputs = processor(images=pil_image, return_tensors="pt")

            with torch.no_grad():
                outputs = model(**inputs)

            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()

            res = model.config.id2label[predicted_class_idx]
            words_to_match = ["skrewdriver", "syringe", "paperknife", "knife", "toolkit", "drumstick", "safety pin", "chain"
                              "carpenter's kit", "cleaver", "meat cleaver", "chopper", "rhinoceros beetle", "can opener, tin opener"
                              "ignitor", "cork screw", "bottle screw", "resolver", "six-gun", "hook, claw"
                              "revolver, six-gun, six-shooter", "letter opener, paper knife, paperknife", "assault rifle, assault gun"]

            if res.lower() in map(str.lower, words_to_match):
                print(f"{res} matches one of the specified words.")
                success, buffer = cv2.imencode('.png', frame)
                if not success:
                    print("Error converting frame to PNG format")

                else:

                    png_data = np.array(buffer).tobytes()

                    res_str = str(res.lower())
                    if res_str in map(str.lower, words_to_match):
                        print(f"{res_str} matches one of the specified words.")

                        cloud_result = cloudinary.uploader.upload(
                            png_data, public_id=res_str)

                        print("Sent Image to Cloudinary")

                        secure_url = cloud_result['secure_url']
                        print(secure_url)
                        body = {
                            'image_url': secure_url,
                            'result': res_str
                        }
                        url = 'http://localhost:8000/api/receiveImageChunk'
                        response = requests.post(url, json=body)

                        if response.status_code == 200:
                            print('Image sent successfully:', response.json())
                            break
                        else:
                            print('Error:', response.status_code, response.text)

            cv2.imshow("Webcam", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

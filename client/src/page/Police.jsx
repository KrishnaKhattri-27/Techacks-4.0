import React, { useState } from "react";
import PoliceResponse from "../components/Police/PoliceResponse";
import Navbar from "../components/Navbar/Navbar";
import PopUp from "../components/Police/PopUp";
import Button from "../components/Button/Button";

const Police = ({ status, messages ,yesHandler}) => {
  const [detectionResult, setDetectionResult] = useState(null);
  const [data, setData] = useState("");
  const [imageData, setImageData] = useState(null);
  const [errorDetecting, setErrorDetecting] = useState("");

  const startObjectDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start-detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Start",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Start Object Detection", result.detection_result);
        setDetectionResult(result.detection_result);
      } else {
        console.error("Failed to start object detection:", response.statusText);
        setErrorDetecting("Failed to start object detection");
      }
    } catch (error) {
      console.error("Error during object detection request:", error.message);
      setErrorDetecting("Error during object Detection");
    }
  };

  
  return (
    <div className="homebg h-screen">
      <Navbar />
      <PoliceResponse
        detectionResult={detectionResult}
        data={data}
        imageData={imageData}
        errorDetecting={errorDetecting}
        startObjectDetection={startObjectDetection}
        // CheckActivityDetection={CheckActivityDetection}
        // startObjectDetection={startObjectDetection}
      />
      {status ? <PopUp status={status} messages={messages} yesHandler={yesHandler} /> : null}
    </div>
  );
};

export default Police;

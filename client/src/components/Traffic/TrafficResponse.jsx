import React, { useEffect, useState } from "react";
import camera from "../../assests/camera.svg";
import upload from "../../assests/upload.svg";
import { IoCameraOutline } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import Charts from "./Charts";

const TrafficResponse = ({ data, imageData, startObjectDetection }) => {
  const { t, i18n } = useTranslation();
  const animationProps = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.4 },
  };
  const [ActivityStatus, setActivityStatus] = useState("");
  const [detectionResult, setDetectionResult] = useState(null);
  const [errorDetecting, setErrorDetecting] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("messageFromFace", (prediction) => {
      console.log("Face PRedictions on Frontend");
      if (true) {
        setActivityStatus("Face Detected");
      } else {
        setActivityStatus("No Face Detected");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const [trafficNumber, setTrafficNumber] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("messageFromTraffic", (number) => {
      console.log("Traffic on Server is on Traffic.jsx ", number);
      setTrafficNumber(number);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const CheckTrafficDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start-traffic", {
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
        console.log("Start Traffic Detection", result.detection_result);
        setDetectionResult(result.detection_result);
      } else {
        console.error(
          "Failed to start objTraffic  detection:",
          response.statusText
        );
        setErrorDetecting("Failed to start Traffic detection");
      }
    } catch (error) {
      console.error("Error during Traffic detection request:", error.message);
      setErrorDetecting("Error during Traffic Detection");
    }
  };

  const CheckFaceDetection = async () => {
    try {
      console.log("Hello From Face");
      const response = await fetch("http://127.0.0.1:5000/start-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Start",
        }),
      });
      console.log("Response", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Start face Detection", result.detection_result);
        setDetectionResult(result.detection_result);
      } else {
        console.error("Failed to start face detection:", response.statusText);
        setErrorDetecting("Failed to start face detection");
      }
    } catch (error) {
      console.error("Error during face detection request:", error.message);
      setErrorDetecting("Error during face Detection");
    }
  };

  return (
    <div className="flex justify-around px-8 items-center h-[70%]">
      <motion.div {...animationProps}>
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            {" "}
            <IoCameraOutline style={{ color: "white" }} size={140} />
          </Link>
        </div>
        <div className="text-center">
          <Button funcName={CheckTrafficDetection} text={t("CameraButton")} />
        </div>
        {trafficNumber && (
          <p className="text-2xl text-white">
            Max Cars Detected is {trafficNumber}
          </p>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col items-center justify-center"
        {...animationProps}
      >
        <div>
          <MdFileUpload style={{ color: "white" }} size={140} />
        </div>
        <input
          type="file"
          id="myFile"
          name="filename"
          className="text-transparent bg-none"
        ></input>
        <div className="text-center" onClick={CheckFaceDetection}>
          <Button text={t("UploadButton")} />
        </div>
        {ActivityStatus && <p className="text-2xl text-white">Face Detected</p>}
      </motion.div>
      <div>
        <h1 className="text-2xl text-white">Traffic Analysis for Rajpura</h1>
        <Charts />
      </div>
    </div>
  );
};

export default TrafficResponse;

import React, { useEffect, useState } from "react";
import camera from "../../assests/camera.svg";
import upload from "../../assests/upload.svg";
import { IoCameraOutline } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {motion} from "framer-motion"
import { io } from "socket.io-client";
 

const PoliceResponse = ({ data, imageData, startObjectDetection }) => {
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

    socket.on("messageFromActivity", (prediction) => {
      console.log("ACtivity PRedictions on Frontend is  ", prediction);
      if (prediction == "fights") {
        setActivityStatus("Fighting Detected");
      } else {
        setActivityStatus("No Fighting Detected");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const CheckActivityDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start-activity", {
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
    <div className="flex justify-around px-8 items-center h-[70%]">
      <motion.div {...animationProps}>
        <div className="flex flex-col items-center justify-center" >
          <Link to="/">
            {" "}
            <IoCameraOutline style={{ color: "white" }} size={140} />
          </Link>
        </div>
        <div className="text-center">
          <Button funcName={startObjectDetection} text={t("CameraButton")} />
        </div>
      </motion.div>
      <motion.div className="flex flex-col items-center justify-center" {...animationProps}>
        <div>
          <MdFileUpload style={{ color: "white" }} size={140} />
        </div>
        <input
          type="file"
          id="myFile"
          name="filename"
          className="text-transparent bg-none"
        ></input>
        <div className="text-center">
          <Button text={t("UploadButton")} funcName={CheckActivityDetection} />
        </div>
        {ActivityStatus && (
          <p className="text-2xl text-white">{ActivityStatus}</p>
        )}
      </motion.div>
    </div>
  );
};

export default PoliceResponse;

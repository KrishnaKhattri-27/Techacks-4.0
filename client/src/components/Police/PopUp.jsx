import React, { useEffect } from "react";
import heo from "../../assests/Hello.png";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import audioFile from "../../assests/buzzur.wav";

import "./Police.css";

const PopUp = ({ messages, yesHandler, status }) => {
  const { t, i18n } = useTranslation();

  const audioRef = useRef(null);

  const playAudio = () => {
    const audio = audioRef.current;

    // Resetting the audio to the beginning
    audio.currentTime = 0;

    // Play the audio
    audio.play();

    // Stop the audio after 5 seconds
    setTimeout(() => {
      audio.pause();
    }, 10000);
  };

  useEffect(() => {
    if (status) playAudio();
  }, []);

  return (
    <div className="rounded-3xl p-7 bg-gray-700 bg-opacity-85 w-[70%] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
      <div className="w-[30%]">
        <img src={messages.img} alt="" className="h-full rounded-lg" />
        {/* <img src={heo} alt="" className="h-full rounded-lg" /> */}
      </div>
      <div className="w-[70%] px-10  flex flex-col justify-around">
        <p className="text-3xl text-white ">{t("SuspiciousDetection")}</p>
        <div className="text-white flex justify-around">
          <div
            className="flex gap-x-1 greenbutton justify-center items-center w-20 py-1 cursor-pointer"
            onClick={() => yesHandler("YES")}
          >
            <TiTick size={21} />
            <span className="font-bold">{t("YesCheck")}</span>
          </div>
          <div
            className="flex gap-x-2 redbutton greenbutton justify-center items-center w-20 py-1 cursor-pointer"
            onClick={() => yesHandler("NO")}
          >
            <ImCross size={14} />
            <span className="font-bold">{t("NoCheck")}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={audioFile}></audio>
    </div>
  );
};

export default PopUp;

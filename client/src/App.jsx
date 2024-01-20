import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Police from "./page/Police";
import Traffic from "./page/Traffic";
import { io } from "socket.io-client";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const nav = useNavigate();
  const [status, setStatus] = useState(false);
  const [messages, setMessages] = useState({
    img: "",
    title: "",
  });
  const [isloggedin, setLoggedin] = useState(false);

  useEffect(() => {
    if (!isloggedin) nav("/login");
  }, []);

  const passData = async (data) => {
    console.log("good", data);
    const response = await fetch("http://localhost:8000/v1/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("userToken", JSON.stringify(json.data));
      setLoggedin(true);
    } else {
      console.log(json.error);
    }
  };
  const alert_message =
  "WARNING..!! Suspicious Activity Detected. Confirm if the detected emergence is an actual emergency or not.";
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("messageFromServer", (message, image_url) => {
      console.log("socket",message, image_url);
      setMessages({
        img: image_url,
        title: message,
      });
      setStatus(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isloggedin) {
      setTimeout(() => {
        nav("/");
      }, 500);
    }
  }, [isloggedin]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) setLoggedin(false);
  //   else {
  //     setLoggedin(true);
  //   }
  // }, []);

  const yesHandler = async (e) => {
    let sub, cont;
    if (e === "YES") {
      sub = "Immediate Alert - Confirmed Suspicious Activity";
      cont = `Dear [Higher Authority's Name],\n\nI urgently report the detection of suspicious activity by our AI surveillance system. [Monitor's Name] has verified and marked the activity as confirmed, triggering an alarm in the designated.\nPlease find the attached suspicious image. area\n\nRegards\nTechnical Team\n\nLink:${messages.img}
        `;
    } else {
      sub = "Clarification - Resolved Alert on Detected Suspicious Activity";
      cont = `"Dear [Higher Authority's Name],\n\nI wish to update you that our AI surveillance system initially detected suspicious activity. However, upon review, [Monitor's Name] has marked the activity as a false positive. No further action is required at this time\nPlease find the attached suspicious image. area\n\nRegards\nTechnical Team\n\nLink:${messages.img}`;
    }
    const temp = { sub: sub, cont: cont };
    const response = await fetch("http://localhost:8000/v1/sendMail", {
      method: "POST",
      body: JSON.stringify(temp),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    setStatus(false)
    return response.json();
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/login"
        element={<Login isloggedin={isloggedin} passData={passData} />}
      />
      <Route path="/police" element={<Police messages={messages} status={status} yesHandler={yesHandler}  />} />
      <Route path="/traffic" element={<Traffic />} />
    </Routes>
  );
}

export default App;

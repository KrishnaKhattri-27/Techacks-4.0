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
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("messageFromServer", (message, image_url) => {
      console.log(message, image_url);
      setStatus({
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

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/login"
        element={<Login isloggedin={isloggedin} passData={passData} />}
      />
      <Route path="/police" element={<Police />} />
      <Route path="/traffic" element={<Traffic />} />
    </Routes>
  );
}

export default App;

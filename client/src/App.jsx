import { useState } from "react";
import "./App.css";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login"
import Police from "./page/Police"
import Traffic from "./page/Traffic";
import {Routes,Route} from "react-router-dom"


function App() {

  const [isloggedin, setLoggedin] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // const name=e.target.name.value;
    // const password=e.target.password.value;
    // setUserData({name,password})
    setLoggedin(true)
  };

  return (
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route
      path="/login"
      element={
        <Login handleSubmit={handleSubmit} isloggedin={isloggedin} />
      }
    />
    <Route
      path="/police"
      element={<Police  />}
    />
    <Route path="/traffic" element={<Traffic />} />
  </Routes>
  );
}

export default App;

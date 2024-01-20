import React, { useEffect, useState } from "react";
import "./style.css";
import {useNavigate} from "react-router-dom"
// import logo from "../assests/logo.svg";
import { motion } from "framer-motion";
import Button from "../components/Button/Button";

// import { Link } from "react-router-dom";

const Login = ({ isloggedin, passData }) => {
  const nav=useNavigate()
  const [data, setData] = useState({
    name:"",
    password:""
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [isAnimating, setIsAnimating] = useState(false);

  const animationProps = {
    initial: { scale: 1 },
    animate: { scale: isloggedin ? 16 : 1 },
    transition: { duration: 0.4, delay: 0.4 }, 
  };

  const divprop1 = {
    initial: { x: 0 },
    animate: { x: isloggedin ? 5000 : 0 },
    transition: { duration: 0.4 },
  };
  const divprop2 = {
    initial: { x: 0 },
    animate: { x: isloggedin ? -5000 : 0 },
    transition: { duration: 0.4 },
  };

  const scrollBarStyle = {
    overflow: isloggedin ? "hidden" : "auto",
    scrollbarWidth: "none",
  };

  // useEffect(()=>{
    
  // },[isloggedin])

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({name,password})
    // setLoggedin(true)
  };
  useEffect(()=>{
    passData(data);

  },[data])

  return (
    <motion.div
      className={`h-screen login-bg px-8`}
      {...animationProps}
      style={scrollBarStyle}
    >
      {/* <motion.div className="py-6" {...divprop3}>
        <img src={logo} alt="" />
      </motion.div> */}
      <div className="flex justify-between items-center px-24 mt-28">
        <motion.div className="w-1/2 " {...divprop2}>
          <p className="text-gray-300 font-inter text-5xl font-medium leading-normal">
            A solution which{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent font-inter text-5xl font-medium leading-normal">
              saves
            </span>{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent font-inter text-5xl font-medium leading-normal">
              lives
            </span>{" "}
            by connecting accident witnesses with emergency services.
          </p>
        </motion.div>
        <motion.div className="w-1/2 flex justify-end" {...divprop1}>
          <div className="rounded-3xl bg-opacity-50 bg-[#D2D2D2] w-[390px] h-[420px] px-12 py-[15%]">
            <h3 className="text-black font-inter text-3xl font-bold leading-normal">
              Sign-in
            </h3>
            <form className="mt-4" onSubmit={(e)=>handleSubmit(e)}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label
                  for="name"
                  className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  User Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label
                  for="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <Button text="Continue" Buttontype="submit" />
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;

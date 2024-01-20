import React, { Suspense } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {motion} from "framer-motion"



const Navbar = () => {
  const divprop3 = {
    initial: { y: -500 },
    animate: { y:0},
    transition: { duration: 0.4 },
  };

  const { t, i18n } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  var userLang = navigator.language || navigator.userLanguage;
  const [langMenu, setLangMenu] = useState(userLang);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (lang) => {
    if (lang === "Hindi") {
      setLangMenu("HI");
      i18n.changeLanguage("hi");
    } else if (lang === "English") {
      setLangMenu("EN");
      i18n.changeLanguage("en");
    } else if (lang === "Gujrati") {
      i18n.changeLanguage("guj");
    } else if (lang === "Tamil") {
      i18n.changeLanguage("ta");
    }
    toggleDropdown();
  };
  return (
    <Suspense fallback="loading">
      <motion.div className="flex flex-row justify-between items-center" {...divprop3}>
        <div className=" px-8 items-left">
          <div className="py-6">
            {/* <Link to="/">
              {" "}
              <img src={logo} alt="" />
            </Link> */}
          </div>
        </div>
        <div className="">
          <ul className="flex gap-x-8 text-white font-inter text-base font-normal">
            <Link className="relative">
              <li className="navbarli">{t("navbar1")}</li>
            </Link>
            <Link className="relative">
              <li className="navbarli">{t("navbar2")}</li>
            </Link>
            <Link className="relative" to="/login">
              <li className="navbarli">{t("navbar3")}</li>
            </Link>
          </ul>
        </div>
        {/* {t("")} */}
        <div className="text-white flex flex-col m-4 ">
          {/* <h1>{t("Language")}</h1> */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex items-center justify-center w-max rounded-md border border-gray-300 px-3 py-2 bg-gray-800 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              Lang
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <label className="block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      value="English"
                      onClick={() => changeLanguage("English")}
                      name="language"
                      className="mr-2"
                    />
                    English - English
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      value="Hindi"
                      onClick={() => changeLanguage("Hindi")}
                      name="language"
                      className="mr-2"
                    />
                    हिंदी - Hindi
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      value="Gujrati"
                      onClick={() => changeLanguage("Gujrati")}
                      name="language"
                      className="mr-2"
                    />
                    ગુજરાતી - Gujrati
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      value="Gujrati"
                      onClick={() => changeLanguage("Tamil")}
                      name="language"
                      className="mr-2"
                    />
                    தமிழ் - Tamil
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="radio"
                      value="Gujrati"
                      onClick={() => changeLanguage("Tamil")}
                      name="language"
                      className="mr-2"
                    />
                    తెలుగు - Telugu
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Navbar;

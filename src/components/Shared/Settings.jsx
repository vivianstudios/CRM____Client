import React from "react";
import { FaCog, FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { action } from "../../store/store";

const Settings = () => {
  const dispatch = useDispatch();
  const { setDarkTheme, setLightTheme } = action;
  return (
    <div className="dropdown dropdown-end ml-auto mt-auto mb-auto">
      <label tabIndex={1} className="m-0">
        {" "}
        <FaCog className="text-xl hover:text-gray-300 cursor-pointer" />{" "}
      </label>
      <ul
        tabIndex={1}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36  text-black"
      >
        <li className=" ">
          <button
            onClick={() => dispatch(setLightTheme())}
            className="w-full text-center"
          >
            {" "}
            Light <FaSun />{" "}
          </button>{" "}
        </li>
        <li className=" ">
          <button
            onClick={() => dispatch(setDarkTheme())}
            className="w-full text-center"
          >
            {" "}
            Dark <FaMoon />{" "}
          </button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Settings;

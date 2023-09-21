import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Lottie from "lottie-react";

import siteInfo from "../../../siteInfo";
import SignupAnimation from "../../assets/json/signup-animation.json";
import { setCurrentUser } from "../../store/reducers/usersReducers";
import { toast } from "react-toastify";

const Login = () => {
  const api = siteInfo.api + "/users/login";
  const [isLoading, setIsLoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {theme} = useSelector(state => state.app)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);

    const data = {
      email: e.target.email.value,
      pass: e.target.pass.value,
    };

    axios
      .post(api, data)
      .then((res) => {
        const user = res.data;
        dispatch(setCurrentUser(user));
        localStorage.setItem("crmUserId", JSON.stringify(res.data.id));
        navigate('/');
        setIsLoding(false);
      })
      .catch((error) => {
        setIsLoding(false);
        toast.error(error.response.data.message);
      });
  };


  const inputStyle = ()  => {
    if(theme == "DARK"){
      return {
        background: "#0a1929",
        border: "1px solid #93c5fd",
        color: "#f5f5f5",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
       }
    }else{
      return {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
  
  
      }
    }
    
  }

  return (
    <div style={{height: '100vh',display: 'flex'}} className="w-full">
      {/* Login form section start here  */}
      <div className={`${theme == "DARK" ? "dark" : "light"} block w-3/5 mx-auto my-auto rounded-lg text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`}>
        <div className={`${theme == "DARK" ? "dark" : "light"} loginHeader  border-b-2 text-start px-4 rounded-t-md py-3`}>
          Login
        </div>
        {/* Log in form body and animation section  */}
        <section className="flex ">
          {/* Animation  */}
          <div className="w-2/5  ">
            <Lottie animationData={SignupAnimation} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 items-start mt-7 flex flex-col rounded-b-md font-semibold"
          >
            <div className="flex gap-3">
              <h3 className="w-36 "> E-Mail Address </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="email"
                  name={"email"}
                  style={inputStyle()}
                  className={`${theme == "DARK" && "darkInput"} w-80 py-2 `}
                  placeholder=" Enter your email"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <h3 className="w-36 text-center"> Password</h3>
              <div>
                <input
                  type="password"
                  name={"pass"}
                  style={inputStyle()}
                  className={`${theme == "DARK" && "darkInput"} w-80 py-2 `}
                  placeholder=" Enter your password"
                  required
                />

                <div>
                  <div className="float-left mt-3">
                    {isLoading && <h1>loading...</h1>}
                    <input
                      value={isLoading ? "Loading..." : "Login"}
                      type="submit"
                      className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800"
                    />
                    {/* <Link to={"/"} className="text-blue-500">
                      {" "}
                      Forgot your password ?{" "}
                    </Link> */}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

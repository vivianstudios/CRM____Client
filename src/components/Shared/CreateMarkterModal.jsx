import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
// import { createUsers } from "../../store/reducers/usersReducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import { addUser } from "../../store/reducers/usersReducers";

const CreateMarkterModal = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.app)


  const alert = {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }

  const reset =(event) => {
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.pass.value = "";
  }

  const handleCreateMarkter = async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      // phone: event.target.phone.value,
      // designation: event.target.designation.value,
      pass: event.target.pass.value,
    };

    await axios
      .post(`${siteInfo.api}/users`, data)
      .then((res) => {
        toast.success("New Marketer Added", alert);
        dispatch(addUser(res.data));
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });


    event.target.name.value = "";
    event.target.email.value = "";
    event.target.pass.value = "";
  };

  const inputStyle = ()  => {
    if(theme == "DARK"){
      return {
        background: "#0a1929",
        border: "1px solid #93c5fd",
        color: "#f5f5f5",
       }
    }else{
      return {
      }
    }
  }
  
  return (
    <div className="">
      <input type="checkbox" id="marketers-modal" className="modal-toggle" />
      <div className={`modal`}>
        <div className={` modal-box ${theme == "DARK" ? "dark" : "light"}`}>
          <div className="float-right">
            <label
              htmlFor="marketers-modal"
              className="  cursor-pointer text-slate-700 text-3xl hover:text-red-500 rounded-md"
            >
              {" "}
              <FaRegTimesCircle />{" "}
            </label>
          </div>
          {/* Create Marketer form start here  */}
          <form
            onSubmit={handleCreateMarkter}
            onReset={reset}
            className=" w-full mx-auto px-4 py-6 mb-10  items-start  flex flex-col rounded-b-md font-semibold "
          >
            <h2 className="text-2xl font-smeibold mt-2 mb-4">
              {" "}
              Create New Marketer Account{" "}
            </h2>
            <div className="flex gap-3">
              <h3 className="w-36 "> Name </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name={"name"}
                  style={inputStyle()}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder=" Marketer name"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <h3 className="w-36 "> EMail </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="email"
                  name={"email"}
                  style={inputStyle()}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder="  Marketer email"
                  required
                />
              </div>
            </div>

            {/* <div className="flex gap-3">
              <h3 className="w-36 "> Company Name </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name={"company-name"}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder="  Company name / optional"
                />
              </div>
            </div> */}

            <div className="flex gap-3">
              <h3 className="w-36 "> Password </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="password"
                  name={"pass"}
                  style={inputStyle()}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder=" Create a strong password"
                />
              </div>
            </div>

            {/* <div className="flex gap-3">
              <h3 className="w-36 "> Confirm Password </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="password"
                  name={"confirm-password"}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder=" Confirm password "
                />
              </div>
            </div> */}

            <div className="flex  flex-row-reverse items-end  w-full   gap-2  ">
              <div>
                <input
                  value={"Submit"}
                  type="submit"
                  className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800 cursor-pointer"
                />
              </div>
              {/* <div className="modal-action"> */}
              <button type="reset" className=" bg-green-600 hover:bg-green-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md ">
                {" "}
                Reset{" "}
              </button>
              {/* </div> */}
            </div>
          </form>

          {/* Create Marketer form end here  */}
        </div>
      </div>
    </div>
  );
};

export default CreateMarkterModal;

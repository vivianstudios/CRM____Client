import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import { updateUser } from "../../store/reducers/usersReducers";
import ShowMsg from "./ShowMsg";

const EditMarkterModal = ({ id }) => {
  const dispatch = useDispatch();
  const [marketer, setMarketer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
  };

  useEffect(() => {
    setError(null)
    setLoading(true)
    axios
      .get(`${siteInfo.api}/users/${id}`)
      .then((res) => {
        setMarketer(res.data);
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      });
  }, [id]);

  const reset = (e) => {
    e.target.name.value = marketer.name;
    e.target.email.value = marketer.email;
    e.target.phone.value = marketer.phone;
  }

  const handleUpdateMarkter = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    await axios
      .patch(`${siteInfo.api}/users/${id}`, newUser)
      .then((res) => {
        toast.success("Marketer Account Edited", alert);
        setMarketer(res.data)
        dispatch(updateUser(res.data));
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });
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
      <input
        type="checkbox"
        id="edit-marketers-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div  className={` modal-box ${theme == "DARK" ? "dark" : "light"}`}>
          <div className="float-right">
            <label
              htmlFor="edit-marketers-modal"
              className="cursor-pointer text-slate-700 text-3xl hover:text-red-500 rounded-md"
            >
              {" "}
              <FaRegTimesCircle />{" "}
            </label>
          </div>
          {/* Create Marketer form start here  */}
          {loading && <ShowMsg>user loading</ShowMsg>}
          {error && <ShowMsg>{error.message}</ShowMsg>}
         {!loading && !error && <form
            onSubmit={handleUpdateMarkter}
            onReset={reset}
            className=" w-full mx-auto px-4 py-6 mb-10  items-start  flex flex-col rounded-b-md font-semibold "
          >
            <h2 className="text-2xl font-smeibold mt-2 mb-4">
              Edit Marketer Account
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
                  defaultValue={marketer.name}
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
                  defaultValue={marketer.email}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <h3 className="w-36 "> Phone </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  name={"phone"}
                  style={inputStyle()}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder="  Phone Number"
                  defaultValue={marketer.phone}
                />
              </div>
            </div>

            {/* <div className="flex gap-3">
              <h3 className="w-36 "> Password </h3>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="password"
                  name={"pass"}
                  className="w-72 py-2 border hover:bg-yellow-100 "
                  placeholder=" Create a strong password"
                />
              </div>
            </div> */}

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
                  value={"Update User"}
                  type="submit"
                  className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800 cursor-pointer"
                />
              </div>
              {/* <div className="modal-action"> */}
              <button type="reset" className=" bg-green-600 hover:bg-green-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md ">
                Reset
              </button>
              {/* </div> */}
            </div>
          </form>}

          {/* Create Marketer form end here  */}
        </div>
      </div>
    </div>
  );
};

export default EditMarkterModal;

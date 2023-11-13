import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import { updateUser } from "../../store/reducers/usersReducers";
import ShowMsg from "./ShowMsg";

const SetTargetModal = ({ id }) => {
  const dispatch = useDispatch();
  const [marketer, setmarketer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useSelector((state) => state.app);

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
    setError(null);
    setLoading(true);
    axios
      .get(`${siteInfo.api}/users/${id}`)
      .then((res) => {
        setmarketer(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const reset = (e) => {
    e.target.qNewCall.value = marketer.quarterlyTarget.newCall;
    e.target.qHighLead.value = marketer.quarterlyTarget.highLead;
    e.target.qNewTest.value = marketer.quarterlyTarget.newTest;
    e.target.mNewCall.value = marketer.monthlyTarget.newCall;
    e.target.mHighLead.value = marketer.monthlyTarget.highLead;
    e.target.mNewTest.value = marketer.monthlyTarget.newTest;
    e.target.dailyTarget.value = marketer.dailyCallTarget;
  };

  const handleSetTarget = async (e) => {
    e.preventDefault();
    const data = {
      quarterlyTarget: {
        newCall: e.target.qNewCall.value,
        highLead: e.target.qHighLead.value,
        newTest: e.target.qNewTest.value,
      },
      monthlyTarget: {
        newCall: e.target.mNewCall.value,
        highLead: e.target.mHighLead.value,
        newTest: e.target.mNewTest.value,
      },
      dailyCallTarget: e.target.dailyTarget.value,
    };

    await axios
      .patch(`${siteInfo.api}/users/setTarget/${id}`, data)
      .then((res) => {
        toast.success("Success", alert);
        setmarketer(res.data);
        dispatch(updateUser(res.data));
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });
  };

  const inputStyle = () => {
    if (theme == "DARK") {
      return {
        background: "#0a1929",
        border: "1px solid #93c5fd",
        color: "#f5f5f5",
      };
    } else {
      return {};
    }
  };

  const modalBoxStyle = {
    width: "80%", 
  };

  return (
    <div className="">
      <input
        type="checkbox"
        id="set-marketers-target"
        className="modal-toggle"
      />
      <div className="modal ">
        <div style={modalBoxStyle} className={` modal-box  w-full max-w-4xl ${theme == "DARK" ? "dark" : "light"}`}>
          <div className="flex justify-between items-center">
          <h2 className="text-2xl font-smeibold mt-2 mb-4">Add Target</h2>
          <div className="">
            <label
              htmlFor="set-marketers-target"
              className="cursor-pointer text-slate-700 text-3xl hover:text-red-500 rounded-md"
            >
              {" "}
              <FaRegTimesCircle />{" "}
            </label>
          </div>
          </div>
          {/* Create marketer form start here  */}
          {loading && <ShowMsg>usar loading</ShowMsg>}
          {error && <ShowMsg>{error.message}</ShowMsg>}
          {!loading && !error && (
            <form
              onSubmit={handleSetTarget}
              onReset={reset}
              className="w-full mx-auto px-4 py-6 mb-10  items-start  flex flex-col rounded-b-md font-semibold"
            >
              
              <div className="w-full">
                <h4 className="border-b-2 border-indigo-200 pb-3">Quarterly Target</h4>
                <div className="flex justify-between mt-4">
                  <div className="me-4">
                    <label>New Call: </label>
                    <input
                      type="number"
                      name={"qNewCall"}
                      style={inputStyle()}
                      className="p-2 w-28 ms-3 bg-slate-200	 outline-none"
                      defaultValue={marketer?.quarterlyTarget?.newCall}
                    />
                  </div>
                  <div className="me-4">
                    <label>High Lead: </label>
                    <input
                      type="number"
                      name={"qHighLead"}
                      style={inputStyle()}
                      className="p-2 w-28 ms-3 bg-slate-200	 outline-none"
                      defaultValue={marketer?.quarterlyTarget?.highLead}
                    />
                  </div>
                  <div className="me-4">
                    <label>New Test: </label>
                    <input
                      type="number"
                      name={"qNewTest"}
                      style={inputStyle()}
                      className="p-2 ms-3 w-28 bg-slate-200	 outline-none"
                      defaultValue={marketer?.quarterlyTarget?.newTest}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full my-16">
                <h4 className="border-b-2 border-indigo-200 pb-3">Monthly Target</h4>
                <div className="flex justify-between mt-4">
                  <div className="me-4">
                    <label>New Call: </label>
                    <input
                      type="number"
                      name={"mNewCall"}
                      style={inputStyle()}
                      className="p-2 w-28 ms-3 bg-slate-200	 outline-none"
                      defaultValue={marketer?.monthlyTarget?.newCall}
                    />
                  </div>
                  <div className="me-4">
                    <label>High Lead: </label>
                    <input
                      type="number"
                      name={"mHighLead"}
                      style={inputStyle()}
                      className="p-2 w-28 ms-3 bg-slate-200	 outline-none"
                      defaultValue={marketer?.monthlyTarget?.highLead}
                    />
                  </div>
                  <div className="me-4">
                    <label>New Test: </label>
                    <input
                      type="number"
                      name={"mNewTest"}
                      style={inputStyle()}
                      className="p-2 ms-3 w-28 bg-slate-200	 outline-none"
                      defaultValue={marketer?.monthlyTarget?.newTest}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h4 className="border-b-2 border-indigo-200 pb-3">Daily Target</h4>
                <div className="flex mt-4">
                  <div className="me-4">
                    <label>Call Target: </label>
                    <input
                      type="number"
                      name={"dailyTarget"}
                      style={inputStyle()}
                      className="p-2 w-28 ms-3 bg-slate-200	 outline-none"
                      defaultValue={marketer?.dailyCallTarget}
                    />
                  </div>
                  
                </div>
              </div>

              <div className="flex mt-4 flex-row-reverse items-end  w-full   gap-2  ">
                <div>
                  <input
                    value={"Set Target"}
                    type="submit"
                    className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800 cursor-pointer"
                  />
                </div>
                {/* <div className="modal-action"> */}
                <button
                  type="reset"
                  className=" bg-green-600 hover:bg-green-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
                >
                  Reset
                </button>
                {/* </div> */}
              </div>
            </form>
          )}

          {/* Create marketer form end here  */}
        </div>
      </div>
    </div>
  );
};

export default SetTargetModal;

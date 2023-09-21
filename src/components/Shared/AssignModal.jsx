import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import ShowMsg from "./ShowMsg";
import { setLead, updateLead } from "../../store/reducers/leadsReducers";
import { useLocation, useNavigate } from "react-router";

const AssignModal = ({ id, setAssignItem }) => {
  const { showLeads, leadsError, pending } = useSelector(
    (state) => state.leads
  );
  const { theme } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setError(null);
    setLoading(true);
    axios
      .get(`${siteInfo.api}/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const user = users.find((user) => user.id == e.target.userName.value);

    await axios
      .patch(`${siteInfo.api}/leads/assignTo/${id}`, user)
      .then((res) => {
        toast.success("Successfully Assigned", alert);
        if (pathname == "freshLeads") {
          const newArray = showLeads.filter((lead) => lead != res.data);
          dispatch(setLead(newArray));
        } else {
          dispatch(updateLead(res.data));
        }
        setAssignItem(null);
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
        setAssignItem(null);
      });

    setUpdating(false);
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
      <input type="checkbox" id="assign-lead-modal" className="modal-toggle" />
      <div className={`modal`}>
        <div className={`modal-box ${theme == "DARK" ? "dark" : "light"}`}>
          {/* <div className="bg-neutral-100 w-4/6 max-w-3xl h-[75vh] overflow-y-scroll"> */}
          <div className="flex justify-between items-center	">
            <h2 className="text-2xl capitalize font-smeibold mt-2 mb-4">
              Assign This Lead To An User
            </h2>
            <label
              htmlFor="assign-lead-modal"
              className="cursor-pointer text-slate-700 text-3xl hover:text-red-500 rounded-md"
            >
              {" "}
              <FaRegTimesCircle />{" "}
            </label>
          </div>
          {loading && <ShowMsg>Lead loading...</ShowMsg>}
          {error && <ShowMsg>{error.message}</ShowMsg>}
          {!loading && !error && (
            <form
              onSubmit={handleAssign}
              className=" w-full mx-auto px-4 py-6 mb-10  items-start  flex flex-col rounded-b-md font-semibold "
            >
              {/* ================================================== */}

              <div className="mb-3 flex flex-col">
                <select
                  name="userName"
                  style={inputStyle()}
                  className=" select-bordered  border border-gray-300  w-72 ml-0 mr-2 h-10 rounded-md"
                >
                  <option></option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}> {user.name} </option>
                  ))}
                </select>
              </div>

              {/* ============================================ */}

              <div>
                <input
                  value={updating ? "Updating..." : "Update"}
                  disabled={updating}
                  type="submit"
                  className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800 cursor-pointer"
                />
              </div>
            </form>
          )}

          {/* Create Marketer form end here  */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AssignModal;

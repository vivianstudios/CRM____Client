import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/reducers/usersReducers";
import { useNavigate } from "react-router-dom";

const LogOutModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {theme} = useSelector(state => state.app)


  const handleLogOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("crmUserId");
    navigate('/login');
  };


  return (
    <div>
      <div className="px-2 py-4">
        <input type="checkbox" id="logout_modal" className="modal-toggle" />
        <div className="modal">
          <div className={`${theme == "DARK" ? "dark" : "light"} modal-box`}>
            <h3 className="font-bold text-lg">
              {" "}
              Are you sure you want to logout ?
            </h3>
            <p className="py-4"> </p>
            <div className="modal-action">
              <label
                htmlFor="logout_modal"
                className="btn btn-sm border-none bg-blue-500"
              >
                {" "}
                Cancel{" "}
              </label>
              <button onClick={handleLogOut} className=" btn bg-red-500 hover:bg-red-600 btn-sm border-none">
                {" "}
                Confirm <FaSignOutAlt className="ml-2" />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;

import axios from "axios";
import React from "react";
import siteInfo from "../../../siteInfo";
import { useDispatch, useSelector } from "react-redux";
import { setLead } from "../../store/reducers/leadsReducers";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

const AddToTrashModal = ({ item, handleTrashModal }) => {
  const { showLeads, leadsError, pending } = useSelector(
    (state) => state.leads
  );
  const { theme } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleDelete = () => {
    axios
      .delete(`${siteInfo.api}/leads/${item.id}`)
      .then((res) => {
        if (res.status == 200) {
          const newArray = showLeads.filter((lead) => lead != item);
          dispatch(setLead(newArray));
          toast.success("Lead Deleted", alert);
        }
      })
      .catch((error) => {
        toast.error("Something Is Wrong, Try Again Letter", alert);
      });
    handleTrashModal();
  };
  const addToTrash = () => {
    axios
      .patch(`${siteInfo.api}/leads/addToTrash/${item.id}`)
      .then((res) => {
        if (res.status == 200) {
          const newArray = showLeads.filter((lead) => lead != item);
          dispatch(setLead(newArray));
          toast.success("Lead Added To Trash", alert);
        }
      })
      .catch((error) => {
        toast.error("Something Is Wrong, Try Again Letter", alert);
      });
    handleTrashModal();
  };

  return (
    <div className="">
      <input type="checkbox" id="addToTrashModal" className="modal-toggle" />
      <div className="modal">
        {pathname != "/trashLeads" && (
          <div className={`modal-box ${theme == "DARK" ? "dark" : "light"}`}>
            <h2 className="text-3xl font-bold mt-2 mb-4">
              This Lead Will Add To Trash
            </h2>

            <div className="modal-action">
              <button
                onClick={handleTrashModal}
                className=" bg-yellow-600 hover:bg-yellow-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
              >
                Cancel
              </button>
              <button
                onClick={addToTrash}
                className=" bg-red-600 hover:bg-red-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        {pathname == "/trashLeads" && (
          <div className={`modal-box ${theme == "DARK" ? "dark" : "light"}`}>
            <h2 className="text-3xl font-bold mt-2 mb-4">
              This Lead Will Permanently Delete
            </h2>

            <div className="modal-action">
              <button
                onClick={handleTrashModal}
                className=" bg-yellow-600 hover:bg-yellow-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className=" bg-red-600 hover:bg-red-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToTrashModal;

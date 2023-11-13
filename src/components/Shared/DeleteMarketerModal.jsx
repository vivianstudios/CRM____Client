import axios from "axios";
import React from "react";
import siteInfo from "../../../siteInfo";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../store/reducers/usersReducers";

const DeleteMarketerModal = ({ data, handleDltModal }) => {
  const { users } = useSelector((state) => state.users);
  const { theme } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await axios
      .delete(`${siteInfo.api}/users/${data.id}`)
      .then((res) => {
        if (res.status == 200) {
          const newArray = users.filter((user) => user != data);
          dispatch(setUser(newArray));
          toast.success("User Deleted");
        }
      })
      .catch((error) => {
        toast.error("Something Is Wrong, Try Again Letter");
      });
    handleDltModal();
  };

  //   axios
  //     .patch(`${siteInfo.api}/leads/addToTrash/${item.id}`)
  //     .then((res) => {
  //       if (res.status == 200) {
  //         const newArray = showLeads.filter((lead) => lead != item);
  //         dispatch(setLead(newArray));
  //         toast.success("Lead Added To Trash", alert);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Something Is Wrong, Try Again Letter", alert);
  //     });
  //     handleTrashModal();
  // };

  return (
    <div className="">
      <input
        type="checkbox"
        id="delete-marketer-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className={` modal-box ${theme == "DARK" ? "dark" : "light"}`}>
          <h2 className="text-3xl font-bold mt-2 mb-4">
            This User Will Permanently Delete
          </h2>

          <div className="modal-action">
            <button
              onClick={handleDltModal}
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
      </div>
    </div>
  );
};

export default DeleteMarketerModal;

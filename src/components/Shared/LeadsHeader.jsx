import React from "react";
import SearchLeads from "./SearchLeads";
import EditLeadModal from "./EditLeadModal";
import AddToTrashModal from "./AddToTrashModal";
import CreateNewLeadModal from "./CreateNewLeadModal";
import { useSelector } from "react-redux";
import ImportModal from "./ImportModal";
import AssignModal from "./AssignModal";
import FollowUpModal from "./FollowUpModal";

const LeadsHeader = ({
  assignItem,
  setAssignItem,
  editItem,
  setEditItem,
  dltItem,
  setDltItem,
  handleTrashModal,
  path,
  followUp,
  setFollowUp
}) => {
  const state = useSelector((state) => state.app);
  const {currentUser} = useSelector((state) => state.users);

  return (
    <div
      className={`${
        state.theme == "DARK" ? "dark" : "light"
      } flex justify-between items-center py-3  `}
    >
      <SearchLeads path={path}></SearchLeads>

      <div className="flex gap-2">
        {currentUser?.role == "ADMIN" && <label
          htmlFor="import_modal"
          className=" bg-indigo-500 hover:bg-indigo-600  font-semibold  text-neutral-100  py-2 px-3 rounded-sm"
        >
          Imports
        </label>}
        <label
          htmlFor="create_newlead_modal"
          className=" bg-indigo-500 hover:bg-indigo-600  font-semibold  text-neutral-100  py-2 px-3 rounded-sm"
        >
          Create New Lead
        </label>

        {followUp && (
          <FollowUpModal id={followUp} setFollowUp={setFollowUp} onClose={() => setFollowUp(null)}>
            {" "}
          </FollowUpModal>
        )}
        {assignItem && (
          <AssignModal id={assignItem} setAssignItem={setAssignItem} onClose={() => setAssignItem(null)}>
            {" "}
          </AssignModal>
        )}
        {editItem && (
          <EditLeadModal id={editItem} onClose={() => setEditItem(null)}>
            {" "}
          </EditLeadModal>
        )}
        {dltItem && (
          <AddToTrashModal
            item={dltItem}
            handleTrashModal={handleTrashModal}
            onClose={() => setDltItem(null)}
          >
            {" "}
          </AddToTrashModal>
        )}
        <ImportModal />
        <CreateNewLeadModal> </CreateNewLeadModal>
      </div>
    </div>
  );
};

export default LeadsHeader;

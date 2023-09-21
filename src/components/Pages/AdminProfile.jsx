import React from "react";
import LogOutModal from "../Shared/LogOutModal";
import Layout from "../Layout/Layout";

const AdminProfile = () => {
  return (
    <Layout>
      <div className="w-full h-screen mx-auto">
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="logout_modal"
            className="bg-red-500 hover:bg-red-600 rounded-md text-neutral-50 px-4 py-2 ml-4 "
          >
            Log out
          </label>
          <LogOutModal> </LogOutModal>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;

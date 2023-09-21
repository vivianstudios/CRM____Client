import axios from "axios";
import React, { useState } from "react";
import siteInfo from "../../../siteInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/reducers/leadsReducers";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

const ImportModal = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { theme, pageModel } = useSelector((state) => state.app);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const api = `/leads${pathname}`;
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post(`${siteInfo.api}/leads/import`, formData)
      .then((res) => {
        dispatch(fetchData({ path: api, pageModel: pageModel }));
      })
      .catch((error) => {
        toast.error("An Error Occured");
      });
    setIsUploading(false);
    setSelectedFile(null);
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

  return (
    <div>
      <input type="checkbox" id="import_modal" className="modal-toggle" />
      <div className="modal">
        <div className={`${theme == "DARK" ? "dark" : "light"} modal-box`}>
          <h1 className="text-2xl mb-2">
            {" "}
            Drag and drop or browse for upload file{" "}
          </h1>
          <form onSubmit={handleSubmit} action="">
            <label className="flex justify-center w-full h-32 px-4 transition  border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {selectedFile ? (
                  <h5>{selectedFile.name}</h5>
                ) : (
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                )}
              </span>
              <input
                onChange={handleFileChange}
                type="file"
                style={inputStyle()}
                name="file_upload"
                className="hidden"
              />
            </label>

            <div className="modal-action">
              <label
                htmlFor="import_modal"
                className="bg-rose-500 text-neutral-50 hover:bg-rose-700 py-1 px-5 rounded-sm cursor-pointer  "
              >
                Close!
              </label>
              <button
                className="bg-blue-500 hover:bg-blue-700 px-5 py-1 text-neutral-50 rounded-sm"
                type="submit"
              >
                {" "}
                {isUploading ? "Uploading..." : "Upload"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;

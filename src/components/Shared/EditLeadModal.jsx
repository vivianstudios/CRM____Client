import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import ShowMsg from "./ShowMsg";
import { updateLead } from "../../store/reducers/leadsReducers";
import categories from "../../assets/category";
import countries from "../../assets/country";

const EditLeadModal = ({ id }) => {
  const dispatch = useDispatch();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
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
      .get(`${siteInfo.api}/leads/${id}`)
      .then((res) => {
        setLead(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const reset = (e) => {
    e.target.email.value = lead.email;
    e.target.phone.value = lead.phone;
    e.target.designation.value = lead.designation;
    e.target.description.value = lead.description;
    e.target.contactParson.value = lead.contactParson;
    e.target.category.value = lead.category;
    e.target.country.value = lead.country;
    e.target.website.value = lead.website;
    e.target.company.value = lead.company;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const newLead = {
      email: e.target.email.value,
      phone: e.target.phone.value,
      designation: e.target.designation.value,
      description: e.target.description.value,
      contactParson: e.target.contactParson.value,
      category: e.target.category.value,
      country: e.target.country.value,
      website: e.target.website.value,
      company: e.target.company.value,
    };

    await axios
      .patch(`${siteInfo.api}/leads/${id}`, newLead)
      .then((res) => {
        toast.success("Lead Edited", alert);
        setLead(res.data);
        dispatch(updateLead(res.data));
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });

    reset(e);
    setUpdating(false);
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
    <div className="">
      <input type="checkbox" id="edit-lead-modal" className="modal-toggle" />
      <div className="modal">
        <div
          className={` ${
            theme == "DARK" ? "dark" : "light"
          } modal-box w-4/6 max-w-2xl h-[77vh] overflow-y-scroll"`}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-smeibold mt-2 ">
              Edit Lead Information
            </h2>
            <label
              htmlFor="edit-lead-modal"
              className="cursor-pointer text-slate-700 text-3xl hover:text-red-500 rounded-md"
            >
              {" "}
              <FaRegTimesCircle />{" "}
            </label>
          </div>
          {/* Create Marketer form start here  */}
          {loading && <ShowMsg>Lead loading...</ShowMsg>}
          {error && <ShowMsg>{error.message}</ShowMsg>}
          {!loading && !error && (
            <form
              onSubmit={handleUpdate}
              onReset={reset}
              className=" w-full mx-auto px-4  items-start  flex flex-col rounded-b-md font-semibold "
            >
              {/* ================================================== */}
              <section className="  ">
                <div className=" flex  justify-between">
                  {/* Left side of form  */}
                  <div>
                    <div className="mb-3">
                      <label htmlFor="name" className="text-lg font-medium ">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        style={inputStyle()}
                        defaultValue={lead?.company}
                        className="mt-1 block w-72 h-10 border border-gray-300 rounded-md mr-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-lg font-medium ">Website</label>
                      <input
                        type="url"
                        name="website"
                        style={inputStyle()}
                        defaultValue={lead?.website}
                        className="mt-1 block w-72 h-10 border border-gray-300 rounded-md mr-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-3 flex flex-col">
                      <label className="text-lg font-medium ">Country</label>
                      <select
                        name="country"
                        style={inputStyle()}
                        defaultValue={lead?.country}
                        className=" select-bordered  border border-gray-300  w-72 ml-0 mr-2 h-10 rounded-md"
                      >
                        <option></option>
                        {countries.map((country) => {
                          return (
                            <option className="capitalize" key={country}>
                              {" "}
                              {country}{" "}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3 flex flex-col">
                      <label htmlFor="email" className="text-lg font-medium ">
                        Category
                      </label>
                      <select
                        name="category"
                        style={inputStyle()}
                        defaultValue={lead?.category}
                        className=" select-bordered  border border-gray-300  w-72 ml-0 mr-2 h-10 rounded-md"
                      >
                        <option></option>
                        {categories.map((category) => {
                          return (
                            <option className="capitalize" key={category}>
                              {" "}
                              {category}{" "}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* Left side of form end  */}
                  </div>

                  {/* Right side of form start  */}
                  <div>
                    <div className="mb-3">
                      <label className="text-lg font-medium ">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        style={inputStyle()}
                        defaultValue={lead?.contactParson}
                        name="contactParson"
                        className="mt-1 block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="text-lg font-medium ">
                        Designation
                      </label>
                      <input
                        type="text"
                        style={inputStyle()}
                        defaultValue={lead?.designation}
                        name="designation"
                        className="mt-1 block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="text-lg font-medium ">Phone</label>
                      <input
                        type="number"
                        style={inputStyle()}
                        defaultValue={lead?.phone}
                        name="phone"
                        className=" block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="text-lg font-medium ">
                        Email
                      </label>
                      <input
                        type="email"
                        style={inputStyle()}
                        defaultValue={lead?.email}
                        name="email"
                        className=" block w-72 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* Right side of form end   */}
                 
                </div>

                <div className="w-full mx-auto">
                    <label className="text-lg font-medium  ">
                      {" "}
                      Description{" "}
                    </label>
                    <textarea
                      placeholder=" "
                      defaultValue={lead?.description}
                      style={inputStyle()}
                      name="description"
                      className="textarea textarea-bordered textarea-lg w-full mt-2  "
                    ></textarea>
                  </div>

                {/* Text area for  description   */}
              </section>

              {/* ============================================ */}

              <div className="flex  flex-row-reverse items-end  w-full   gap-2  ">
                <div>
                  <input
                    value={updating ? "Updating..." : "Update"}
                    disabled={updating}
                    type="submit"
                    className="  bg-sky-600 border-none text-neutral-100 px-4 py-2 rounded-md hover:bg-sky-800 cursor-pointer"
                  />
                </div>
                {/* <div className="modal-action"> */}
                <button
                  type="reset"
                  disabled={updating}
                  className=" bg-green-600 hover:bg-green-700 cursor-pointer  text-neutral-100 px-4  py-2 rounded-md "
                >
                  Reset
                </button>
                {/* </div> */}
              </div>
            </form>
          )}

          {/* Create Marketer form end here  */}
        </div>
      </div>
    </div>
  );
};

export default EditLeadModal;

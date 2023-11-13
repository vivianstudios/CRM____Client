import axios from "axios";
import React, { useEffect, useState } from "react";
import siteInfo from "../../../siteInfo";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setTotalCount } from "../../store/reducers/leadsReducers";
import { toast } from "react-toastify";
import categories from "../../assets/category";
import countries from "../../assets/country";
import { action } from "../../store/store";

const FilterLeadsModal = ({setFilterModal}) => {
  const dispatch = useDispatch()
  const {theme, pageModel} = useSelector(state => state.app)

  const { setPageModel, setIsFilter,setFilterParams } = action;

  const handleFilter = async (e) => {
    e.preventDefault();

    const params = {
      country: e.target.country.value,
      status: e.target.status.value,
      category: e.target.category.value,
      possibility: e.target.possibility.value,
      minor: e.target.minor.value,
    };
    try {
      dispatch(setPageModel({page: 0, pageSize: pageModel.pageSize}));
      dispatch(setIsFilter(true));
      dispatch(setFilterParams(params));
      
      const res = await axios.get(`${siteInfo.api}/leads/filterAllLeads`, {params: {pageModel: pageModel, params: params}});
      dispatch(setTotalCount(res.data.totalCount));
      // dispatch(setTotalCount(res.data.totalCount));
      dispatch(setLead(res.data.data));
      setFilterModal(null)
    } catch (error) {
      toast.error(error.message);
    }
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
    <div>
      <div className="px-2 py-4">
        {/* The button to open modal */}
        <input
          type="checkbox"
          id="filter_leads_modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className={` w-[700px]  ${theme == "DARK" ? "dark" : "light"}`}>
            <form
              onSubmit={handleFilter}
              className="full py-10 px-4 rounded-md gap-y-2  font-semibold"
            >
              <h1 className="text-2xl py-4 "> Filter Leads </h1>
              <section className="flex justify-between">
                {/* Filter Form Leftside   */}
                <div className=" ">
                  <div className="flex justify-between">
                    <label> Minor: </label>
                    <input
                    style={inputStyle()}
                      name="minor"
                      placeholder=""
                      className="  border border-slate-400  w-56 ml-1 h-10 rounded-sm"
                    />
                  </div>

                  <div className="mt-6 flex justify-between">
                    <label> Possibility :</label>
                    <select style={inputStyle()}
                      name="possibility"
                      className=" select-bordered  border border-slate-400  w-56 ml-1 h-10 rounded-sm"
                    >
                      <option>
                      
                      </option>
                      <option> High </option>
                      <option> Medium </option>
                      <option> Low </option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-between items-start">
                    <label> Category :</label>
                    <select style={inputStyle()}
                      name="category"
                      className=" select-bordered  border border-slate-400  w-56 ml-1 h-10 rounded-sm"
                    >
                      <option defaultValue={" "} >
                      </option>
                      {categories.map(category=>{
                        return <option className="capitalize" key={category}> {category} </option>
                      })}
                    </select>
                  </div>
                </div>

                {/* Filter form right side  */}
                <div className="">
                  <div className="flex justify-between">
                    <label> Status :</label>
                    <select style={inputStyle()}
                      name="status"
                      className=" select-bordered w-56 border border-slate-400  ml-1 h-10 rounded-sm"
                    >
                      <option>
                        {" "}
                      </option>
                      <option> Gatekeeper</option>
                      <option> Contacted </option>
                      <option> New Test </option>
                      <option> Closed </option>
                      <option> Email Sent </option>
                      <option> Not Available </option>
                      <option> Voice Mail </option>
                      <option> Others </option>
                    </select>
                  </div>

                  <div className=" flex justify-between mt-6">
                    <label> Country :</label>
                    <select style={inputStyle()}
                      name="country"
                      className=" select-bordered  border border-slate-400  w-56 ml-1 h-10 rounded-sm"
                    >
                      <option>
                      </option>
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
                </div>
              </section>

              <div className="modal-action  ">
                <label
                  htmlFor="filter_leads_modal"
                  className=" border px-5 py-1 hover:bg-red-500 hover:text-white border-red-400 text-red-600  cursor-pointer  "
                >
                  {" "}
                  Close{" "}
                </label>
                <button
                  type="submit"
                  className=" border border-blue-400 p-1 text-blue-500 hover:bg-blue-400 hover:text-white hover:border-white"
                >
                  {" "}
                  Apply Filter{" "}
                </button>
              </div>
            </form>
            {/* Search Filter section start here  */}

            {/* Search Filter section end here  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLeadsModal;

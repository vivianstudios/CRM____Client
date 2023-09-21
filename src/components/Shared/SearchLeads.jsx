import axios from "axios";
import React, { useState } from "react";
import siteInfo from "../../../siteInfo";
import { fetchData, setLead, setTotalCount } from "../../store/reducers/leadsReducers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import FilterLeadsModal from "./FilterLeadsModal";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation } from "react-router";
import { action } from "../../store/store";

const SearchLeads = ({ path }) => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const [filterModal,setFilterModal] = useState(null)
  const { theme, pageModel} = useSelector((state) => state.app);

  const { setPageModel, setIsSearch,setSearchValue,setSearchPath  } = action;
  const handleSearch = async (e) => {
    const value = e.target.value;
    try {
      
      if (value) {
        dispatch(setPageModel({page: 0, pageSize: pageModel.pageSize}));
        dispatch(setIsSearch(true));
        dispatch(setSearchValue(value));
        dispatch(setSearchPath(path));
        const res = await axios.get(`${siteInfo.api + path + "/" + value}`, {params: {pageModel}});
        dispatch(setTotalCount(res.data.totalCount))
        dispatch(setLead(res.data.data));
      } else {
        dispatch(fetchData({ path: path, pageModel: pageModel }));
        dispatch(setIsSearch(false));

      }
    } catch (error) {
      toast.error("An error occurred while fetching search results");
    }
  };

 const inputStyle = ()  => {
  if(theme == "DARK"){
    return {
      background: "#0a1929",
      border: "1px solid #93c5fd",
      color: "#f5f5f5",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
     }
  }else{
    return {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,


    }
  }
  
}

  return (
    <div className="flex">
      <input
      style={inputStyle()}
        type="search"
        onChange={handleSearch}
        placeholder=" Search Leads "
        className="input input-bordered rounded  w-96 h-10"
      />
     {pathname == '/allLeads' && <button
        type="submit"
        className="px-2 py-0  h-10 border border-blue-300 hover:bg-blue-300 hover:text-white text-blue-500 cursor-pointer  rounded-tr-md rounded-br-md "
      >
        <label
          htmlFor="filter_leads_modal"
          onClick={() => setFilterModal(true)}
        >
          <FilterListIcon />
        </label>
      </button>}
      {filterModal && (
          <FilterLeadsModal  setFilterModal={setFilterModal} onClose={() => setFilterModal(null)} />
        )}
    </div>
  );
};

export default SearchLeads;

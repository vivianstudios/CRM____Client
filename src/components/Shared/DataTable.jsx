import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import moment from "moment";
import { setLead } from "../../store/reducers/leadsReducers";
import { action } from "../../store/store";
import siteInfo from "../../../siteInfo";
import axios from "axios";

const DataTable = ({ api, columns }) => {
  const {theme, pageModel, isFilter,filterParams, isSearch,searchPath,searchValue} = useSelector((state) => state.app);
  const { pathname } = useLocation();
  const { showLeads, totalCount, pending } = useSelector(
    (state) => state.leads
  );
  const [isPending,setIsPending] = useState(false)
  const { setPageModel } = action;
  const dispatch = useDispatch();

  const handlePageSizeChange = async (pageModel) => {
    setIsPending(true)
    dispatch(setPageModel(pageModel));
   if(isFilter) {
    const res = await axios.get(`${siteInfo.api}/leads/filterAllLeads`, {params: {pageModel: pageModel, params: filterParams}});
    dispatch(setLead(res.data.data));
    }else if(isSearch){
      const res = await axios.get(`${siteInfo.api + searchPath + "/" + searchValue}`, {params: {pageModel}});
      dispatch(setLead(res.data.data));
    }else{
      const res = await axios.get(`${siteInfo.api + api}`, {
        params: { pageModel },
      });
      dispatch(setLead(res.data.data));
      setIsPending(false)
    }
    setIsPending(false)
  };

  const getRowClassName = (params) => {
    if (pathname.includes("followUp")) {
      const currentDate = moment().startOf("day");
      const nextFollowUpDate = moment(params.row.nextFollowUP).startOf("day");
      if (nextFollowUpDate.isBefore(currentDate)) {
        return "Error";
      }
      if (nextFollowUpDate.isSame(currentDate)) {
        return "Warning";
      } else {
        if (theme == "DARK") {
          if (params.indexRelativeToCurrentPage % 2 == 0) {
            return "darkLight";
          } else {
            return "dark";
          }
        } else {
          if (params.indexRelativeToCurrentPage % 2 == 0) {
            return "light";
          } else {
            return "lightSec";
          }
        }
      }
    } else {
      if (theme == "DARK") {
        if (params.indexRelativeToCurrentPage % 2 == 0) {
          return "darkLight";
        } else {
          return "dark";
        }
      } else {
        if (params.indexRelativeToCurrentPage % 2 == 0) {
          return "light";
        } else {
          return "lightSec";
        }
      }
    }
  };

  return (
    <div className="table-content" style={{ height: "80vh" }}>
      <DataGrid
        columns={columns}
        rows={showLeads}
        paginationModel={pageModel}
        onPaginationModelChange={handlePageSizeChange}
        pageSizeOptions={[25, 50, 100]}
        getRowClassName={getRowClassName}
        rowCount={totalCount}
        loading={isPending}
        paginationMode="server"
        autoPageSize={false}
        disableRowSelectionOnClick
        sx={{
          maxWidth: "max-content",
          margin: "auto",
          border: "none",
          boxShadow: 8,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#777",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default DataTable;

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import moment from "moment";

const UserDataTable = ({ columns, data }) => {
  const state = useSelector((state) => state.app);
  const { pathname } = useLocation();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const [scrollToRowIndex, setScrollToRowIndex] = React.useState(0);

  const handleScrollToRow = (params) => {
    setScrollToRowIndex(params.rowIndex || 0);
  };

  useEffect(() => {
    const storedPageSize = JSON.parse(localStorage.getItem("pageSize"));
    if (storedPageSize?.pageSize) {
      setPaginationModel({
        pageSize: Number(storedPageSize.pageSize),
        page: Number(storedPageSize.page),
      });
    }
  }, [pathname]);

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel(newPageSize);
    localStorage.setItem(
      "pageSize",
      JSON.stringify({
        pageSize: newPageSize.pageSize,
        page: newPageSize.page,
      })
    );
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
        if (state.theme == "DARK") {
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
      if (state.theme == "DARK") {
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
    <div className="table-content" style={{height: "70vh",  }}>
      <DataGrid
        columns={columns}
        rows={data}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePageSizeChange}
        pageSizeOptions={[25, 50, 100]}
        getRowClassName={getRowClassName}
        onCellClick={handleScrollToRow}
        scrollToRowIndex={scrollToRowIndex}
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

export default UserDataTable;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchData,
  setLead,
  updateLead,
} from "../../store/reducers/leadsReducers";
import DataTable from "../Shared/DataTable";
import ShowMsg from "../Shared/ShowMsg";
import LeadsHeader from "../Shared/LeadsHeader";
import Layout from "../Layout/Layout";
import { useLocation } from "react-router";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ReplyIcon from "@mui/icons-material/Reply";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { action } from "../../store/store";

const Leads = () => {
  const { showLeads, leadsError, pending } = useSelector(
    (state) => state.leads
  );
  const { currentUser } = useSelector((state) => state.users);
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const api = `/leads${pathname}`;
  const [dltItem, setDltItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [assignItem, setAssignItem] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [users, setUsers] = useState([]);
  const { setPageModel } = action;

  useEffect(() => {
    dispatch(setPageModel({ page: 0, pageSize: state.pageModel.pageSize }));
    dispatch(
      fetchData({
        path: api,
        pageModel: { page: 0, pageSize: state.pageModel.pageSize },
      })
    );

    axios
      .get(`${siteInfo.api}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        toast.error(error.massage);
      });
  }, [pathname]);

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

  const handleAssign = async (e, id) => {
    const user = users.find((user) => user.id == e.target.value);

    await axios
      .patch(`${siteInfo.api}/leads/assignTo/${id}`, user)
      .then((res) => {
        toast.success("Successfully Assigned ", alert);
        if (pathname == "freshLeads") {
          const newArray = showLeads.filter((lead) => lead != res.data);
          dispatch(setLead(newArray));
        } else {
          dispatch(updateLead(res.data));
        }
      })
      .catch((error) => {
        toast.error("Something Wrong, Try Again", alert);
      });
  };

  const handleTrashModal = () => {
    setDltItem(null);
  };

  const isShow = (row) => {
    return currentUser.id == row.followerID || currentUser.role == "ADMIN";
  };
  const isFollow = (row) => {
    if (currentUser?.role != "ADMIN") {
      return row.followerID == currentUser.id || row.followerID == null;
    }
  };

  const setUrl = (url) => {
    const urlPattern =
      /^(http|https):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-z]{2,6}(\:[0-9]+)?(\/.*)?$/;
    if (urlPattern.test(url)) {
      const domain = new URL(url).hostname.replace(/^www\./, "");
      return domain;
    } else {
      return url;
    }
  };

  const getColumns = () => {
    const baseColumns = [
      {
        field: "leadsNo",
        headerName: "SL No",
        width: 100,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "company",
        headerName: "Company",
        width: 250,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <NavLink to={`/leads/${row.leadsNo}`}>
            <h2
              style={{ fontSize: "18px", color: "#417cff" }}
              className=" font-bold"
            >
              {row.company}
            </h2>
          </NavLink>
        ),
      },
      {
        field: "country",
        headerName: "Country",
        width: 150,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "website",
        headerName: "Website",
        width: 200,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <div className="p-3">
            <a
              target="_blank"
              href={"https://" + setUrl(row.website)}
              className="cursor-pointer text-blue-500"
            >
              <b>{setUrl(row.website)}</b>
            </a>
          </div>
        ),
      },
      {
        field: "category",
        headerName: "Category",
        width: 200,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "minor",
        headerName: "Minor",
        width: 160,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <div className="p-3">
            <h3 className="capitalize">{row.minor}</h3>
          </div>
        ),
      },
      {
        field: "assignToName",
        headerName: "Assign To",
        width: 160,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <div className="pe-3" style={{ width: "100%", border: "none" }}>
            {/* {row.assignToID && changeAssign != row.id && <h3 onClick={()=> setChangeAssign(row.id)} className="capitalize cursor-pointer">{row.assignToName}</h3>} */}
            {
              <select
                onChange={(e) => handleAssign(e, row.id)}
                className="bg-transparent	outline-0	h-10 capitalize"
              >
                <option
                  className={`${
                    state.theme == "DARK" ? "dark" : "light"
                  } capitalize`}
                  defaultValue={row.assignToName}
                >
                  {row.assignToName}
                </option>
                {users.map((user) => (
                  <option
                    className={`${
                      state.theme == "DARK" ? "dark" : "light"
                    } capitalize`}
                    value={user.id}
                    key={user.id}
                  >
                    {" "}
                    {user.name}{" "}
                  </option>
                ))}
              </select>
            }
          </div>
        ),
      },
      {
        field: "followerName",
        headerName: "Follower",
        width: 160,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <div className="p-3">
            <h3 className="capitalize">{row.followerName}</h3>
          </div>
        ),
      },
      {
        field: "possibility",
        headerName: "Possibility",
        width: 150,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "nextFollowUP",
        headerName: "Next Follow Up",
        width: 150,
        sortable: false,
        filterable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        valueGetter: (params) =>
          params.row.nextFollowUP &&
          moment(params.row.nextFollowUP).format("D MMM YYYY"),
      },
      {
        field: "createdOn",
        headerName: "Created At",
        width: 150,
        sortable: false,
        filterable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: (params) => (
          <div>
            {moment(params.row.createdOn).format("D MMM YYYY")}
            <br />
            {moment(params.row.createdOn).format("hh:mm A")}
          </div>
        ),
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 130,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "email",
        headerName: "Email",
        width: 220,
        sortable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      },
      {
        field: "action",
        headerName: "Action",
        width: 140,
        sortable: false,
        filterable: false,
        headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
        renderCell: ({ row }) => (
          <div>
            {isFollow(row) && (
              <Button
                variant="text"
                color="info"
                onClick={() => setFollowUp(row.id)}
              >
                <label htmlFor="folloUP-modal" className="cursor-pointer">
                  <ReplyIcon />
                </label>
              </Button>
            )}
            {currentUser?.role == "ADMIN" && (
              <Button
                variant="text"
                color="info"
                onClick={() => setAssignItem(row.id)}
              >
                <label htmlFor="assign-lead-modal" className="cursor-pointer">
                  <AssignmentReturnedIcon />
                </label>
              </Button>
            )}
            {isShow(row) && (
              <Button
                onClick={() => setEditItem(row.id)}
                variant="text"
                color="warning"
              >
                <label htmlFor="edit-lead-modal" className="cursor-pointer">
                  <EditCalendarIcon />
                </label>
              </Button>
            )}
            {isShow(row) && (
              <Button
                variant="text"
                color="error"
                onClick={() => setDltItem(row)}
              >
                <label htmlFor="addToTrashModal" className="cursor-pointer">
                  <DeleteIcon />
                </label>
              </Button>
            )}
          </div>
        ),
      },
    ];

    if (currentUser?.role != "ADMIN") {
      return baseColumns.filter(
        (column) =>
          // column.field !== "nextFollowUp" &&
          // column.field !== "possibility" &&
          // column.field !== "follower" &&
          column.field !== "assignToName"
      );
    }
    if (pathname === "/freshLeads") {
      if (currentUser?.role != "ADMIN") {
        return baseColumns.filter(
          (column) =>
            column.field !== "nextFollowUp" &&
            column.field !== "possibility" &&
            column.field !== "follower" &&
            column.field !== "assignToName"
        );
      }
      return baseColumns.filter(
        (column) =>
          column.field !== "nextFollowUp" &&
          column.field !== "possibility" &&
          column.field !== "follower"
      );
    } else {
      return [...baseColumns];
    }
  };

  const columns = getColumns();

  return (
    <Layout>
      <LeadsHeader
        followUp={followUp}
        setFollowUp={setFollowUp}
        assignItem={assignItem}
        setAssignItem={setAssignItem}
        editItem={editItem}
        setEditItem={setEditItem}
        dltItem={dltItem}
        setDltItem={setDltItem}
        handleTrashModal={handleTrashModal}
        path={api}
      ></LeadsHeader>

      {pending && <ShowMsg>data is loading...</ShowMsg>}
      {leadsError && <ShowMsg color={"yellow"}>{leadsError}</ShowMsg>}
      {showLeads?.length > 0 && (
        <DataTable api={api} columns={columns}></DataTable>
      )}
      {!pending && !leadsError && !showLeads?.length && (
        <ShowMsg>data not found</ShowMsg>
      )}
    </Layout>
  );
};

export default Leads;

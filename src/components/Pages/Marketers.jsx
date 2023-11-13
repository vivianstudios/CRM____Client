import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CreateMarkterModal from "../Shared/CreateMarkterModal";
import { getUsers, setUser } from "../../store/reducers/usersReducers";
import ShowMsg from "../Shared/ShowMsg";
import axios from "axios";
import siteInfo from "../../../siteInfo";
import { toast } from "react-toastify";
import EditMarkterModal from "../Shared/EditMarkterModal";
import MiniDrawer from "../Layout/Layout";
import DeleteMarketerModal from "../Shared/DeleteMarketerModal";
import moment from "moment";
import SetTargetModal from "../Shared/setTargetModal";
import { NavLink } from "react-router-dom";
import UserDataTable from "../Shared/UserDataTable";

const Marketers = () => {
  const { users, error, pending } = useSelector((state) => state.users);
  const { theme } = useSelector((state) => state.app);

  const [selectedID, setSelectedID] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();

  

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

  const handleUsersSearch = async (e) => {
    const value = e.target.value;
    try {
      const res = await axios.get(`${siteInfo.api}/users/search/${value}`);
      res.data == null
        ? dispatch(getUsers(`/users`))
        : dispatch(setUser(res.data));
    } catch (error) {
      toast.error("An error occurred while fetching search results", alert);
    }
  };

  useEffect(() => {
    dispatch(getUsers(`/users`));
  }, []);

  const handleDltModal = () => {
    setDeleteItem(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
      headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      renderCell: ({ row }) => (
        <NavLink to={`/marketers/${row.id}`}>
          <h3 className="text-blue-600 capitalize">{row.name}</h3>
        </NavLink>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      sortable: false,
      headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 250,
      sortable: false,
      headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
    },
    {
      field: "createdOn",
      headerName: "Created At",
      width: 200,
      sortable: false,
      filterable: false,
      headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      renderCell: (params) => (
        <div>
          {moment(params.row.createdOn).format('D MMM YYYY')}
        <br />
        {moment(params.row.createdOn).format('hh:mm A')}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      headerClassName: state.theme == "DARK" ? "dark" : "dataTableHeader",
      renderCell: ({ row }) => (
        <div>
          <Button
            onClick={() => setSelectedID(row.id)}
            variant="text"
            color="info"
          >
            <label htmlFor="set-marketers-target" className="cursor-pointer">
              <AdsClickIcon />
            </label>
          </Button>

          <Button
            onClick={() => setSelectedID(row.id)}
            variant="text"
            color="warning"
          >
            <label htmlFor="edit-marketers-modal" className="cursor-pointer">
              <FaEdit />
            </label>
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => setDeleteItem(row)}
          >
            <label htmlFor="delete-marketer-modal" className="cursor-pointer">
              <FaTrashAlt />
            </label>
          </Button>
        </div>
      ),
    },
  ];

  const inputStyle = () => {
    if (theme == "DARK") {
      return {
        background: "#0a1929",
        border: "1px solid #93c5fd",
        color: "#f5f5f5",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };
    } else {
      return {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };
    }
  };

  return (
    <MiniDrawer>
      <section className={` ${state.theme == "DARK" ? "dark" : "light"}`}>
        <div
          className={`flex ${
            state.theme == "DARK" ? "dark" : "light"
          } justify-between px-2 items-center py-3  `}
        >
          <div className="flex">
            <input
              type="search"
              style={inputStyle()}
              onChange={handleUsersSearch}
              placeholder=" Search marketer "
              className="input input-bordered rounded  w-96 h-10"
            />
          
          </div>

          <div>
            <label
              htmlFor="marketers-modal"
              className=" bg-indigo-500 hover:bg-indigo-600  font-semibold  text-neutral-100  py-2 px-3 rounded-sm"
            >
              {" "}
              Create New Marketer{" "}
            </label>
            {selectedID && (
              <EditMarkterModal
                id={selectedID}
                onClose={() => setSelectedID(null)}
              >
                {" "}
              </EditMarkterModal>
            )}
            {selectedID && (
              <SetTargetModal
                id={selectedID}
                onClose={() => setSelectedID(null)}
              >
                {" "}
              </SetTargetModal>
            )}
            {deleteItem && (
              <DeleteMarketerModal
                data={deleteItem}
                handleDltModal={handleDltModal}
                onClose={() => setDeleteItem(null)}
              >
                {" "}
              </DeleteMarketerModal>
            )}
            <CreateMarkterModal> </CreateMarkterModal>
          </div>
        </div>

        {/* Marketer info show in table  */}
        {pending && <ShowMsg>data is loading...</ShowMsg>}
        {error && <ShowMsg color={"yellow"}>{error}</ShowMsg>}
        {users?.length > 0 && (
          <UserDataTable columns={columns} data={users}></UserDataTable>
        )}
        {!pending && !error && !users?.length && (
          <ShowMsg>data not found</ShowMsg>
        )}
      </section>
    </MiniDrawer>
  );
};

export default Marketers;

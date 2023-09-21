import axios from "axios";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import siteInfo from "../../siteInfo";
import { setCurrentUser } from "../store/reducers/usersReducers";
import { useEffect, useState } from "react";

const AdminRoutes = ({ element }) => {
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("crmUserId"))
  );

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("crmUserId"));
    const local = siteInfo.api;
    const api = `${local}/users/${userId}`;

    if (userId) {
      axios
        .get(api)
        .then((res) => {
          dispatch(setCurrentUser(res.data));
          localStorage.setItem("crmUserId", JSON.stringify(res.data.id));
          setIsAdmin(res.data.id);
        })
        .catch((error) => {
          localStorage.setItem("crmUserId", JSON.stringify(null));
          setIsAdmin(null);
        });
    } else {
      setIsAdmin(null);
      localStorage.setItem("crmUserId", JSON.stringify(null));
    }
  }, [isAdmin]);

  return isAdmin ? element : <Navigate to="/login" replace={true} />;
};

export default AdminRoutes;

import axios from "axios";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import siteInfo from "../../siteInfo";
import { setCurrentUser } from "../store/reducers/usersReducers";
import { useEffect, useState } from "react";
import addLoginUpdate from "../Midleware/addLoginUpdate";

const PrivetRoute = ({ element }) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const [isAuthenticate, setIsAuthenticate] = useState(JSON.parse(localStorage.getItem("crmUserId")));
  

  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("crmUserId"));
    const local = siteInfo.api;
    const api = `${local}/users/${userId}`;
  
    if (userId) {
      axios
        .get(api)
        .then((res) => {
          addLoginUpdate(res.data.id)
          dispatch(setCurrentUser(res.data));
          localStorage.setItem("crmUserId", JSON.stringify(res.data.id));
          setIsAuthenticate(res.data.id);
        })
        .catch((error) => {
          localStorage.setItem("crmUserId", JSON.stringify(null));
          setIsAuthenticate(null);
        });
    } else {
      localStorage.setItem("crmUserId", JSON.stringify(null));
      setIsAuthenticate(null);
    }
  }, [isAuthenticate,pathname]);

  return isAuthenticate ? element : <Navigate to="/login" replace={true} />;
};
export default PrivetRoute;

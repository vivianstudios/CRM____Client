import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/style/app.scss";
import router from "./Routers/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./store/reducers/usersReducers";

function App() {
  const state = useSelector((state) => state.app);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=> state.users)

  const LOGOUT_TIME = 60 * 60 * 1000;

  const handleLogOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("crmUserId");
    window.location.pathname = "/login";
  };

  const checkLogout = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastActivity;
    if (elapsedTime >= LOGOUT_TIME) {
      handleLogOut();
    }
  };

  const resetTimer = () => {
    setLastActivity(Date.now());
  };

  window.addEventListener("mousemove", resetTimer);

  useEffect(() => {
    resetTimer();
  }, []);

  setInterval(checkLogout, 60000);

  return (
    <div className={`w-full app ${state.theme == "DARK" ? "dark" : "light"} `}>
      <RouterProvider router={router}> </RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/style/app.scss";
import router from "./Routers/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./store/reducers/usersReducers";
import ActivityDetector from "react-activity-detector";

const customActivityEvents = ["click", "keydown"];

function App() {
  const state = useSelector((state) => state.app);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const LOGOUT_TIME = 2 * 60 * 1000;
  const handleLogOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("crmUserId");
    window.location.pathname = "/login";
  };

  const onIdle = () => {
    console.log("The user seems to be idle...");
    handleLogOut();
  };

  // const checkLogout = () => {
  //   const currentTime = Date.now();
  //   const elapsedTime = currentTime - lastActivity;
  //   // console.log(elapsedTime);
  //   if (elapsedTime >= LOGOUT_TIME) {
  //     // handleLogOut();
  //   }
  // };

  // const resetTimer = () => {
  //   setLastActivity(Date.now());
  // };

  // window.addEventListener("mousemove", resetTimer);

  // useEffect(() => {
  //   resetTimer();
  // }, []);

  // setInterval(checkLogout, 60000);

  return (
    <div className={`w-full app ${state.theme == "DARK" ? "dark" : "light"} `}>
      <RouterProvider router={router}> </RouterProvider>
      <ToastContainer />
      <ActivityDetector
        activityEvents={customActivityEvents}
        enabled={true}
        timeout={15 * 1000 * 60}
        onIdle={onIdle}
        // onActive={onActive}
        name="default"
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router";
import QuarterlyPerform from "./QuarterlyPerform";
import MonthlyPerform from "./MonthlyPerform";
import DailyPerform from "./DailyPerform";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [show, setShow] = useState("Quarterly");
  const { theme } = useSelector((state) => state.app);


  return (
    <Layout>
      {currentUser?.role == "ADMIN" && <h1>Page Under Working</h1>}
      {currentUser?.role != "ADMIN" && (
        <div>
          <div className="flex">
            <h4
              onClick={() => setShow("Quarterly")}
              className={`${
                show == "Quarterly" ? "bg-indigo-500" : "bg-slate-500"
              } text-white rounded mr-2 text-xl cursor-pointer bold px-3 py-2`}
            >
              Quarterly
            </h4>
            <h4
              onClick={() => setShow("Monthly")}
              className={`${
                show == "Monthly" ? "bg-indigo-500" : "bg-slate-500"
              } text-white rounded mx-4 text-xl cursor-pointer bold px-3 py-2`}
            >
              Monthly
            </h4>
            <h4
              onClick={() => setShow("Daily")}
              className={`${
                show == "Daily" ? "bg-indigo-500" : "bg-slate-500"
              } text-white rounded ml-2 text-xl cursor-pointer bold px-3 py-2`}
            >
              Daily
            </h4>
          </div>
          <div>
            {show == "Quarterly" && <QuarterlyPerform />}
            {show == "Monthly" && <MonthlyPerform />}
            {show == "Daily" && <DailyPerform />}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;

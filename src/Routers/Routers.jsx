import { createBrowserRouter } from "react-router-dom";
import PrivetRoutes from "./PrivetRoutes";
import AdminRoutes from "./AdminRoutes";
import QuarterlyPerform from "../components/Pages/QuarterlyPerform";
import MonthlyPerform from "../components/Pages/MonthlyPerform";
import DailyPerform from "../components/Pages/DailyPerform";
import Marketers from "../components/Pages/Marketers";
import AdminProfile from "../components/Pages/AdminProfile";
import PageNotFound from "../components/Shared/PageNotFound";
import Leads from "../components/Pages/Leads";
import Login from "../components/Pages/Login";
import HomeRoutes from "./HomeRoutes";
import LeadPage from "../components/Pages/LeadPage";
import Dashboard from "../components/Pages/Dashboard";
import MarketerPage from "../components/Pages/MarketerPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivetRoutes element={<HomeRoutes />} />,
  },
  {
    path: "/dashboard",
    element: <PrivetRoutes element={<Dashboard />} />,
  },
  {
    path: "dashboard/quarterly",
    element: <PrivetRoutes element={<QuarterlyPerform />} />,
  },
  {
    path: "dashboard/monthly",
    element: <PrivetRoutes element={<MonthlyPerform />} />,
  },
  {
    path: "dashboard/daily",
    element: <PrivetRoutes element={<DailyPerform />} />,
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
  // {
  //   path: "dashboard/quarterly",
  //   element: <QuarterlyPerform />,
  // },
  // {
  //   path: "dashboard/monthly",
  //   element: <MonthlyPerform />,
  // },
  // {
  //   path: "dashboard/daily",
  //   element: <DailyPerform />,
  // },
  {
    path: "/users",
    element: <AdminRoutes  element={<Marketers />} />,
  },
  {
    path: "/marketers/:id",
    element: <AdminRoutes  element={<MarketerPage />} />,
  },
  {
    path: "/trashLeads",
    element: <AdminRoutes  element={<Leads />} />,
  },
  {
    path: "/allLeads",
    element: <PrivetRoutes element={<Leads />} />,
  },
  {
    path: "/freshLeads",
    element: <PrivetRoutes element={<Leads />} />,
  },
  {
    path: "/leads/:id",
    element: <PrivetRoutes element={<LeadPage />} />,
  },
  {
    path: "/followUp/:id",
    element: <PrivetRoutes element={<Leads />} />,
  },
  {
    path: "/assignLeads/:id",
    element: <PrivetRoutes element={<Leads />} />,
  },
  {
    path: "/favLeads/:id",
    element: <PrivetRoutes element={<Leads />} />,
  },
  {
    path: "profile",
    element: <PrivetRoutes element={<AdminProfile />} />,
  },
  {
    path: "/login",
    element: <Login> </Login>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
 
]);

export default router;

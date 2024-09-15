import { Outlet } from "react-router-dom";
import SidBar from "../../Components/Dashbord/Sidebar";
import TopBar from "../../Components/Dashbord/Topbar";
import "./dashboard.css";
export default function Dashbord() {
  return (
    <div className="position-relative">
      <TopBar />
      <div className=" dashboard  d-flex gap-1 " style={{ marginTop: "70px" }}>
        <SidBar />
        <Outlet />
      </div>
    </div>
  );
}

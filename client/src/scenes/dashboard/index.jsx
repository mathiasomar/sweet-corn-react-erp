import { Outlet } from "react-router-dom";
import SideBar from "../global/SideBar";
import TopBar from "../global/Topbar";

const Dashboard = () => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DoctorsList from "./DoctorsList";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />  {/* Sidebar component */}
      {/* <DoctorsList/> */}

      {/* Right side content will update dynamically */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />  {/* Renders the current page inside the layout */}
      </div>
    </div>
  );
};

export default AdminLayout;

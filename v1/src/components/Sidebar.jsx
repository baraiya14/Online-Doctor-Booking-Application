import { FaUserMd, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ Move inside component

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin</h1>
      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center space-x-2 p-3 rounded hover:bg-blue-100"
        >
          <FaCalendarAlt className="text-blue-600" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/admin/appointments")}
          className="flex items-center space-x-2 p-3 rounded hover:bg-blue-100"
        >
          <FaCalendarAlt className="text-blue-600" />
          <span>Appointments</span>
        </button>
        <button
          onClick={() => navigate("/admin/add-doctor")}
          className="flex items-center space-x-2 p-3 rounded hover:bg-blue-100"
        >
          <FaPlus className="text-blue-600" />
          <span>Add Doctor</span>
        </button>
        <button
          onClick={() => navigate("/admin/doctors-list")}
          className="flex items-center space-x-2 p-3 rounded hover:bg-blue-100"
        >
          <FaUserMd className="text-blue-600" />
          <span>Doctors List</span>
        </button>
      </nav>
      <button
        onClick={() => navigate("/logout")}
        className="mt-auto bg-blue-600 text-white p-3 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserMd, FaUser, FaCalendarAlt, FaPlus } from "react-icons/fa"; // Import icons
import DoctorsList from "./DoctorsList";
  const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch doctors from backend
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     setLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:8083/admin/doctors", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setDoctors(response.data || []);
  //     } catch (error) {
  //       setError("Failed to load doctors.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDoctors();
  // }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-lg p-6 flex flex-col h-screen">
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
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-bold">Doctors</h2>
            <p>{doctors.length} Doctors</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-bold">Patients</h2>
            <p>{patients.length} Patients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

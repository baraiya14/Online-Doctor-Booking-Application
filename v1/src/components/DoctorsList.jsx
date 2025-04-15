import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8083/admin/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data || []);
      } catch (error) {
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="flex-1 p-6 text-center">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
              <div className="bg-white shadow-lg rounded-lg p-4  cursor-pointer hover:shadow-xl transition-all">
                <img
                  src={doctor.imageUrl || process.env.PUBLIC_URL + "/doc1.png"}
                  alt={doctor.fullName}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/default-doctor.png"; }}
                />
                {/* <p className="text-sm text-gray-500">Doctor</p> */}
                <h3 className="text-lg mt-1 font-semibold">{doctor.fullName}</h3>
                <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                <div className="leading-tight flex  justify-center items-center ">
                  <span className="text-green-600 text-sm  font-medium">• Available</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;

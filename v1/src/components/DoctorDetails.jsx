import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DoctorDetails = () => {
  const { id } = useParams(); // Get doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8083/admin/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(response.data);
      } catch (error) {
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) return <p>Loading doctor details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!doctor) return <p>No doctor found.</p>;

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <img
          src="/doc1.png"
          alt={doctor.fullName}
          className="w-48 h-48 object-cover rounded-lg border"
        />
        <div>
          <h2 className="text-2xl font-bold">{doctor.fullName}</h2>
          <p className="text-gray-500 text-sm">{doctor.specialization}</p>
          <p className="text-gray-700 mt-2">{doctor.description || "No additional details available."}</p>
          <p className="font-semibold mt-2">Appointment Fee: <span className="text-blue-600">$50</span></p>
        </div>
      </div>

      <h3 className="mt-6 text-lg font-bold">Booking slots</h3>
      <div className="flex gap-3 mt-3">
        {["Thu 20", "Fri 21", "Sat 22", "Sun 23", "Mon 24"].map((day, index) => (
          <div key={index} className="px-4 py-2 bg-gray-100 rounded-md text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Book an appointment
      </button>
    </div>
  );
};

export default DoctorDetails;

import { useState, useEffect } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState({
    doctorId: "",
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("userId");
  
        if (!doctorId) {
          setError("Doctor ID not found. Please log in again.");
          return;
        }
  
        // ✅ Fetch doctor details
        const doctorResponse = await axios.get(`http://localhost:8083/doctors/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setDoctor(doctorResponse.data);
        setAvailability((prev) => ({
          ...prev,
          doctorId: doctorResponse.data.id || doctorId, // Set doctor ID dynamically
        }));
  
        // ✅ Fetch doctor appointments correctly
        const appointmentResponse = await axios.get(
          `http://localhost:8083/doctors/${doctorId}/appointments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(appointmentResponse.data.appointments || []);
      } catch (error) {
        console.error("Error fetching doctor data:", error.response ? error.response.data : error.message);
        setError(error.response?.data?.error || "Failed to load doctor data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctorData();
  }, []);
  
const updateAvailability = async () => {
  try {
    const token = localStorage.getItem("token");

    // Ensure availability is an array
    const availabilityData = Array.isArray(availability) ? availability : [availability];

    const response = await axios.put(
      `http://localhost:8083/doctors/${availability.doctorId}/availability`,
      availabilityData, // Send as an array
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );

    alert("Availability updated successfully!");
    console.log("Updated availability:", response.data);
  } catch (error) {
    console.error("Error updating availability:", error.response ? error.response.data : error.message);
    alert("Failed to update availability.");
  }
};

  const formatDateArray = (dateArray) => {
    if (!dateArray || dateArray.length !== 3) return "N/A";
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  // Helper function to format time array [14, 30] → "14:30"
  const formatTimeArray = (timeArray) => {
    console.log("timeArray: "+ timeArray);
    if (!timeArray || timeArray.length !== 2) return "N/A";
    const [hours, minutes] = timeArray;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">Doctor Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {doctor?.fullName || "Doctor"}!</span>
          <button
            className="bg-white text-blue-600 px-4 py-1 rounded"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/login";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-6 text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-center mt-6 text-red-500">{error}</p>
      ) : (
        <>
          {/* Manage Availability */}
          <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4">Manage Availability</h2>
            <div className="grid grid-cols-4 gap-4">
              <input type="text" value={availability.doctorId} className="border p-2" readOnly />
              <select
                className="border p-2"
                value={availability.day}
                onChange={(e) => setAvailability({ ...availability, day: e.target.value })}
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                className="border p-2"
                value={availability.startTime}
                onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })}
              />
              <input
                type="time"
                className="border p-2"
                value={availability.endTime}
                onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })}
              />
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              onClick={updateAvailability}
            >
              Update Availability
            </button>
          </div>

          {/* Appointment List */}
          <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4">Appointment List</h2>
            {appointments.length === 0 ? (
              <p className="text-center text-gray-600">No appointments found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Patient Name</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="border">
                      <td className="border p-2">{appt.patientName}</td>
                      <td className="border p-2">{formatDateArray(appt.date)}</td>
                      <td className="border p-2">{formatTimeArray(appt.time)}</td>
                      <td className="border p-2">{appt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;

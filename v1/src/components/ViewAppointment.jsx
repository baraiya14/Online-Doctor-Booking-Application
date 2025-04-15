import { useState, useEffect } from "react";
import axios from "axios";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      setErrorAppointments(null);

      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("userId");
     

      if (!token || !patientId) {
        setErrorAppointments("Authentication required. Please log in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8083/appointments/patient/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const formattedAppointments = response.data.appointments.map(appt => ({
          ...appt,
          appointmentDate: new Date(appt.appointmentDate).toLocaleDateString('en-GB')
        }));
        setAppointments(formattedAppointments);

      } else {
        setErrorAppointments("Failed to load appointments.");
      }
    } catch (err) {
      setErrorAppointments(err.response?.data?.error || "Error fetching appointments.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  // Function to handle rescheduling
  const handleReschedule = async () => {
    try {
      if (!newDate || !newTime) {
        setError("Please select a new date and time.");
        return;
      }

      const token = localStorage.getItem("token");
      console.log("selectedAppointmentId: "+ selectedAppointmentId);
      if (!selectedAppointmentId || !token) {
        setError("Invalid appointment selection.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8083/appointments/${selectedAppointmentId}/reschedule`,
        { newDate, newTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Appointment rescheduled successfully.");
        setShowRescheduleModal(false);
        fetchAppointments(); // Refresh the list
      } else {
        setError("Failed to reschedule appointment.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error while rescheduling.");
    }
  };

  // Function to handle cancellation
  const handleCancel = async (appointmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      return;
    }

    console.log("Token being sent:", token);
    // console.log("PatientName:", localStorage.getItem("patientName"));
    console.log("Cancelling appointment with ID:", appointmentId);

    const response = await axios.put(
      `http://localhost:8083/appointments/${appointmentId}/cancel`, 
      {}, // Empty body (if not required)
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      alert("Appointment canceled successfully.");
      fetchAppointments();
    } else {
      setError("Failed to cancel appointment.");
    }
  } catch (err) {
    console.error("Error response:", err.response);
    setError(err.response?.data?.error || "Error while canceling appointment.");
  }
};

  return (
    <div>
    <div className="text-lg font-bold text-green-600 mb-4">
      View My Appointments
    </div>
    {loadingAppointments ? (
      <p className="text-gray-500">Loading appointments...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Doctor</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Reschedule</th>
              <th className="border border-gray-300 p-2">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.aid} className="border border-gray-300">
                <td className="p-2">{appt.doctor.fullName}</td>
                <td className="p-2">{appt.appointmentDate}</td>
                <td className="p-2">{appt.appointmentTime}</td>
                <td className="p-2">{appt.status}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      console.log("Selected Appointment ID:", appt.aid);
                      setSelectedAppointmentId(appt.aid);
                      console.log("Selected Appointment ID:", selectedAppointmentId);
                      setShowRescheduleModal(true);
                      appointments.forEach(appt => console.log("Appointment:", appt));
                    }}
                  >
                    Reschedule
                  </button>
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      handleCancel(appt.aid)}
                    }
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    )}
  
    {error && <p className="text-red-500">{error}</p>}
  
    {/* Reschedule Modal */}
    {showRescheduleModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-md">
          <h3 className="text-lg font-bold mb-4">Reschedule Appointment</h3>
          <label className="block mb-2">
            New Date:
            <input
              type="date"
              className="border border-gray-300 p-2 rounded w-full"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            New Time:
            <input
              type="time"
              className="border border-gray-300 p-2 w-full"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleReschedule}>
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => setShowRescheduleModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
    )}
    </div>
  );
};
export default ViewAppointment;

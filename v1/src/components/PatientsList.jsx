import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const PatientList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    console.log("Component Mounted: Fetching Appointments...");
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
  try {
    setLoadingAppointments(true);
    setErrorAppointments(null);

    const token = localStorage.getItem("token");
    console.log("Retrieved Token:", token);

    if (!token) {
      setErrorAppointments("Authentication required. Please log in.");
      console.warn("Token not found. Authentication issue.");
      return;
    }

    console.log("Making API request to fetch appointments...");
    const response = await axios.get("http://localhost:8083/admin/all", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Raw API Response:", response);

    if (response.status === 200) {
      console.log("API Response Data:", response.data);

      // FIX: Extract the appointments array correctly
      if (!Array.isArray(response.data)) {
        console.warn("Unexpected response structure, checking for appointments key...");
      }

      const appointmentsArray = response.data.appointments || []; // Ensure it's an array

      const formattedAppointments = appointmentsArray.map((appt) => ({
        ...appt,
        appointmentDate: new Date(appt.appointmentDate).toLocaleDateString(
          "en-GB"
        ),
      }));

      console.log("Formatted Appointments:", formattedAppointments);
      setAppointments(formattedAppointments);
    } else {
      setErrorAppointments("Failed to load appointments.");
      console.error("Unexpected API response status:", response.status);
    }
  } catch (err) {
    console.error("Error fetching appointments:", err);
    setErrorAppointments(
      err.response?.data?.error || "Error fetching appointments."
    );
  } finally {
    setLoadingAppointments(false);
    console.log("Finished fetching appointments.");
  }
};

  useEffect(() => {
    console.log("Appointments State Updated:", appointments);
  }, [appointments]);

  const handleReschedule = async () => {
    console.log("Attempting to reschedule appointment:", selectedAppointmentId);

    if (!newDate || !newTime) {
      setErrorAppointments("Please select a new date and time.");
      console.warn("Reschedule validation failed: Missing date or time.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!selectedAppointmentId || !token) {
      setErrorAppointments("Invalid appointment selection.");
      console.warn("Missing appointment ID or authentication token.");
      return;
    }

    try {
      console.log("Making API request to reschedule appointment...");
      const response = await axios.put(
        `http://localhost:8083/appointments/${selectedAppointmentId}/reschedule`,
        { newDate, newTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Reschedule API Response:", response);

      if (response.status === 200) {
        alert("Appointment rescheduled successfully.");
        setShowRescheduleModal(false);
        fetchAppointments();
      } else {
        setErrorAppointments("Failed to reschedule appointment.");
        console.error("Unexpected reschedule response:", response);
      }
    } catch (err) {
      console.error("Error while rescheduling appointment:", err);
      setErrorAppointments(
        err.response?.data?.error || "Error while rescheduling."
      );
    }
  };

  const handleCancel = async (appointmentId) => {
    console.log("Attempting to cancel appointment:", appointmentId);

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorAppointments("Authentication required. Please log in.");
      console.warn("Cancel action failed: No authentication token.");
      return;
    }

    try {
      console.log("Making API request to cancel appointment...");
      const response = await axios.put(
        `http://localhost:8083/appointments/${appointmentId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Cancel API Response:", response);

      if (response.status === 200) {
        alert("Appointment canceled successfully.");
        fetchAppointments();
      } else {
        setErrorAppointments("Failed to cancel appointment.");
        console.error("Unexpected cancel response:", response);
      }
    } catch (err) {
      console.error("Error while canceling appointment:", err);
      setErrorAppointments(
        err.response?.data?.error || "Error while canceling appointment."
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar on the Left */}
      {/* <Sidebar /> */}

      {/* Main Content - Appointment Table */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          Appoinments List
        </h2>

        {loadingAppointments ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : errorAppointments ? (
          <p className="text-red-500">{errorAppointments}</p>
        ) : appointments.length === 0 ? (
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
                  <td className="p-2">{appt?.doctor?.fullName || "N/A"}</td>
                  <td className="p-2">{appt?.appointmentDate || "N/A"}</td>
                  <td className="p-2">{appt?.appointmentTime || "N/A"}</td>
                  <td className="p-2">{appt?.status || "N/A"}</td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedAppointmentId(appt.aid);
                        setShowRescheduleModal(true);
                      }}
                    >
                      Reschedule
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleCancel(appt.aid)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientList;





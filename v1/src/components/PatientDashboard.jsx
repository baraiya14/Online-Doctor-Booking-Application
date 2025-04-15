import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewAppointment from "./ViewAppointment";

const PatientDashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState(null);
  
  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:01 AM - 12:30 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
    "10:30 PM",
  ];
  
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    // ✅ Retrieve patient name from localStorage on component mount
    const storedName = localStorage.getItem("patientName");
    console.log("Stored Name: "+ storedName);
    if (storedName) {
      setPatientName(storedName);
    }
  }, []);


   //Fetch doctor names from backend
   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
         const token = localStorage.getItem("token");
    //    console.log("token: "+ token);
        const doctorId = localStorage.getItem("userId");
        console.log("docotrId: "+ doctorId);

       
      const response = await axios.get(
          "http://localhost:8083/patients/doctors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }    
        );
        setDoctors(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

   // Filter doctors dynamically
   const tempFilteredDoctors = doctors.filter(
    (doctor) =>
      doctor.fullName.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );
  

  // Get today's date in YYYY-MM-DD format for date validation
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getValidTimeSlots = () => {
    const currentHour = new Date().getHours();
    return timeSlots.filter((slot) => {
      const slotHour = parseInt(slot.split(":")[0], 10);
      const isPM = slot.includes("PM");
      const adjustedHour = isPM && slotHour !== 12 ? slotHour + 12 : slotHour;

      return adjustedHour > currentHour;
    });
  };

  // Handle doctor selection and auto-update specialization
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find((d) => d.id === Number(doctorId));
    setSelectedDoctor(doctor);
    setSelectedSpecialization(doctor ? doctor.specialization : "");
  };

  // Handle specialization selection and filter doctors
  const handleSpecializationChange = (e) => {
    const specialization = e.target.value;
    setSelectedSpecialization(specialization);

    // Filter doctors based on specialization
    const filtered = doctors.filter((d) => d.specialization === specialization);
    setFilteredDoctors(filtered);
    setSelectedDoctor(""); // Reset doctor selection when specialization changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before making a new request

    if (!selectedDoctor || !appointmentDate || !selectedSlot) {
      setError("Please fill all fields before booking.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8083/appointments/book",
        {
          doctorId: selectedDoctor.id, 
          //doctorName: selectedDoctor.fullName,
          doctorSpecialization:selectedSpecialization.specialization,
          time: selectedSlot,
          appointmentDate: appointmentDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/patient"); // ✅ Redirect after successful booking
      }
    } catch (error) {
      setError("Failed to book appointment. Please try again.");
      console.error("Error booking appointment:", error);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked!"); // ✅ Check if it runs twice
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  
    navigate("/login");
  };



  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="bg-green-600 p-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">Patient Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {patientName}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search Doctors or Departments"
          className="p-2 w-96 border rounded-l"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </div>

      <div className="mt-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="p-2 border-b">
              <p className="font-semibold">{doctor.fullName}</p>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-center">No doctors found.</p>
        )}
      </div>

      {/* Main Section */}
      <div className="flex flex-col space-y-6 mt-6">
  {/* Make an Appointment */}
  <div className="bg-white p-6 rounded shadow w-full">
    <h2 className="text-lg font-bold text-green-600 mb-4">
      Make an Appointment
    </h2>

    {loading && <p className="text-gray-500">Loading doctors...</p>}
    {error && <p className="text-red-500 mb-3">{error}</p>}

    <select
      className="w-full border p-2 mb-3"
      onChange={handleDoctorChange}
      value={selectedDoctor ? selectedDoctor.id : ""}
      disabled={loading || error}
    >
      <option value="">Select Doctor</option>
      {!loading &&
        !error &&
        filteredDoctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.fullName} - {doctor.specialization}
          </option>
        ))}
    </select>

    {!loading && !error && doctors.length === 0 && (
      <p className="text-yellow-600 mb-3">No doctors available</p>
    )}

    <select
      className="w-full border p-2 mb-3"
      onChange={handleSpecializationChange}
      value={selectedSpecialization}
    >
      <option value="">Select Specialization</option>
      {!loading &&
        !error &&
        [...new Set(doctors.map((doctor) => doctor.specialization))].map(
          (spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
        )
        )}
    </select>

    {/* Date Selection */}
    <input
      type="date"
      className="w-full border p-2 mb-3"
      onChange={(e) => setAppointmentDate(e.target.value)}
      min={getTodayDate()}
    />

    {/* Time Slot Selection */}
    <select
      className="w-full border p-2 mb-3"
      onChange={(e) => setSelectedSlot(e.target.value)}
    >
      <option value="">Select Time Slot</option>
      {getValidTimeSlots().map((slot, index) => (
        <option key={index} value={slot}>
          {slot}
        </option>
      ))}
    </select>

    <button
      onClick={handleSubmit} // ✅ Changed from onSubmit to onClick
      type="button" // ✅ Prevents form submission refresh
      className="bg-green-600 text-white px-4 py-2 rounded w-full"
    >
      Book Appointment
    </button>
  </div>

  {/* View My Appointments (Placed Below) */}
  <ViewAppointment />
</div>
      </div>
  );
};

export default PatientDashboard;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8083/auth/Alldoctors");
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Show all doctors initially
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle Specialization Click
  const handleSpecializationClick = (specialization) => {
    setSelectedSpecialization(specialization);
    const filtered = doctors.filter((doc) => doc.specialization === specialization);
    setFilteredDoctors(filtered);
  };

  return (
    <div className="bg-white px-6">
      {/* Hero Section */}
      <div className="flex items-center justify-between bg-blue-500 text-white px-10 py-18 rounded-lg mt-6 mx-6">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-snug">
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <p className="mt-4 text-lg">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
          <Link to="/book-appointment" className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
            Book appointment →
          </Link>
        </div>
        <div className="w-1/2">
          <img src="HomepageImg.png" alt="Doctors" className="w-full" />
        </div>
      </div>

      {/* Find by Speciality Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold">Find by Speciality</h2>
        <p className="text-gray-600 mt-2">Browse our list of doctors by specialization.</p>

        <div className="flex justify-center space-x-10 mt-8">
          {[
            { name: "General Physician", img: "/General_physician.png" },
            { name: "Gynecologist", img: "/Gynecologist.png" },
            { name: "Dermatologist", img: "/Dermatologist.png" },
            { name: "Pediatrician", img: "/Pediatricians.png" },
            { name: "Neurologist", img: "/Neurologist.png" },
            { name: "Gastroenterologist", img: "/Gastroenterologist.png" },
          ].map((speciality, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleSpecializationClick(speciality.name)}>
              <img src={speciality.img} alt={speciality.name} className="w-20 h-20 rounded-full bg-gray-100 p-3 hover:bg-blue-200 transition" />
              <p className="mt-2 text-gray-700">{speciality.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors List Section */}
      <div className="bg-white px-6 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{selectedSpecialization || "All"} Doctors</h2>
          <p className="text-gray-500 mt-2">Browse through our trusted doctors.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {filteredDoctors.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No doctors found for this specialization.</p>
          ) : (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
                <img src="https://via.placeholder.com/150" alt={doctor.fullName} className="w-full h-40 object-cover rounded-md" />
                <p className="text-green-600 text-sm mt-2">● Available</p>
                <h3 className="font-semibold mt-1">{doctor.fullName}</h3>
                <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                <Link to={`/doctors/${doctor.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  View Profile
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Book Appointment Section */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto mt-8 flex items-center justify-between">
        <div className="px-10">
          <h2 className="text-4xl font-bold">Book Appointment</h2>
          <p className="text-xl mt-2">With 100+ Trusted Doctors</p>
          <Link to="/signup" className="mt-4 bg-white text-gray-700 font-medium py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition">
            Create account
          </Link>
        </div>
        <div className="w-1/2">
          <img src="/HomepageImg2.png" alt="Doctor" className="w-full rounded-xl" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

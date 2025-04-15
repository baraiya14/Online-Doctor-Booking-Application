import { useEffect, useState } from "react";
import axios from "axios";

const SpecializationFilter = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("General physician");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8083/doctors");
        setDoctors(response.data);
        filterDoctors("General physician", response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filterDoctors = (specialization, doctorList) => {
    setSelectedSpecialization(specialization);
    const filtered = doctorList.filter((doc) => doc.specialization === specialization);
    setFilteredDoctors(filtered);
  };

  return (
    <div className="flex gap-6 px-10 py-10">
      {/* Sidebar */}
      <div className="w-1/4">
        <h2 className="text-lg font-semibold mb-3">Browse through the doctors specialist.</h2>
        <div className="flex flex-col space-y-2">
          {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((specialty) => (
            <button
              key={specialty}
              className={`px-4 py-2 rounded-lg text-left transition ${
                selectedSpecialization === specialty ? "bg-blue-100 text-blue-600 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => filterDoctors(specialty, doctors)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <p className="text-gray-500">No doctors available for {selectedSpecialization}.</p>
          ) : (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-blue-50 p-6 rounded-xl shadow-md text-center">
                <img
                  src={doctor.image || "https://via.placeholder.com/150"}
                  alt={doctor.fullName}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-3"
                />
                <p className="text-green-600 font-semibold">● Available</p>
                <h3 className="text-lg font-semibold mt-1">{doctor.fullName}</h3>
                <p className="text-gray-500 text-sm">{doctor.specialization}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecializationFilter;

import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const AddDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    fullName: "",
    email: "",
    password: "",
    experience: "",
    phone:"",  
    specialization: "General physician",
    degree: "",
    address1: "",
    address2: "",
    fees: "", 
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleFileChange = (e) => {
    setDoctorData({ ...doctorData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(doctorData).forEach((key) => {
      formData.append(key, doctorData[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8083/admin/register/doctor", formData, {
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "multipart/form-data" },
      });

      alert("Doctor added successfully!");
      setDoctorData({
        fullName: "",
        email: "",
        password: "",
        experience: "",
        phone:"",
        specialization: "General physician",
        degree: "",
        address1: "",
        address2: "",
        fees: "",
        profilePicture: null,
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Add Doctor</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <label className="block text-gray-600">Name</label>
              <input type="text" name="fullName" value={doctorData.fullName} onChange={handleChange} className="w-full p-2 border rounded" required />

              <label className="block text-gray-600 mt-2">Email</label>
              <input type="email" name="email" value={doctorData.email} onChange={handleChange} className="w-full p-2 border rounded" required />

              <label className="block text-gray-600 mt-2">Password</label>
              <input type="password" name="password" value={doctorData.password} onChange={handleChange} className="w-full p-2 border rounded" required />

              <label className="block text-gray-600 mt-2">Experience</label>
              <input type="text" name="experience" value={doctorData.experience} onChange={handleChange} className="w-full p-2 border rounded" required />

              <label className="block text-gray-600 mt-2">Phone</label>
              <input type="text" name="phone" value={doctorData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-gray-600">Specialization</label>
              <select name="specialization" value={doctorData.specialization} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="General physician">General physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>

              <label className="block text-gray-600 mt-2">Degree</label>
              <input type="text" name="degree" value={doctorData.degree} onChange={handleChange} className="w-full p-2 border rounded" />

              <label className="block text-gray-600 mt-2">Fees</label>
              <input type="number" name="fees" value={doctorData.fees} onChange={handleChange} className="w-full p-2 border rounded" required />

              <label className="block text-gray-600 mt-2">Profile Picture</label>
              <input type="file" name="profilePicture" onChange={handleFileChange} className="w-full p-2 border rounded" />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-600">Address</label>
              <input type="text" name="address1" value={doctorData.address1} onChange={handleChange} placeholder="Address Line 1" className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="address2" value={doctorData.address2} onChange={handleChange} placeholder="Address Line 2" className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded mt-4">
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;

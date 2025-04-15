import { useState } from "react";

const DoctorManagement = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    role: "Doctor",
    phone: "",
    dob: "",
    specialization: "",
    license: "",
    experience: ""
  });

  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    setDoctors([...doctors, doctor]);
    setDoctor({ name: "", email: "", password: "", role: "Doctor", phone: "", dob: "", specialization: "", license: "", experience: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctor Registration</h2>
      <div className="grid grid-cols-1 gap-2 max-w-lg">
        <input type="text" name="name" placeholder="Full Name" value={doctor.name} onChange={handleChange} className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={doctor.email} onChange={handleChange} className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" value={doctor.password} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="phone" placeholder="Phone Number" value={doctor.phone} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="dob" value={doctor.dob} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="specialization" placeholder="Specialization" value={doctor.specialization} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="license" placeholder="License Number" value={doctor.license} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="experience" placeholder="Years of Experience" value={doctor.experience} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">Register</button>
      </div>

      <h2 className="text-2xl font-bold mt-6">Doctor List</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">License</th>
            <th className="border p-2">Experience</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{doc.name}</td>
              <td className="border p-2">{doc.email}</td>
              <td className="border p-2">{doc.phone}</td>
              <td className="border p-2">{doc.specialization}</td>
              <td className="border p-2">{doc.license}</td>
              <td className="border p-2">{doc.experience} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorManagement;

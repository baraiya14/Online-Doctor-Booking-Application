import { useState } from "react";

const UpdateProfile = ({ role }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    specialization: "",
    license: "",
    experience: "",
    medicalHistory: "",
    allergies: "",
    emergencyContact: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated Profile:", profile);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <div className="grid grid-cols-1 gap-2">
        <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" value={profile.password} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="border p-2 rounded" />
        
        {role === "Doctor" && (
          <>
            <input type="text" name="specialization" placeholder="Specialization" value={profile.specialization} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="license" placeholder="License Number" value={profile.license} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="experience" placeholder="Years of Experience" value={profile.experience} onChange={handleChange} className="border p-2 rounded" />
          </>
        )}
        
        {role === "Patient" && (
          <>
            <textarea name="medicalHistory" placeholder="Medical History" value={profile.medicalHistory} onChange={handleChange} className="border p-2 rounded"></textarea>
            <input type="text" name="allergies" placeholder="Allergies" value={profile.allergies} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={profile.emergencyContact} onChange={handleChange} className="border p-2 rounded" />
          </>
        )}
        
        <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update</button>
      </div>
    </div>
  );
};

export default UpdateProfile;

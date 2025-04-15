import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Use react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">Hospital Management</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/about" className="text-white hover:underline">About</Link>
        <Link to="/services" className="text-white hover:underline">Services</Link>
        <Link to="/contact" className="text-white hover:underline">Contact</Link>
        <Link to="/doctor" className="text-white hover:underline">Doctor</Link>
        <Link to="/patient" className="text-white hover:underline">Patient</Link>
        <Link to="/admin" className="text-white hover:underline">Admin</Link>
        <Link to="/reports" className="text-white hover:underline">Reports</Link>
      </div>

      {/* Authentication Links (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <Link to="/login" className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Sign Up</Link>
        <Link to="/logout" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 w-full bg-blue-500 text-white shadow-md md:hidden transition-transform duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col items-center space-y-4 p-4">
          <Link to="/" className="text-white hover:underline" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="text-white hover:underline" onClick={toggleMenu}>About</Link>
          <Link to="/services" className="text-white hover:underline" onClick={toggleMenu}>Services</Link>
          <Link to="/contact" className="text-white hover:underline" onClick={toggleMenu}>Contact</Link>
          <Link to="/doctor" className="text-white hover:underline" onClick={toggleMenu}>Doctor</Link>
          <Link to="/patient" className="text-white hover:underline" onClick={toggleMenu}>Patient</Link>
          <Link to="/admin" className="text-white hover:underline" onClick={toggleMenu}>Admin</Link>
          <Link to="/reports" className="text-white hover:underline" onClick={toggleMenu}>Reports</Link>

          {/* Authentication Links (Mobile) */}
          <Link to="/login" className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200" onClick={toggleMenu}>Login</Link>
          <Link to="/signup" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600" onClick={toggleMenu}>Sign Up</Link>
          <Link to="/logout" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={toggleMenu}>Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import { Link  } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Logout from "../pages/Logout";
// const Navbar = () => {
//   const linkClass = "text-white hover:underline"; 
//   return (
//     <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
//       <h1 className="text-xl font-bold">Hospital Management</h1>
//       <div className="space-x-4">
//         <Link to="/" className={linkClass}>Home</Link>
//         <Link to="/about" className={linkClass}>About</Link>
//         <Link to="/services" className={linkClass}>Services</Link>
//         <Link to="/contact" className={linkClass}>Contact</Link>
//         <Link to="/doctor" className={linkClass}>DoctorD</Link>
//         <Link to="/patient" className={linkClass}>PatientD</Link>
//         <Link to="/admin" className={linkClass}>AdminD</Link>
//         <Link to="/reports" className={linkClass}>Reports</Link>
//         <Link to="/manage-departments" className={linkClass}>De.M</Link>
//         <Link to="/manage-doctors" className={linkClass}>Doctor.M</Link>
//         <Link to="/manage-patients" className={linkClass}>Pa.M</Link>
//         <Link to="/profile" className={linkClass}>Profile</Link>
//       </div>
//       <div className="space-x-2">
//         <Link to="/login" className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200">
//           Login
//         </Link>
//         <Link to="/signup" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
//           Sign Up
//         </Link>
//         <Link to="/Logout" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
//           Logout
//         </Link>
//       </div>
//       {/* <Logout/> */}
//     </nav>
//   );
// };
// export default Navbar;

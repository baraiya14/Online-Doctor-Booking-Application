import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from './components/Profile';
import Reports from './components/Reports';
import DepartmentManagement from './components/DepartmentManagement';
import DoctorManagement from './components/DoctorManagement';
import Logout from "./pages/Logout";
import DoctorsList from './components/DoctorsList';
import PatientsList from './components/PatientsList';
import AddDoctor from './components/AddDoctor';
import ViewAppointment from './components/ViewAppointment.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AboutUs from './components/AboutUs';
import './App.css'; // Import the CSS file
import ContactUs from './components/ContactUs.jsx';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/patient" element={<PatientDashboard />} />
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/manage-departments" element={<DepartmentManagement />} />
                <Route path="/manage-doctors" element={<DoctorManagement />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                {/* Admin Routes with Sidebar (Nested under AdminLayout) */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="doctors-list" element={<DoctorsList />} />
                    <Route path="appointments" element={<PatientsList />} />
                    <Route path="add-doctor" element={<AddDoctor />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

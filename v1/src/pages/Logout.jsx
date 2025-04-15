import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear the authentication token
    localStorage.removeItem("userId"); // Clear userId

    window.location.replace("/login"); // Force reload to login page
    // navigate("/login"); // Alternative soft redirect
  }, []); // Runs once when the component mounts

  return null; // No button needed, just auto-executes
};

export default Logout;

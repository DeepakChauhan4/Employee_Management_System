import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); //remove token- jwt from local storage
        navigate("/"); //go to login
    };

    return (
        <div style={navStyle}>
            <img src={logo} alt="logo" style={{ width: 32, height: 32, borderRadius: 6 }} />
            <h2>Company Dashboard</h2>

            <button style={logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

const navStyle = {
    height: "60px",
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
};

const logoutBtn = {
    background: "#fff",
    color: "#4f46e5",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
};
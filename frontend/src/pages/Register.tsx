/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.png";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(2); // default EMPLOYEE
    const [department, setDepartment] = useState("Engineering");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
                roleId,
                department,
            });

            //redirect to login after success
            navigate("/");
        } catch (err) {
            setError("Registration failed (email may already exist)");
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleRegister}>

                {/*  LOGO */}
                <img src={logo} alt="logo" className="logo" />

                <h2>Create Account</h2>
                <p className="subtitle">Register to get started</p>

                {error && <p className="error">{error}</p>}

                {/* NAME */}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/*EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/*PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* ROLE */}
                <select
                    value={roleId}
                    onChange={(e) => setRoleId(Number(e.target.value))}
                >
                    <option value={2}>Employee</option>
                    <option value={1}>Admin</option>
                </select>

                {/* DEPARTMENT */}
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{ marginTop: "8px" }}
                    required
                >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                </select>

                {/* BUTTON */}
                <button type="submit">Register</button>

                {/* NAVIGATION */}
                <p style={{ marginTop: "10px" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#4f46e5", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
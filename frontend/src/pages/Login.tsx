/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

//If logo exists in assets
// import logo from "../assets/logo.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); //loader state

    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("Sending login request...");

            const res = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("API Response:", res.data);

            //Ensure token exists
            if (!res.data.access_token) {
                throw new Error("Token not received from server");
            }

            //Save token and set auth header for subsequent requests
            const token = res.data.access_token;
            localStorage.setItem("token", token);
            setAuthToken(token);

            console.log("Token saved:", localStorage.getItem("token"));

            // Prefer SPA navigation
            navigate("/dashboard");

        } catch (err: any) {
            console.log("LOGIN ERROR FULL:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleLogin}>


                {/* <img src={logo} alt="logo" className="logo" /> */}

                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your account</p>

                {error && <p className="error">{error}</p>}

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

                {/*BUTTON */}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/*NAVIGATION */}
                <p style={{ marginTop: "10px" }}>
                    Don't have an account?{" "}
                    <span
                        style={{ color: "#4f46e5", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}
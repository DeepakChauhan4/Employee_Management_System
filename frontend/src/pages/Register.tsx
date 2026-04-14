import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        roleId: 2,
    });

    const handleRegister = async () => {
        await api.post("/auth/register", form);
        alert("Registered Successfully");
        navigate("/");
    };

    return (
        <div>
            <h2>Register</h2>

            <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
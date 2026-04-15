/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import ProfileCard from "../components/ProfileCard";
import UsersList from "../components/UsersList";
import { useNavigate } from "react-router-dom"; // ✅ FIX

export default function Dashboard() {
    const [me, setMe] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // ✅ FIX

    useEffect(() => {
        const token = localStorage.getItem("token");

        // 🔐 PROTECT ROUTE
        if (!token) {
            window.location.href = "/";
            return;
        }

        const fetchData = async () => {
            try {
                const meRes = await api.get("/user/me");
                setMe(meRes.data);

                // ✅ FETCH USERS ONLY FOR ADMIN
                if (meRes.data.role.name === "ADMIN") {
                    const usersRes = await api.get("/user");
                    setUsers(usersRes.data);
                }
            } catch (err: any) {
                console.log(err);

                // 🔐 HANDLE INVALID TOKEN
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ⏳ LOADER
    if (loading) return <Loader />;

    if (!me) return null;

    return (
        <div>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "20px", width: "100%" }}>
                    <h2>Dashboard</h2>

                    {/* 🔹 STAT CARDS */}
                    <div style={{ display: "flex", gap: "20px" }}>
                        <StatCard title="My Role" value={me.role.name} />

                        {/* ✅ CLICKABLE USERS CARD */}
                        {me.role.name === "ADMIN" && (
                            <StatCard
                                title="Total Users"
                                value={users.length}
                                onClick={() => navigate("/users")}
                            />
                        )}

                        <StatCard title="User ID" value={me.id} />
                    </div>

                    {/* 🔹 CHART (ADMIN ONLY) */}
                    {me.role.name === "ADMIN" && <ChartCard />}

                    {/* 🔹 PROFILE CARD */}
                    <ProfileCard
                        me={me}
                        onClick={() => navigate("/profile")} // ✅ FIX
                    />

                    {/* 🔹 USERS LIST */}
                    {me.role.name === "ADMIN" && (
                        <UsersList users={users} /> // ✅ CLEAN COMPONENT
                    )}
                </div>
            </div>
        </div>
    );
}
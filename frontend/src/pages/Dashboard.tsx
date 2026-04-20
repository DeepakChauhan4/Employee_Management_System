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
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";
import ChatBot from "../components/ChatBot";

export default function Dashboard() {
    const [me, setMe] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleDeleteUser = async (id: number | string) => {
        if (!confirm("Delete this user?")) return;
        try {
            await api.delete(`/user/${id}`);
            // refresh users list
            const usersRes = await api.get("/user");
            setUsers(usersRes.data);
        } catch (err) {
            console.error("DELETE USER ERROR", err);
            alert("Failed to delete user");
        }
    };

    const handleEditUser = async (user: any) => {
        const newDept = prompt("Enter new department (leave empty to cancel):", user.department?.name || "");
        if (newDept === null) return; // cancelled
        try {
            await api.patch(`/user/${user.id}`, { department: newDept });
            const usersRes = await api.get("/user");
            setUsers(usersRes.data);
        } catch (err) {
            console.error("EDIT USER ERROR", err);
            alert("Failed to update user");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        //PROTECT ROUTE
        if (!token) {
            window.location.href = "/";
            return;
        }

        // ensure axios has Authorization header after page reload
        setAuthToken(token);

        const fetchData = async () => {
            try {
                const meRes = await api.get("/user/me");
                setMe(meRes.data);

                // FETCH USERS ONLY FOR ADMIN
                if (meRes.data.role.name === "ADMIN") {
                    const usersRes = await api.get("/user");
                    setUsers(usersRes.data);
                }
            } catch (err: any) {
                console.log(err);

                // HANDLE INVALID TOKEN
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location, navigate]);

    // Scroll to target if navigation provided a state
    useEffect(() => {
        if (loading || !me) return;

        const target = (location.state as any)?.scrollTo as string | undefined;
        if (target) {
            // slight delay to allow DOM to render
            setTimeout(() => {
                const el = document.getElementById(target);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);

            // clear state so future navigations don't re-trigger
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [loading, me, location, navigate]);

    // LOADER
    if (loading) return <Loader />;

    if (!me) return null;

    return (
        <div>
            <ChatBot />
            <Navbar />

            <div style={{ display: "flex", alignItems: "flex-start", minHeight: "100vh" }}>
                <Sidebar />

                <div style={{ padding: "28px", width: "100%" }}>
                    <div
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.9))",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ margin: 0 }}>Dashboard</h2>
                            <div style={{ color: "#64748b" }}>Welcome back — manage your workspace</div>
                        </div>

                        {/* STAT CARDS */}
                        <div style={{ display: "flex", gap: "20px", marginTop: "18px" }}>
                            <StatCard title="My Role" value={me.role.name} />

                            {/* CLICKABLE USERS CARD */}
                            {me.role.name === "ADMIN" && (
                                <StatCard title="Total Users" value={users.length} onClick={() => navigate("/users")} />
                            )}

                            <StatCard title="User ID" value={me.id} />
                        </div>

                        {/* 🔹 CHART (ADMIN ONLY) */}
                        {me.role.name === "ADMIN" && <ChartCard />}
                    </div>

                    {/* 🔹 PROFILE CARD */}
                    <div id="profile-section">
                        <ProfileCard me={me} onClick={() => navigate("/profile")} />
                    </div>

                    {/* 🔹 USERS LIST */}
                    {me.role.name === "ADMIN" && (
                        <div id="users-section">
                            <UsersList users={users} isAdmin onDelete={handleDeleteUser} onEdit={handleEditUser} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/user");
                setUsers(res.data);
            } catch (err) {
                console.log("USERS ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Loader />;

    return (
        <div>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "20px", width: "100%" }}>
                    <h2 style={{ marginBottom: "20px" }}>👥 All Users</h2>

                    {users.length === 0 ? (
                        <div style={emptyStyle}>No users found</div>
                    ) : (
                        <div style={gridStyle}>
                            {users.map((u) => (
                                <div
                                    key={u.id}
                                    style={cardStyle}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.02)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }
                                >
                                    {/* 🔹 Avatar */}
                                    <div style={avatarStyle}>
                                        {u.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* 🔹 User Info */}
                                    <div style={{ marginTop: "10px" }}>
                                        <h3 style={{ margin: "5px 0" }}>{u.name}</h3>
                                        <p style={emailStyle}>{u.email}</p>
                                    </div>

                                    {/* 🔹 Role Badge */}
                                    <span
                                        style={{
                                            ...badgeStyle,
                                            background:
                                                u.role.name === "ADMIN"
                                                    ? "#e3f2fd"
                                                    : "#e8f5e9",
                                            color:
                                                u.role.name === "ADMIN"
                                                    ? "#1976d2"
                                                    : "#2e7d32",
                                        }}
                                    >
                                        {u.role.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* 🔥 STYLES */

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
};

const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center" as const,
    transition: "0.2s",
    cursor: "pointer",
};

const avatarStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    margin: "0 auto",
};

const emailStyle = {
    fontSize: "13px",
    color: "#666",
};

const badgeStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
};

const emptyStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center" as const,
};
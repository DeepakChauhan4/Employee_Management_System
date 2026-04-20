/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

type Role = { name: string };
type Department = { name: string } | null;

type User = {
    id: number | string;
    name: string;
    email: string;
    role: Role;
    department?: Department;
    profileImage?: string | null;
    createdAt?: string | null;
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleView = (id: number | string) => {
        navigate(`/user/${id}`);
    };

    useEffect(() => {
        let mounted = true;

        const fetchUsers = async () => {
            try {
                const res = await api.get<User[]>('/user');
                if (!mounted) return;
                setUsers(res.data || []);
            } catch (err) {
                // keep console logging for dev debugging
                // eslint-disable-next-line no-console
                console.error("USERS ERROR:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUsers();

        return () => {
            mounted = false;
        };
    }, []);
    //This code I built for searching and filtering employee/users

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter((u) => {
            return (
                (u.name ?? "").toLowerCase().includes(q) ||
                (u.email ?? "").toLowerCase().includes(q)
            );
        });
    }, [users, search]);

    if (loading) return <Loader />;

    return (
        <div>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "24px", width: "100%" }}>
                    <h2 style={{ marginBottom: "12px" }}>👥 All Users</h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <input
                            aria-label="Search users by name or email"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px 12px',
                                borderRadius: 8,
                                border: '1px solid #e5e7eb',
                                outline: 'none',
                                fontSize: 14,
                                background: '#fff'
                            }}
                        />
                        {search && (
                            <button onClick={() => setSearch("")} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>Clear</button>
                        )}
                    </div>

                    <div style={{ marginTop: 0 }}>
                        {filtered.length === 0 ? (
                            <div style={emptyStyle}>No users found</div>
                        ) : (
                            <div style={gridStyle}>
                                {filtered.map((u) => (
                                    <UserCard key={u.id} user={u} isAdmin onView={handleView} onEdit={() => { }} onDelete={() => { }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* STYLES */

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "18px",
};

const emptyStyle = {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    textAlign: "center" as const,
};

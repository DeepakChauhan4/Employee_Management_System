/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function UserView() {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(`/user/${id}`);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [id]);

    if (loading) return <Loader />;
    if (!user) return null;

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "20px", width: "100%" }}>
                    <h2 style={{ marginBottom: "20px" }}>👤 User Profile</h2>

                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        maxWidth: "720px",
                    }}>
                        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                            <div style={{ width: 96, height: 96, borderRadius: 12, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
                                {user.profileImage ? (
                                    <img src={`${api.defaults.baseURL}/uploads/${user.profileImage}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="profile" />
                                ) : (
                                    <div style={{ width: 80, height: 80, borderRadius: 10, background: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{user.name?.charAt(0)?.toUpperCase()}</div>
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>{user.name}</h3>
                                        <div style={{ fontSize: 13, color: '#6b7280' }}>{user.email}</div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700, background: user.role?.name === 'ADMIN' ? '#e3f2fd' : '#e8f5e9', color: user.role?.name === 'ADMIN' ? '#1976d2' : '#2e7d32' }}>{user.role?.name ?? 'USER'}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 24, marginTop: 12, flexWrap: 'wrap' as const }}>
                                    <div style={{ fontSize: 14, color: '#374151' }}>Department: <span style={{ color: '#6b7280', fontWeight: 600 }}>{user.department?.name ?? '—'}</span></div>
                                    {user.createdAt && <div style={{ fontSize: 14, color: '#374151' }}>Joined: <span style={{ color: '#6b7280', fontWeight: 600 }}>{new Date(user.createdAt).toLocaleDateString()}</span></div>}
                                    <div style={{ fontSize: 14, color: '#374151' }}>ID: <span style={{ color: '#6b7280', fontWeight: 600 }}>{user.id}</span></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <button onClick={() => window.history.back()} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const [me, setMe] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        api.get("/user/me").then((res) => setMe(res.data));

        api.get("/user")
            .then((res) => setUsers(res.data))
            .catch(() => { });
    }, []);

    return (
        <div>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "20px" }}>
                    <h2>Dashboard</h2>

                    <h3>My Profile</h3>
                    <pre>{JSON.stringify(me, null, 2)}</pre>

                    <h3>All Users</h3>
                    {users.map((u) => (
                        <div key={u.id}>
                            {u.name} - {u.role.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
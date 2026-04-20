/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Profile() {
    const [me, setMe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);

    const fetchProfile = async () => {
        const res = await api.get("/user/me");
        setMe(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        //PROTECT ROUTE
        if (!token) {
            window.location.href = "/";
            return;
        }

        const init = async () => {
            try {
                await fetchProfile();
            } catch (err: any) {
                console.log("PROFILE ERROR:", err);

                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    //HANDLE IMAGE UPLOAD
    const handleUpload = async () => {
        console.log("UPLOAD CLICKED"); //debug

        if (!file) {
            alert("Please select a file first");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            console.log("SENDING FILE:", file);

            await api.post("/user/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Profile photo uploaded ✅");

            await fetchProfile(); //refresh profile
        } catch (err) {
            console.log("UPLOAD ERROR:", err);
        }
    };

    if (loading) return <Loader />;
    if (!me) return null;

    return (
        <div>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ padding: "20px", width: "100%" }}>
                    <h2 style={{ marginBottom: "20px" }}>👤 My Profile</h2>

                    <div style={cardStyle}>
                        {/* 🔹 IMAGE OR AVATAR */}
                        {me.profileImage ? (
                            <img
                                src={`http://localhost:3000/uploads/${me.profileImage}`}
                                style={imgStyle}
                                alt="profile"
                            />
                        ) : (
                            <div style={avatarStyle}>
                                {me.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* 🔹 Info */}
                        <h3 style={{ marginTop: "10px" }}>{me.name}</h3>
                        <p style={emailStyle}>{me.email}</p>
                        {me.department?.name && (
                            <p style={{ color: "#666", fontSize: "13px", marginTop: "4px" }}>{me.department.name}</p>
                        )}

                        {/* 🔹 Role */}
                        <span
                            style={{
                                ...badgeStyle,
                                background:
                                    me.role.name === "ADMIN"
                                        ? "#e3f2fd"
                                        : "#e8f5e9",
                                color:
                                    me.role.name === "ADMIN"
                                        ? "#1976d2"
                                        : "#2e7d32",
                            }}
                        >
                            {me.role.name}
                        </span>

                        {/* FILE INPUT */}
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                marginTop: "15px",
                                cursor: "pointer",
                                display: "inline-block",
                                width: "auto",
                                zIndex: 1,
                            }}
                            onChange={(e) => {
                                const selected = e.target.files?.[0];
                                console.log("SELECTED FILE:", selected);
                                setFile(selected || null);
                            }}
                        />

                        {/*UPLOAD BUTTON */}
                        <button type="button" onClick={handleUpload} style={btnStyle}>
                            Upload Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* 🔥 STYLES */

const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center" as const,
    maxWidth: "400px",
};

const avatarStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    margin: "0 auto",
};

const imgStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover" as const,
};

const emailStyle = {
    color: "#666",
    fontSize: "14px",
};

const badgeStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
};

const btnStyle = {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    position: "relative" as const,
    zIndex: 10,
} as const;
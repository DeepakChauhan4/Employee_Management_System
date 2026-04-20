import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [hover, setHover] = useState<string | null>(null);

    const handleNav = (targetId: string) => {
        // If already on dashboard, scroll to target section
        if (location.pathname === "/dashboard") {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        // Otherwise navigate to dashboard and pass targetId in state
        navigate("/dashboard", { state: { scrollTo: targetId } });
    };

    const itemStyle = (id: string) => ({
        cursor: "pointer",
        padding: "6px 0",
        borderRadius: "6px",
        background: hover === id ? "#1f2937" : "transparent",
        transition: "background 120ms ease-in-out",
    });

    return (
        <div style={sidebarStyle}>
            <h2>MY Panel ⚡</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={itemStyle("dashboard")}
                    onClick={() => navigate("/dashboard")}
                    onMouseEnter={() => setHover("dashboard")}
                    onMouseLeave={() => setHover(null)}
                    tabIndex={0}
                >
                    Dashboard
                </li>
                <hr />
                <li
                    style={itemStyle("users")}
                    onClick={() => handleNav("users-section")}
                    onMouseEnter={() => setHover("users")}
                    onMouseLeave={() => setHover(null)}
                    tabIndex={0}
                >
                    Users
                </li>
                <br />
                <li
                    style={itemStyle("profile")}
                    onClick={() => handleNav("profile-section")}
                    onMouseEnter={() => setHover("profile")}
                    onMouseLeave={() => setHover(null)}
                    tabIndex={0}
                >
                    Profile
                </li>
            </ul>
        </div>
    );
}

const sidebarStyle: CSSProperties = {
    width: "220px",
    minHeight: "100vh",
    background: "#111827",
    color: "#fff",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(2,6,23,0.08)",
    position: "sticky",
    top: 0,
    borderTopRightRadius: "12px",
};
type UserProfile = {
    id: number | string;
    name: string;
    email: string;
    role: {
        name: string;
    };
};

type Props = {
    me: UserProfile;
    onClick?: () => void;
};

export default function ProfileCard({ me, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                cursor: onClick ? "pointer" : "default",
                transition: "0.2s",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
            }
        >
            <h3 style={{ marginBottom: "15px" }}>👤 My Profile</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Row label="Name" value={me.name} />
                <Row label="Email" value={me.email} />

                <div style={rowStyle}>
                    <span style={labelStyle}>Role:</span>
                    <span
                        style={{
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            background:
                                me.role.name === "ADMIN" ? "#e3f2fd" : "#e8f5e9",
                            color:
                                me.role.name === "ADMIN" ? "#1976d2" : "#2e7d32",
                        }}
                    >
                        {me.role.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string | number }) {
    return (
        <div style={rowStyle}>
            <span style={labelStyle}>{label}:</span>
            <span>{value}</span>
        </div>
    );
}

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const labelStyle = {
    fontWeight: "600",
    color: "#555",
};
type User = {
    id: number | string;
    name: string;
    email: string;
    role: {
        name: string;
    };
};

type Props = {
    user: User;
};

export default function UserCard({ user }: Props) {
    return (
        <div
            style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#f9fafb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.2s",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#eef2f7")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
            }
        >
            <div>
                <div style={{ fontWeight: "600" }}>{user.name}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                    {user.email}
                </div>
            </div>

            <span
                style={{
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    background:
                        user.role.name === "ADMIN" ? "#e3f2fd" : "#e8f5e9",
                    color:
                        user.role.name === "ADMIN" ? "#1976d2" : "#2e7d32",
                }}
            >
                {user.role.name}
            </span>
        </div>
    );
}
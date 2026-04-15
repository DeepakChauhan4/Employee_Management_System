import UserCard from "./UserCard";

type User = {
    id: number | string;
    name: string;
    email: string;
    role: {
        name: string;
    };
};

type Props = {
    users: User[];
};

export default function UsersList({ users }: Props) {
    return (
        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
        >
            <h3 style={{ marginBottom: "15px" }}>👥 All Users</h3>

            <div style={{ display: "grid", gap: "12px" }}>
                {users.map((u) => (
                    <UserCard key={u.id} user={u} />
                ))}
            </div>
        </div>
    );
}
export default function Sidebar() {
    return (
        <div style={sidebarStyle}>
            <h2>MY Panel ⚡</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li>Dashboard</li>
                <hr />
                <li>Users</li>
                <br />
                <li>Profile</li>
            </ul>
        </div>
    );
}

const sidebarStyle = {
    width: "220px",
    height: "100vh",
    background: "#111827",
    color: "#fff",
    padding: "20px",
};
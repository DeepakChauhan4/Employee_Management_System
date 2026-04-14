import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const auth = useAuth();

    return (
        <div style={{ padding: "10px", background: "#222", color: "#fff" }}>
            <span>Employee System</span>

            <button
                style={{ float: "right" }}
                onClick={auth?.logout}
            >
                Logout
            </button>
        </div>
    );
}
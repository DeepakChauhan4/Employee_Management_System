type Props = {
    title: string;
    value: string | number;
    onClick?: () => void; // ✅ FIX
};

export default function StatCard({ title, value, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                cursor: onClick ? "pointer" : "default",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "0.2s",
                flex: 1,
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = "scale(1.03)";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            <h4>{title}</h4>
            <h2>{value}</h2>
        </div>
    );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
} from "recharts";
import { api } from "../services/api";

export default function ChartCard() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/user/stats");
                setData(Array.isArray(res.data) ? res.data : []);
            } catch (_err) {
                // silently fail and show empty chart placeholder
                setData([]);
            }
        };

        fetchStats();
    }, []);

    return (
        <div style={chartStyle}>
            <h3>User Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#4f46e5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

const chartStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px",
};
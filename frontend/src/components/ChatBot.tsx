/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { api } from "../services/api";

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    //AUTO SCROLL
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await api.post("/chat", { message: input });

            // simulate typing delay
            setTimeout(() => {
                const botMsg = { sender: "bot", text: res.data.reply };
                setMessages((prev) => [...prev, botMsg]);
                setLoading(false);
            }, 800);
        } catch {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Server error ❌" },
            ]);
            setLoading(false);
        }
    };

    return (
        <>
            {/*FLOAT BUTTON */}
            <div style={fabStyle} onClick={() => setOpen(!open)}>
                💬
            </div>

            {/*CHAT WINDOW */}
            {open && (
                <div style={chatBoxStyle}>
                    <div style={headerStyle}>
                        AI Assistant
                        <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
                            ✖
                        </span>
                    </div>

                    <div style={messagesStyle}>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    ...bubbleStyle,
                                    alignSelf:
                                        m.sender === "user" ? "flex-end" : "flex-start",
                                    background:
                                        m.sender === "user" ? "#1976d2" : "#f1f1f1",
                                    color: m.sender === "user" ? "#fff" : "#000",
                                }}
                            >
                                {m.text}
                            </div>
                        ))}

                        {/*TYPING INDICATOR */}
                        {loading && (
                            <div style={{ ...bubbleStyle, background: "#f1f1f1" }}>
                                <TypingDots />
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/*INPUT */}
                    <div style={inputWrapper}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask something..."
                            style={inputStyle}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend} style={sendBtn}>
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

/* 🔥 TYPING ANIMATION */
function TypingDots() {
    return (
        <div style={{ display: "flex", gap: "4px" }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
}

/* 🔥 STYLES */

const fabStyle = {
    position: "fixed" as const,
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
};

const chatBoxStyle = {
    position: "fixed" as const,
    bottom: "80px",
    right: "20px",
    width: "320px",
    height: "420px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
};

const headerStyle = {
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
};

const messagesStyle = {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    overflowY: "auto" as const,
};

const bubbleStyle = {
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "70%",
};

const inputWrapper = {
    display: "flex",
    borderTop: "1px solid #ddd",
};

const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
};

const sendBtn = {
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
};
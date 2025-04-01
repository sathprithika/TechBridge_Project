import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import './Chatbot.css';

const socket = io("http://localhost:5000"); // Backend connection

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null); // For auto-scrolling

    useEffect(() => {
        socket.on("ai_response", (response) => {
            setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
        });

        return () => socket.off("ai_response");
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Auto-scroll
    }, [messages]);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
            socket.emit("user_message", input);
            setInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress} // Enter to send
                    placeholder="Ask something..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;

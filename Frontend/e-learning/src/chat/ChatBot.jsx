import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ChatBot.css";

const API_KEY = "...";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);
    setPrompt("");
    setLoading(true);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setMessages([...newMessages, { role: "ai", content: text }]);
    } catch (err) {
      console.error("Eroare Gemini:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <h2 className="chat-title">Ask our AI anything</h2>

      <div className="chat-wrapper">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role}`}>
              <span>{msg.content}</span>
            </div>
          ))}
          {loading && (
            <div className="message-bubble ai">Prietenul tau scrie...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Ask me anything about your courses"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="chat-input"
          />
          <button onClick={handleSend} className="send-btn" disabled={loading}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

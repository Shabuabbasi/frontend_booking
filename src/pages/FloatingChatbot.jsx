import React, { useState } from "react";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => setOpen(!open);

  return (
    <>
      {/* Floating Chat Button */}
      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#4e8cff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1001,
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          transition: "background-color 0.3s",
        }}
        title="Chat with us"
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3a6ed8")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4e8cff")}
      >
        💬
      </div>

      {/* Chat Window Popup with slide-down animation */}
      <div
        style={{
          position: "fixed",
          top: open ? "100px" : "-600px", // Slide down from -600px to 100px
          right: "20px",
          width: "350px",
          height: "500px",
          backgroundColor: "#000",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          transition: "top 0.4s ease",
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/H111N1NlZHuYwiizxYEAI"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "15px" }}
          title="Chatbot"
        />

        {/* Close Button */}
        <button
          onClick={toggleChat}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 1002,
          }}
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default FloatingChatbot;

import React from 'react';

const Chatbot = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '60px auto 0', // space from top
        height: '80vh', // doesn't take full page
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/H111N1NlZHuYwiizxYEAI"
        width="100%"
        height="100%"
        style={{
          border: 'none',
        }}
        frameBorder="0"
        title="Chatbase Chatbot"
      />
    </div>
  );
};

export default Chatbot;

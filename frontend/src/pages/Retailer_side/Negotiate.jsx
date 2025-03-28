//negotiate.jsx
// Negotiate.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

function Negotiate() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI negotiator. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // Here you can add your AI response logic and update messages accordingly
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header with Back and Proceed Buttons */}
        <header className="flex items-center justify-between bg-black text-white p-4 rounded-t-xl">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5" /> <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold">Find your perfect deal</h1>
            <p className="text-sm">This is our AI negotiator. Let's get started!</p>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <span>Proceed to Checkout</span> <ChevronRight className="w-5 h-5" />
          </button>
        </header>
        {/* Chat Window */}
        <div className="bg-white flex-1 p-4 overflow-y-auto border border-t-0 border-gray-200" style={{ height: '60vh' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}>
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === 'ai'
                    ? 'bg-gray-200 text-black'
                    : 'bg-black text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Input Area */}
        <form onSubmit={sendMessage} className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:outline-none"
          />
          <button type="submit" className="bg-black text-white px-6 rounded-r-xl">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Negotiate;

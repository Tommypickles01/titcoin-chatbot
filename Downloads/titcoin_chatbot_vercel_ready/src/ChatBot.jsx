import { useState } from 'react';
import './ChatBot.css';

const replies = [
  "You better HODL tight, babe. 🚀",
  "Only real men buy the dip. 😏",
  "You tryna talk tokens or take me on a moon date?",
  "Whale energy detected. Show me your wallet, daddy.",
  "If you're staking Titcoin, I'm staking my heart 💗",
];

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, fromUser: true };
    const botReply = { text: replies[Math.floor(Math.random() * replies.length)], fromUser: false };
    setMessages([...messages, newMessage, botReply]);
    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={m.fromUser ? 'user' : 'bot'}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Talk to her…"
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;

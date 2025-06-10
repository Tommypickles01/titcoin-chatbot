import React, { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there. Talk dirty. Or about crypto. Or both." },
  ]);
  const [input, setInput] = useState("");
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const response = await getOpenAIReply(input);
    setMessages([...newMessages, { from: "bot", text: response }]);
    speak(response);
  };

  const getOpenAIReply = async (message) => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a flirty, crypto-obsessed chatbot named Lara who loves Titcoin." },
          { role: "user", content: message },
        ],
      }),
    });
    const data = await res.json();
    return data.choices[0].message.content.trim();
  };

  const speak = (text) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.pitch = 1.1;
    utter.rate = 1;
    synth.speak(utter);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      <div className="w-full max-w-xl mx-auto mt-6">
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-4">Titcoin AI Companion</h1>

        <model-viewer
          src="https://files.catbox.moe/kloybe.glb"
          ar
          auto-rotate
          camera-controls
          style={{ width: "100%", height: "400px" }}
          background-color="#000000"
          exposure="1.0"
        ></model-viewer>

        <div className="bg-gray-900 p-4 rounded-xl mt-4 h-[300px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 ${
                msg.from === "bot" ? "text-pink-400" : "text-green-400 text-right"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 rounded-l bg-gray-800 text-white border border-pink-600"
            placeholder="Ask Lara anything..."
          />
          <button
            onClick={sendMessage}
            className="bg-pink-600 px-4 rounded-r hover:bg-pink-700 border border-l-0 border-pink-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

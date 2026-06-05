import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../Provider/AuthContext.jsx";
import ALLUsers from "../ALLUsers/ALLUsers.jsx";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  console.log(joined);
  const chatEndRef = useRef(null);
  const { student } = useAuth();

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8089/api/v1/chat/all");
      setMessages(res.data);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!joined) return;

    fetchMessages();
  }, [joined]);

  const scrollToBottom = async () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input || !username) return;

    try {
      await axios.post("http://localhost:8089/api/v1/chat/send", {
        sender: username,
        content: input,
      });
      setInput("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (student?.studentname) {
      setUsername(student?.studentname);
    }
  }, [student]);
  return (
    <div className=" h-screen flex  shadow-xl border rounded-lg bg-gray-50">
      {/* Header */}
      <div className="flex-1">
        <ALLUsers></ALLUsers>
      </div>
      <div className="flex-2">
        <div className="bg-blue-500 text-white  p-4 rounded-t-lg text-center font-bold text-lg">
          Chat Room
        </div>

        {/* Join screen */}
        {!joined && (
          <div className="flex flex-col p-4 gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={() => username && setJoined(true)}
            >
              Join Chat
            </button>
          </div>
        )}

        {/* Chat messages */}
        {joined && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === username ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                      msg.sender === username
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {msg.sender}
                    </div>
                    <div className="text-sm">{msg.content}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-50 flex gap-2 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;

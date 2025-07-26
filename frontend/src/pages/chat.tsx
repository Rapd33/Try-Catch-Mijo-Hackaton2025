// src/pages/Chat.tsx
import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = () => {
    if (input.trim() === "") return;

    const newUserMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: "Gracias por tu mensaje. Estamos aquí para ayudarte ❤️",
        sender: "bot",
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#f7f7f8] text-gray-900">
      {/* ASIDE izquierdo estilo ChatGPT */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col p-4">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Historial</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">Conversación 1</li>
          <li className="hover:text-blue-600 cursor-pointer">Conversación 2</li>
        </ul>
        <div className="mt-auto pt-4 border-t text-xs text-gray-400">
          Try-Catch-Mijo v1.0
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="px-6 py-4 text-lg font-medium text-gray-800 border-b shadow-sm bg-white">
          Chat de Ayuda
        </header>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl px-5 py-3 rounded-2xl transition shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p className="text-xs mt-1 text-right opacity-60">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white px-6 py-4 border-t sticky bottom-0 z-10">
          <div className="flex items-center gap-2 bg-[#f0f0f1] rounded-full px-4 py-2 shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
            />
            <button
              onClick={handleSend}
              className="p-2 text-blue-600 hover:text-blue-800 transition"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;


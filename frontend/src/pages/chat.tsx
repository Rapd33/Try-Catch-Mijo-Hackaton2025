// src/pages/Chat.tsx
import { useState, useRef, useEffect, use } from "react";
import { FiSend } from "react-icons/fi";

type mensaje = {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
};

async function fetchChatResponse(userMessage: string): Promise<string> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const chatEndpoint = import.meta.env.VITE_CHAT_ENDPOINT;

  console.log(userMessage);
  
  
  const response = await fetch(`${apiUrl}${chatEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.ok) {
    throw new Error("Error en la respuesta del servidor");
  }

  const data = await response.json();
  return data.reply;
}

const Chat = () => {
  const [mensajes, setmensajes] = useState<mensaje[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mensajesEndRef = useRef<HTMLDivElement>(null);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = input.trim();
    const newUserMsg: mensaje = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      time: getTime(),
    };

    setmensajes((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Llamar a la función fetchChatResponse
      const botResponse = await fetchChatResponse(userMessage);
      
      const botMsg: mensaje = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        time: getTime(),
      };
      setmensajes((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error detallado:", error);
      console.log("API URL:", import.meta.env.VITE_API_URL);
      console.log("Chat Endpoint:", import.meta.env.VITE_CHAT_ENDPOINT);
      console.log("URL completa:", `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_CHAT_ENDPOINT}`);
      
      // Mensaje de error para el usuario
      const errorMsg: mensaje = {
        id: Date.now() + 1,
        text: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}. Revisa la consola para más detalles.`,
        sender: "bot",
        time: getTime(),
      };
      setmensajes((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

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
          {import.meta.env.VITE_APP_NAME} v1.0
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
          {mensajes.map((msg) => (
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
          
          {/* Indicador de "escribiendo" */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-2xl px-5 py-3 rounded-2xl bg-white text-gray-900 rounded-bl-md shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={mensajesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white px-6 py-4 border-t sticky bottom-0 z-10">
          <div className="flex items-center gap-2 bg-[#f0f0f1] rounded-full px-4 py-2 shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder={isLoading ? "Esperando respuesta..." : "Escribe tu mensaje..."}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || input.trim() === ""}
              className="p-2 text-blue-600 hover:text-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
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


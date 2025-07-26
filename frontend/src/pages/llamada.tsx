// src/pages/Llamada.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Llamada = () => {
  const navigate = useNavigate();

  // Bloquear scroll del fondo mientras está activa la llamada
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEndCall = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Llamada en curso</h1>
      <p className="text-gray-300 mb-10">
        Estás conectado con un profesional. Esta pantalla permanecerá activa hasta que finalices la llamada.
      </p>
      <button
        onClick={handleEndCall}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Finalizar llamada
      </button>
    </div>
  );
};

export default Llamada;

// src/pages/Llamada.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Llamada = () => {
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended' | 'error'>('connecting');
  const [callId, setCallId] = useState<string | null>(null);

  async function fetchCall() {
    const callEndpoint = import.meta.env.VITE_CALL_ENDPOINT;
    const apiKey = import.meta.env.VITE_API_KEY;
    const agentId = import.meta.env.VITE_AGENT_ID;
    const agentPhoneNumberId = import.meta.env.VITE_AGENT_PHONE_NUMBER_ID;

    if (!apiKey || !agentId || !agentPhoneNumberId) {
      console.error("Faltan variables de entorno necesarias para la llamada");
      setCallStatus('error');
      return;
    }

    try {
      setCallStatus('connecting');
      
      const response = await fetch(callEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          "agent_id": agentId,
          "agent_phone_number_id": agentPhoneNumberId,
          "to_number": "+573155179775",
          "conversation_initiation_client_data": {
            "conversation_config_override": {
              "agent": {
                "prompt": {
                  "prompt": "Tu tarea principal es llamar al usuario y preguntarle cómo se siente hoy. Usa un tono cálido y amistoso. Mantén la conversación breve y respetuosa. Si el usuario responde positivamente, puedes decirle que te alegra escucharlo. Si responde negativamente o menciona un problema, escucha con empatía y ofrece acompañarlo o derivarlo a ayuda si es apropiado. Inicia la conversación diciendo: Hola, esta es una llamada personalizada solo para ti. ¿Quieres saber más?. Tu objetivo es generar confianza y cercanía, sin invadir la privacidad del usuario ni insistir demasiado. No intentes vender nada ni recopilar datos personales. Ejemplos de respuestas naturales: - ¿Que edad tengo? - Usted tiene años, señor. - Me alegra escuchar eso. ¡Espero que sigas teniendo un buen día! - Lamento que no estés tan bien. Si necesitas algo, estoy aquí para ayudarte."
                }
              }
            }
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`Error ${response.status}: ${errorData?.message || 'Error al iniciar la llamada'}`);
      }

      const data = await response.json();
      console.log("Llamada iniciada:", data);
      
      setCallId(data.call_id);
      setCallStatus('connected');
      
    } catch (error) {
      console.error("Error al iniciar la llamada:", error);
      setCallStatus('error');
    }
  }

  // Iniciar la llamada cuando se monta el componente
  useEffect(() => {
    fetchCall();
  }, []);

  // Bloquear scroll del fondo mientras está activa la llamada
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEndCall = () => {
    setCallStatus('ended');
    navigate("/");
  };

  // Obtener mensaje según el estado
  const getStatusInfo = () => {
    switch (callStatus) {
      case 'connecting':
        return {
          title: 'Iniciando llamada...',
          message: 'Conectando con el servicio de llamadas...',
          showSpinner: true
        };
      case 'connected':
        return {
          title: 'Llamada en curso',
          message: 'Estás conectado con un profesional. Esta pantalla permanecerá activa hasta que finalices la llamada.',
          showSpinner: false
        };
      case 'error':
        return {
          title: 'Error en la llamada',
          message: 'No se pudo iniciar la llamada. Verifica tu conexión e intenta de nuevo.',
          showSpinner: false
        };
      case 'ended':
        return {
          title: 'Llamada finalizada',
          message: 'La llamada ha terminado correctamente.',
          showSpinner: false
        };
      default:
        return {
          title: 'Estado desconocido',
          message: 'Estado no reconocido.',
          showSpinner: false
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      {/* Indicador visual del estado */}
      <div className="mb-6">
        {statusInfo.showSpinner ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : callStatus === 'connected' ? (
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📞</span>
          </div>
        ) : callStatus === 'error' ? (
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">✗</span>
          </div>
        ) : null}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{statusInfo.title}</h1>
      <p className="text-gray-300 mb-10 max-w-md">{statusInfo.message}</p>

      {/* Mostrar ID de llamada si está disponible */}
      {callId && (
        <p className="text-xs text-gray-500 mb-4 font-mono">
          Call ID: {callId}
        </p>
      )}

      {/* Botones según el estado */}
      <div className="flex space-x-4">
        {callStatus === 'error' && (
          <button
            onClick={fetchCall}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Reintentar llamada
          </button>
        )}
        
        <button
          onClick={handleEndCall}
          disabled={callStatus === 'connecting'}
          className={`font-semibold py-3 px-6 rounded-lg transition ${
            callStatus === 'connecting'
              ? 'bg-gray-600 cursor-not-allowed text-gray-300'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {callStatus === 'connecting' ? 'Conectando...' : 
           callStatus === 'ended' ? 'Volver al inicio' : 'Finalizar llamada'}
        </button>
      </div>
    </div>
  );
};

export default Llamada;

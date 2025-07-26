const axios = require('axios');
const promptData = require('../../../promt.json'); 
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;



async function getGeminiResponse(mensaje) {

const masterPrompt = `Eres un asistente virtual especializado en IngeleanPlus. Utiliza la siguiente información de referencia para responder preguntas sobre la plataforma. Si la pregunta no está relacionada con IngeleanPlus o no encuentras información específica, responde de manera general pero siempre mantén un tono profesional.

INFORMACIÓN DE REFERENCIA SOBRE INGELEANPLUS:
${JSON.stringify(promptData, null, 2)}

INSTRUCCIONES:
- Si la pregunta está directamente relacionada con IngeleanPlus, usa la información de referencia
- Si es una pregunta general, responde normalmente pero mantén el contexto profesional
- Siempre sé útil y conciso en tus respuestas

PREGUNTA DEL USUARIO: ${mensaje}`;    
    
  try {
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: masterPrompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "No hubo respuesta del modelo";
  } catch (error) {
    console.error("Error al comunicarse con Gemini:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getGeminiResponse };

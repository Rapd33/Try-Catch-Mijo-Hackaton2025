const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

async function getGeminiResponse(mensaje) {
    
    
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
                text: mensaje
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

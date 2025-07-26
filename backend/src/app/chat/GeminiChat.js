const { getGeminiResponse } = require("../../infrastructura/gemini/gemini")

// Metodo para hacer uso de la Ia(Gemini)
async function ChatCasoUso(userMessage) {
    try {
        const respuesta = await getGeminiResponse(userMessage);
        return respuesta;
    } catch (error) {
        console.error("Error en ChatCasoUso:", error);
        throw new Error("No se pudo obtener una respuesta del modelo");
    }
    
}

module.exports = { ChatCasoUso };
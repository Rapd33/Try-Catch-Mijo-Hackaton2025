const { ChatCasoUso } = require("../../app/chat/GeminiChat");

async function sendMessage(req, res) {
  const { message, mensaje,  } = req.body;
  console.log("Mensaje recibido:", message || mensaje); // Acepta ambos nombres
   
  const userMessage = message || mensaje; // Acepta ambos nombres

  if (!userMessage) {
    return res.status(400).json({ error: "Mensaje requerido" });
  }

  try {
    const aiReply = await ChatCasoUso(userMessage);
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Error en sendMessage:", err);
    res.status(500).json({ error: "Error generando respuesta" });
  }
}

module.exports = { sendMessage };
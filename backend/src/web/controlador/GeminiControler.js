const { ChatCasoUso } = require("../../app/chat/GeminiChat");

async function sendMessage(req, res) {
  const { mensaje } = req.body; 

  try {
    const aiReply = await ChatCasoUso(mensaje);
    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando respuesta" });
  }
}

module.exports = { sendMessage };
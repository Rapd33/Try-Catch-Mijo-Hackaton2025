const express = require("express");
const { sendMessage } = require("../controlador/GeminiControler");


const router = express.Router();

router.post("/chat/send", sendMessage);

module.exports = router;

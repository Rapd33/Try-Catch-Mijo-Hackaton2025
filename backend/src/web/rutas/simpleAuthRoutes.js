const express = require('express');
const simpleAuthController = require('../controlador/SimpleAuthController');
const { authMiddleware } = require('../middleware/simpleAuthMiddleware');

const router = express.Router();

// Rutas públicas
router.post('/register', simpleAuthController.register);
router.post('/login', simpleAuthController.login);

// Rutas protegidas
router.get('/profile', authMiddleware, simpleAuthController.profile);
router.get('/verify', authMiddleware, simpleAuthController.verify);

module.exports = router;

// routes/authRoutes.js
const express = require('express');
const { register, login, resetPassword } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário (terapeuta ou paciente)
 *     description: Endpoint para registro de usuários, criando um novo terapeuta ou paciente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [therapist, patient]
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro no registro (usuário já existe ou dados inválidos)
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Endpoint para autenticação de usuários e geração de token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, token JWT gerado
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', login);



router.post('/reset-password', resetPassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Rota POST
router.post('/users', async (req, res) => {
  const { name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name } = req.body;
  console.log('Requisição recebida:', req.body);
  try {
    const result = await pool.query(
      'INSERT INTO users (name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name || null]
    );
    console.log('Usuário inserido:', result.rows[0]);
    res.status(201).json(result.rows[0]); // Resposta imediata com status 201
  } catch (err) {
    console.error('Erro no backend:', err);
    res.status(500).json({ error: err.message });
  }
});

// Rota GET
router.get('/users', async (req, res) => {
  console.log('Requisição GET recebida');
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log('Usuários retornados:', result.rows);
    res.status(200).json(result.rows); // Resposta imediata com status 200
  } catch (err) {
    console.error('Erro ao listar:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
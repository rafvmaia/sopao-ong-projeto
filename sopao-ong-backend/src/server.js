const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
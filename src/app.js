const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db/connection-mongodb')
const authRoutes = require('./routes/v1/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectToMongoDB();

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});
app.use('/api/v1/auth', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404).json({ message: error.message });
  });


module.exports = app;
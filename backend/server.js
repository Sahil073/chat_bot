// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateRohitResponse } = require('./response');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await generateRohitResponse(message);
    res.json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
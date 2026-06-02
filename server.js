import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import checkSafetyHandler from './api/check-safety.js';
import analyzeTextHandler from './api/analyze-text.js';

const app = express();
app.use(express.json());

app.post('/api/check-safety', (req, res) => {
  console.log('📍 POST /api/check-safety', req.body);
  checkSafetyHandler(req, res);
});

app.post('/api/analyze-text', (req, res) => {
  console.log('📍 POST /api/analyze-text', req.body);
  analyzeTextHandler(req, res);
});

app.listen(3001, () => {
  console.log('🚀 API Server running on http://localhost:3001');
});

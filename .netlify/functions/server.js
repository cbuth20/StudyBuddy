'use strict';
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const router = express.Router();

const allowedOrigins = [process.env.REDIRECT_SIGN_IN, 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
});

router.post('/api/open-question', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });
    if (response && response.choices && response.choices[0]) {
      const content = response.choices[0].message.content.trim();
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.json({ response: content });
    } else {
      res.status(500).json({ error: 'Invalid response format' });
    }
  } catch (error) {
    console.error('Error with open question:', error.response ? error.response.data : error.message);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/evaluate-code', async (req, res) => {
  const { code, language, problem } = req.body;

  // Construct a prompt to evaluate the code against the problem description and examples
  const evaluationPrompt = `
  Evaluate the following code in ${language}:
  
  Code:
  ${code}

  Problem description:
  ${problem.description}

  Example to test:
  ${problem.example}

  Please check if the code correctly solves the problem. Provide feedback and the result of running the provided example.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: evaluationPrompt }],
      max_tokens: 500,
    });
    if (response && response.choices && response.choices[0]) {
      const content = response.choices[0].message.content.trim();
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.json({ message: content });
    } else {
      res.status(500).json({ error: 'Invalid response format' });
    }
  } catch (error) {
    console.error('Error with code evaluation:', error.response ? error.response.data : error.message);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/config', (req, res) => {
  res.json({
    userPoolId: process.env.USER_POOL_ID,
    userPoolClientId: process.env.USER_POOL_CLIENT_ID,
    redirectSignIn: process.env.REDIRECT_SIGN_IN,
  });
});

app.use(bodyParser.json());

// Handle preflight requests
router.options('*', cors(corsOptions));

app.use(cors(corsOptions));
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

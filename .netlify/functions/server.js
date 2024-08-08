'use strict';
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const router = express.Router();


const corsOptions = {
    origin: 'https://studybuddy-techtea.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
app.use(bodyParser.json());
app.use(cors(corsOptions));

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
      res.json({ response: content });
    } else {
      res.status(500).json({ error: 'Invalid response format' });
    }
  } catch (error) {
    console.error('Error with open question:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/config', (req, res) => {
  res.json({
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
  });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

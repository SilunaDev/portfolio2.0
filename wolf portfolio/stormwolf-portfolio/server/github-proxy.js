// npm install express node-fetch@2 dotenv cors
const express = require('express');
const fetch = require('node-fetch'); // v2 for CommonJS
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // set this in .env (see below)

if (!GITHUB_TOKEN) {
  console.error('Missing GITHUB_TOKEN in environment!');
  process.exit(1);
}

// Return authenticated user's repos (includes private repos)
app.get('/api/github/repos', async (req, res) => {
  try {
    const per_page = req.query.per_page || 50;
    const page = req.query.page || 1;
    const response = await fetch(`https://api.github.com/user/repos?per_page=${per_page}&page=${page}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

app.listen(PORT, () => console.log(`GitHub proxy listening on http://localhost:${PORT}/api/github/repos`));
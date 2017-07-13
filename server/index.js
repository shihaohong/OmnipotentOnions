'use strict';
/* UNCOMMENT WHEN IMPLEMENTING OAUTH */
// const app = require('./app');
// const db = require('../db');
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.port || 3000;

app.use(express.static('./'));
app.use(express.static(path.join(__dirname, '/../client/src')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/src/index.html'));
});

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

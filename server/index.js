'use strict';
const app = require('./app');
const db = require('../db');

const PORT = process.env.port || 3000;  
// Might wanna change ^^^^^ to config.port, but then you must require('config')
console.log('NODE_ENV: ', process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`connectHere app listening on port ${PORT}!`);
});

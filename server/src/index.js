const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userAuth = require('./routes/user.route');

app.use('/api/user',userAuth);

module.exports = app;
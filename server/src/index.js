const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "https://portyours.vercel.app", // explicitly allow frontend
  credentials: true                // allow cookies/auth headers
}));

app.use(express.json());

const userAuth = require('./routes/user.route');
const portfolioRoutes = require('./routes/portfolio.routes');

app.use('/api/user',userAuth);
app.use('/api/portfolio', portfolioRoutes);

module.exports = app;
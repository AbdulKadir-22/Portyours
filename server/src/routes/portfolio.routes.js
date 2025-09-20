const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/auth.middleware');
const { 
  createOrUpdatePortfolio, 
  getPortfolio,
  getPublicPortfolio // ✨ Import the new controller
} = require('../controller/portfolio.controller');

// --- Public Routes ---

// ✨ NEW ROUTE: Get a portfolio by username
// ROUTE: /api/portfolio/johndoe
router.get('/:username', getPublicPortfolio);


// --- Private (Authenticated) Routes ---

// Get the logged-in user's own portfolio data
// ROUTE: /api/portfolio/
router.get('/', requireAuth, getPortfolio);

// Create or update the logged-in user's portfolio
// ROUTE: /api/portfolio/
router.post('/', requireAuth, createOrUpdatePortfolio);

module.exports = router;
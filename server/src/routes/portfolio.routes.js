const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/auth.middleware');
const { 
    createOrUpdatePortfolio, 
    getPortfolio 
} = require('../controller/portfolio.controller');

// ROUTE: /api/portfolio/
router.post('/', requireAuth, createOrUpdatePortfolio);

// ROUTE: /api/portfolio/
router.get('/', requireAuth, getPortfolio);


module.exports = router;

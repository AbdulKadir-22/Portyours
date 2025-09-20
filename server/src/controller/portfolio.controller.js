const portfolioService = require('../services/portfolio.services');
const User = require('../models/user.model'); // ✨ Import User model

/**
 * @desc    Create or update a portfolio for the logged-in user.
 * @route   POST /api/portfolio
 * @access  Private
 */
const createOrUpdatePortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolioData = req.body;

    const updatedPortfolio = await portfolioService.upsertPortfolio(userId, portfolioData);

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error in createOrUpdatePortfolio controller:', error);
    res.status(500).json({ error: 'Server error while updating portfolio.' });
  }
};

/**
 * @desc    Get the portfolio for the logged-in user.
 * @route   GET /api/portfolio
 * @access  Private
 */
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolio = await portfolioService.getPortfolioByUserId(userId);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found for this user.' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error in getPortfolio controller:', error);
    res.status(500).json({ error: 'Server error while fetching portfolio.' });
  }
};

/**
 * ✨ NEW CONTROLLER
 * @desc    Get a portfolio by a user's username.
 * @route   GET /api/portfolio/:username
 * @access  Public
 */
const getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        // 1. Find the user by their username
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Find the portfolio using the user's ID
        const portfolio = await portfolioService.getPortfolioByUserId(user._id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found for this user.' });
        }
        
        // 3. Return the portfolio
        res.status(200).json(portfolio);

    } catch (error) {
        console.error('Error in getPublicPortfolio controller:', error);
        res.status(500).json({ error: 'Server error while fetching public portfolio.' });
    }
};

module.exports = {
  createOrUpdatePortfolio,
  getPortfolio,
  getPublicPortfolio, // ✨ Export the new controller
};
const Portfolio = require('../models/portfolio.model');

/**
 * Finds a portfolio by user ID and updates it, or creates a new one if it doesn't exist.
 * @param {string} userId - The ID of the user.
 * @param {object} portfolioData - The portfolio data from the request body.
 * @returns {Promise<object>} The created or updated portfolio document.
 */
const upsertPortfolio = async (userId, portfolioData) => {
  // The logic to find and update/create the portfolio
  return await Portfolio.findOneAndUpdate(
    { userId: userId },
    { ...portfolioData, userId: userId },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

/**
 * Finds a portfolio by the user's ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object|null>} The portfolio document or null if not found.
 */
const getPortfolioByUserId = async (userId) => {
  return await Portfolio.findOne({ userId: userId });
};

module.exports = {
  upsertPortfolio,
  getPortfolioByUserId,
};

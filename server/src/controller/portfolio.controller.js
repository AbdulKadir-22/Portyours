// The controller now imports the service instead of the model
const portfolioService = require('../services/portfolio.services');

/**
 * @desc    Create a new portfolio or update an existing one for the logged-in user.
 * @route   POST /api/portfolio
 * @access  Private
 */
const createOrUpdatePortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolioData = req.body;

    // Call the service to handle the business logic
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

    // Call the service to get the data
    const portfolio = await portfolioService.getPortfolioByUserId(userId);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found for this user.' });
    }

    res.status(200).json(portfolio);
  } catch (error)
  {
    console.error('Error in getPortfolio controller:', error);
    res.status(500).json({ error: 'Server error while fetching portfolio.' });
  }
};

module.exports = {
  createOrUpdatePortfolio,
  getPortfolio,
};

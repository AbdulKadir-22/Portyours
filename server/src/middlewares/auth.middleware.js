const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = async (req, res, next) => {
  // Get the token from the Authorization header
  const { authorization } = req.headers;

  // Header should look like: "Bearer tokenhere"
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // Verify token with secret
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Attach the user ID to the request for downstream use
    req.user = await User.findById(_id).select('_id');

    next(); // Let them pass
  } catch (error) {
    res.status(401).json({ error: 'Request not authorized' });
  }
};

module.exports = requireAuth;

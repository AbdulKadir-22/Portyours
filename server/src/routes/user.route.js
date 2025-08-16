const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/auth.middleware');
const { loginUser, signupUser, getProfile } = require('../controller/user.controller');
const { getImageKitAuth } = require('../controller/user.controller');

router.post('/login', loginUser);
router.get('/profile', requireAuth, getProfile);
router.post('/signup', signupUser);
router.get('/imagekit-auth', getImageKitAuth);


module.exports =  router;
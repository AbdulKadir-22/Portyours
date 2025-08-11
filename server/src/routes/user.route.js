const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/auth.middleware');
const { loginUser, signupUser, getProfile } = require('../controller/user.controller');

router.post('/login', loginUser);
router.get('/profile', requireAuth, getProfile);
router.post('/signup', signupUser);


module.exports =  router;
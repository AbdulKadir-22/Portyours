const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const ImageKit = require('imagekit');

const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '7d'})
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


const getImageKitAuth = (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
};

const loginUser = async (req, res) => {
  const {email,password} = req.body

  try {
    const user = await User.login(email,password)

    const token = createToken(user._id)

    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};


//signup user
const signupUser = async (req, res) => {
  // ✨ FIX: Destructure the 'username' from the request body
  const { firstname, lastname, username, email, password } = req.body;

  try {
    // ✨ FIX: Pass the 'username' to the signup method in the correct order
    const user = await User.signup(firstname, lastname, username, email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { loginUser, signupUser, getProfile,getImageKitAuth };

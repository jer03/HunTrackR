const express = require('express');
const { register, login, profile, forgotPassword, resetPassword } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.use(auth); // protect everything below
router.get('/profile', profile);

module.exports = router;

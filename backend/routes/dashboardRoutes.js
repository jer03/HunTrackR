const express = require('express');
const { getSummary } = require('../controllers/dashBoardController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(auth);

// Routes
router.get('/', getSummary);

module.exports = router;

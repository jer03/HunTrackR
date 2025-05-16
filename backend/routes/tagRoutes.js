const express = require('express');
const { getTags, createTag, removeTag } = require('../controllers/tagController');

const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(auth);

// Routes
router.get('/', getTags);
router.post('/', createTag);
router.delete('/:id', removeTag);

module.exports = router;

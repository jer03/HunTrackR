const express = require('express');
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('../controllers/applicationController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(auth);

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

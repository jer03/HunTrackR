const express = require('express');
const { getByApplication, create: createDoc, remove: removeDoc } = require('../controllers/documentController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.use(auth);

router.get('/application/:appId', getByApplication);
router.post('/application/:appId', upload.single('file'), createDoc);
router.delete('/:id', removeDoc);

module.exports = router;

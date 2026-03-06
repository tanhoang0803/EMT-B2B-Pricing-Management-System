const express = require('express');
const router = express.Router();
const c = require('../controllers/customerController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/groups', c.getAllGroups);
router.post('/groups', c.createGroup);

router.get('/', c.getAll);
router.post('/', c.create);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;

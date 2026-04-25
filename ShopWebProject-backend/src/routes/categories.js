const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/CategoryController');

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getId);
router.delete('/:id', categoryController.delete);
router.put('/:id', categoryController.update);

module.exports = router;

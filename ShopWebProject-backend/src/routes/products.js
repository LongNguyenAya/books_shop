const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const upload = require('../app/middlewares/UploadMiddleware');

router.post('/', upload.single('image'), productController.create);
router.get('/', productController.getAll);
router.get('/total', productController.totalProducts);
router.get('/:id', productController.getId);
router.delete('/:id', productController.delete);
router.put('/:id', productController.update);

module.exports = router;

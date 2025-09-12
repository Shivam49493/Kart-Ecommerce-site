import express from 'express';
import { addProduct } from '../controllers/productController.js';
import { uploadProductImages } from '../middleware/multer.js';
import { listProducts, deleteProduct } from '../controllers/productController.js';
import adminAuth  from '../middleware/adminAuth.js';
const router = express.Router();

router.post('/addproduct', uploadProductImages, addProduct);
router.get('/list', listProducts);
router.post('/delete/:id', adminAuth, deleteProduct);

export default router;
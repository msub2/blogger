import express from 'express';
const router = express.Router();
import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory
} from '../controllers/category-controller.js';

// validators
import { runValidation } from '../validators/index.js';
import { categoryCreateValidator } from '../validators/category-validator.js';
import {
  requireSignin,
  adminMiddleWare
} from '../controllers/auth-controller.js';

router.post(
  '/category',
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createCategory
);
router.get('/categories', getCategories);
router.get('/category/:slug', getCategory);
router.delete(
  '/category/:slug',
  requireSignin,
  adminMiddleWare,
  removeCategory
);

export default router;

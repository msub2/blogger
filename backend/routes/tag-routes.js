import express from 'express';
const router = express.Router();

// controllers
import {
  createTag,
  getTags,
  getTag,
  removeTag
} from '../controllers/tag-controller.js';

// validators
import { runValidation } from '../validators/index.js';
import { tagCreateValidator } from '../validators/tag-validator.js';
import {
  requireSignin,
  adminMiddleWare
} from '../controllers/auth-controller.js';

router.post(
  '/tag',
  tagCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createTag
);
router.get('/tags', getTags);
router.get('/tag/:slug', getTag);
router.delete('/tag/:slug', requireSignin, adminMiddleWare, removeTag);

export default router;

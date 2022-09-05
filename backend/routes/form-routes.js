import express from 'express';
const router = express.Router();
import {
  contactForm,
  contactBlogAuthorForm
} from '../controllers/form-controller.js';

// validators
import { runValidation } from '../validators/index.js';
import { contactFormValidator } from '../validators/form-validator.js';

router.post('/contact', contactFormValidator, runValidation, contactForm);
router.post(
  '/contact-blog-author',
  contactFormValidator,
  runValidation,
  contactBlogAuthorForm
);

export default router;

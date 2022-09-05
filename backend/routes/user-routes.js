import express from 'express';
const router = express.Router();
import {
  requireSignin,
  adminMiddleWare,
  authMiddleWare
} from '../controllers/auth-controller.js';
import {
  read,
  publicProfile,
  updateProfile,
  uploadProfilePhoto
} from '../controllers/user-controller.js';

router.get('/user/profile', requireSignin, authMiddleWare, read);
router.get('/user/:username', publicProfile);
router.put('/user/update', requireSignin, authMiddleWare, updateProfile);
router.get('/user/photo/:username', uploadProfilePhoto);

export default router;
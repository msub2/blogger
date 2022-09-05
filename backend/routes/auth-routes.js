import express from 'express';
const router = express.Router();
import {
  preSignup,
  signup,
  signin,
  signout,
  requireSignin,
  forgotPassword,
  resetPassword,
  googleLogin
} from '../controllers/auth-controller.js';

// validators
import { runValidation } from '../validators/index.js'
import {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '../validators/auth-validator.js';

// if validation is passed, execute the code in signup and signin controllers
router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
router.post('/signup', signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// *** GOOGLE LOGIN ****
router.post('/google-login', googleLogin);

// the requireSignin middleware makes the user available in the request object by default
// router.get('/secret', requireSignin, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });

export default router;

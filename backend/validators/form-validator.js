import { check } from 'express-validator';

const contactFormValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('message')
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage('Message must be at least 20 characters long')
];

export { contactFormValidator }
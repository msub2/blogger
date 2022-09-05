import { check } from 'express-validator';

const tagCreateValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
];

export { tagCreateValidator }
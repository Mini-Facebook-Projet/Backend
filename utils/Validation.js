
const { body, validationResult } = require('express-validator');

const signupValidation = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { signupValidation, validate };

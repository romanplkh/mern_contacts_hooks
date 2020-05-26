const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!"),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!"),
  check("password", "password should be at least 6 chars").trim().isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

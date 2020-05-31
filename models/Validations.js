const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long"),
  check("email", "Invalid email address!").trim().normalizeEmail().notEmpty(),
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

exports.vaildateLogin = [
  check("email", "Invalid email address").trim().notEmpty(),
  check("password", "Password is required").trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

exports.validateCreateContact = [
  check("name", "Name is required").trim().notEmpty(),
  check("email", "Invalid email address").trim().isEmail(),
  check("phone", "Phone is invalid")
    .optional({ checkFalsy: true })
    .isMobilePhone("en-CA"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

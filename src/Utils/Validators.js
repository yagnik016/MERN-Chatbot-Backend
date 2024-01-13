import { body, validationResult } from "express-validator";

export const Validate = (validations = []) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    return next();
  };
};

export const SignupValidator = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long!"),
  body("email").isEmail().withMessage("Must be a valid email address").trim(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

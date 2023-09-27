const { check, validationResult } = require("express-validator");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Passsword is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password should be between 8 to 20 characters"),
];

exports.validatePassword = [
  check("password")
    .not()
    .isEmpty()
    .withMessage("Passsword is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password should be between 8 to 20 characters"),
];


exports.signInValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Passsword is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password should be between 8 to 20 characters"),
]

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || !userId.trim())
    return sendError(res, "Invalid Request!");
  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken) return sendError(res, "Unauthorized, Invalid Request!");

  const matched = resetToken.compareToken(token);

  if (!matched) return sendError(res, "Unauthorized, Invalid Request!");

  req.resetToken = resetToken;
  next();
};

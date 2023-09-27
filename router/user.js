const express = require("express");
const {
  create,
  verifyEmail,
  resendOTP,
  forgotPassword,
  sendResetPasswordStatus,
  resetPassword,
  signin,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  isValidPassResetToken,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const router = express.Router();


router.post("/create", userValidator, validate, create);

router.post("/sign-in", signInValidator, validate, signin);

router.post("/verify-email", verifyEmail);

router.post("/resend-otp", resendOTP);

router.post("/forgot-password", forgotPassword);

router.post(
  "/verify-reset-token",
  isValidPassResetToken,
  validatePassword,
  validate,
  sendResetPasswordStatus
);

router.post("/reset-password", isValidPassResetToken, resetPassword);

module.exports = router;

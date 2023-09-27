const express = require("express");
const { create, verifyEmail, resendOTP } = require("../controllers/user");
const {userValidator,validate}=require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  userValidator,validate,
  create
);

router.post(
  "/verify-email",
  verifyEmail
)

router.post(
  "/resend-otp",
  resendOTP
)
module.exports = router;

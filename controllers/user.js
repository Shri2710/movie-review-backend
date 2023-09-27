const User = require("../models/user");
const EmailVerificationToken = require("../models/email-verification-token");
const { isValidObjectId } = require("mongoose");
const { generateOTP, geenrateMailTransport } = require("../utils/mail");
const { sendError } = require("../utils/helper");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const oldUser = User.findOne({ email });

    if (oldUser.email) {
      return sendError(res,"User Already exist");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    //generate 6 digits OTP
    let OTP = generateOTP();
    //store the OTP in the dataBase
    const newEmailVerificationToken = new EmailVerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    await newEmailVerificationToken.save();
    //send the OTP to the user

    var transport = geenrateMailTransport();

    transport.sendMail({
      from: "moviereview@support.com",
      to: newUser.email,
      subject: "Email Verification",
      html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `,
    });

    res.status(201).json({
      message:
        "Please verify your email. OTP has been sent to your email account !",
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res,"Invalid User");

  const user = await User.findById(userId);

  if (!user) return sendError(res,"User not found",404);

  if (user.isVerified) return sendError(res,"User is already verified");

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return sendError(res,"token not found");

  const isMatch = await token.compareToken(OTP);

  if (!isMatch) return sendError(res,"Wrong OTP");

  user.isVerified = true;

  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = geenrateMailTransport();

  transport.sendMail({
    from: "moviereview@support.com",
    to: user.email,
    subject: "Welcome Email",
    html: "<h1>Welcome to our app and thanks for choosinig us</h1>",
  });

  res.json({ message: "Your email is verified" });
};

exports.resendOTP = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return sendError(res,"User not found",404);

  if (user.isVerified)
    return sendError(res,"User is already verified");

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (token) return sendError(res,"You can request OTP only after one hour");

  try {
    let OTP = generateOTP();
    //store the OTP in the dataBase
    const newEmailVerificationToken = new EmailVerificationToken({
      owner: userId,
      token: OTP,
    });
    await newEmailVerificationToken.save();
    //send the OTP to the user

    var transport = geenrateMailTransport();

    transport.sendMail({
      from: "moviereview@support.com",
      to: user.email,
      subject: "Email Verification",
      html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `,
    });

    res.status(201).json({
      message:
        "Please verify your email. OTP has been sent to your email account !",
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

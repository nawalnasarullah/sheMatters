import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/emailService.js";

export default class Auth {

  async signUp(req, res, next) {
    const user = req.body;
  
    try {
  
      user.password = await bcrypt.hash(user.password, 10);
      
      await User.create(user);
  
      res.json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  

  async login(req, res, next) {
    const body = req.body;

    if (!body.email) return next(new Error("Provide the email"));
    if (!body.password) return next(new Error("Provide the password"));

    const user = await User.findOne({ email: body.email });

    if (user === null) return next(new Error("This user is not registered"));

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isPasswordMatched) return next(new Error("Invalid password"));

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    try {
      res
        .cookie("auth_token", token, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
        })
        .json({
          success: true,
          message: "User logged in successfully",
          token,
          user
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {

    console.log('logout was called');
    
    try {
      res
        .cookie("auth_token", null, { expiresIn: Date().now })
        .json({
          success: true,
          // token,
          message: "You are logged out"
        });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    const { email } = req.body;
    if (!email) return next(new Error("Please provide an email"));
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Email not registered"));

    const token = jwt.sign({ id: user._id, email: user.email,type: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.CLIENT_URL}/resetPassword?token=${token}`;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(user.email, resetLink);
    

    res.json({
      success: true,
      message: "Password reset link sent to your email",
  });
  }

  async resetPassword(req, res, next) {
    console.log("Received request to reset password:", req.body);
  const { token, newPassword } = req.body;

  if (!newPassword) return next(new Error("New password is required"));

  try {
    const { id } = req.decoded; // Use decoded data from middleware

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return next(new Error("Invalid token or user not found"));

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
  }
}

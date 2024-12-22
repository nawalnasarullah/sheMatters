import { Psychologist } from "../models/psychologist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/emailService.js";

export default class Auth {

  async signUp(req, res, next) {
    console.log("signUp was called");
    
    const psychologist = req.body;
  
  
    try {
  
      psychologist.password = await bcrypt.hash(psychologist.password, 10);
      
      await Psychologist.create(psychologist);
  
      res.json({
        success: true,
        message: "Psychologist registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  

  async login(req, res, next) {
    const body = req.body;

    if (!body.email) return next(new Error("Provide the email"));
    if (!body.password) return next(new Error("Provide the password"));

    const psychologist = await Psychologist.findOne({ email: body.email });

    if (psychologist === null) return next(new Error("This psychologist is not registered"));

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      psychologist.password
    );

    if (!isPasswordMatched) return next(new Error("Invalid password"));

    const token = jwt.sign(
      {
        id: psychologist._id,
        username: psychologist.username,
        email: psychologist.email,
        role: psychologist.roles,
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
          message: "Psychologist logged in successfully",
          token,
          psychologist
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
    const psychologist = await Psychologist.findOne({ email });
    if (!psychologist) return next(new Error("Email not registered"));

    const token = jwt.sign({ id: psychologist._id, email: psychologist.email,type: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.CLIENT_URL}/resetPassword?token=${token}`;
    psychologist.resetPasswordToken = token;
    psychologist.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await psychologist.save();

    await sendEmail(psychologist.email, resetLink);
    

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

    const psychologist = await Psychologist.findOne({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!psychologist) return next(new Error("Invalid token or psychologist not found"));

    psychologist.password = await bcrypt.hash(newPassword, 10);
    psychologist.resetPasswordToken = undefined;
    psychologist.resetPasswordExpires = undefined;
    await psychologist.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
  }
}

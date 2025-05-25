import { Admin } from "../models/admin.model.js";
import { Psychologist } from "../models/psychologist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/emailService.js";

export default class Auth {

  async signUp(req, res, next) {
    console.log("signUp was called");
    
    const admin = req.body;
    
    try {
  
      admin.password = await bcrypt.hash(admin.password, 10);
      
      await Admin.create(admin);
  
      res.json({
        success: true,
        message: "Admin registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getMe(req, res, next) {
    const id = req.admin.id;
 
    try{
      const admin = await Admin.findById(id);
   
      res.json({
        admin,
        success: true
      });
    }catch(error){
      console.log("error :" ,error)
      next(new Error(error));
    }
  }

  async login(req, res, next) {
    const body = req.body;
    console.log("loggin in as pyschologist")
    if (!body.email) return next(new Error("Provide the email"));
    if (!body.password) return next(new Error("Provide the password"));

    const admin = await Admin.findOne({ email: body.email });

    if (admin === null) return next(new Error("This admin is not registered"));

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      admin.password
    );

    if (!isPasswordMatched) return next(new Error("Invalid password"));

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24hr" }
    );

    try {
      res
        .cookie("auth_token", token, {
          maxAge: 86400000,
          httpOnly: true,
          secure: true,
        })
        .json({
          success: true,
          message: "Admin logged in successfully",
          token,
          admin
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
    const admin = await Admin.findOne({ email });
    if (!admin) return next(new Error("Email not registered"));

    const token = jwt.sign({ id: admin._id, email: admin.email,type: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.CLIENT_URL}/resetPassword?token=${token}`;
    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await admin.save();

    await sendEmail(admin.email, resetLink);
    

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

    const admin = await Admin.findOne({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) return next(new Error("Invalid token or admin not found"));

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
  }

  async getAllPsychologists(req, res, next) {
      try {
        const psychologists = await Psychologist.find()
        res.json({
          success: true,
          message: "List of all Psychologists",
          psychologists,
        })
      } catch (error) {
        next(error)
      }
  }
  
}

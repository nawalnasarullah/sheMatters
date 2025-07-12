import { Admin } from "../models/admin.model.js";
import { Psychologist } from "../models/psychologist.model.js";
import { User } from "../models/user.model.js";
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
    const id = req.user.id
 
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
          sameSite: "None" // Adjust based on your environment
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
      // res
      //   .cookie("auth_token", null, { expiresIn: Date().now })
      //   .json({
      //     success: true,
      //     // token,
      //     message: "You are logged out"
      //   });

       res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

      res.json({
      success: true,
      message: "You are logged out",
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

  async updatePsychologistStatus (req, res, next) {
  const { id } = req.params;
  const { psychologistStatus } = req.body;

  try {
    if (!['approved', 'not approved'].includes(psychologistStatus)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const updatedPsychologist = await Psychologist.findByIdAndUpdate(
    id,
    { psychologistStatus },
    { new: true }
  );

  if (!updatedPsychologist) {
    return res.status(404).json({ message: 'Psychologist not found' });
  }

  res.status(200).json({
    message: 'Status updated successfully',
    psychologist: updatedPsychologist,
  });
  }catch (error) {
    next(error);
  }

  
};


}

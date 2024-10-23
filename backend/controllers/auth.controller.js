import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
          token,
          message: "You are logged out"
        });
    } catch (error) {
      next(error);
    }
  }
}

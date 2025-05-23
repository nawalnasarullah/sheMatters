import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Psychologist } from "../models/psychologist.model.js"; // import Psychologist model

export const protectRoute = async (req, res, next) => {
  try {
    const { auth_token } = req.cookies;

    if (!auth_token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // First check if user is a regular user
    let user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // If not found, check psychologist
      user = await Psychologist.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    next(error); // Pass the error to the global error handler
  }
};

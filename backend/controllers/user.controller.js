import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"; // bcrypt is a password-hashing library designed to securely store passwords
import jwt from "jsonwebtoken"; // JWT is a token-based authentication method
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "One/more of the fields are missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with the same email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account has been created successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "One/more of the fields are missing",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email/password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email/password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the selected role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // use secure cookie in production
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    //Cloudinary integration for file handling comes here
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // From middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    // Updating user data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handle file upload logic (resume, etc.)
    if (cloudResponse) {
      //Save the cloudinary URL
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname; //Save the original file name
    }

    await user.save(); // save the changes

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// bcrypt ensures that user passwords are securely stored and compared using hashing.
// JWT enables stateless authentication by securely transmitting user
// information between the client and the server through signed tokens.

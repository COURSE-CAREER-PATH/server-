import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import EmailToken from "../models/token";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { Request, Response } from "express";
import UserModel from "../models/userModel";

// Define the shape of the request body
interface UserInterface extends Request {
  [x: string]: any;
  user?: {
    id: string;
  };
  body: {
    uid: string;
    Email: string;
    mobileNumber: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    Password: string;
    Verified: boolean;
    Country: string;
    State: string;
    additionalAddress: string;
    zipCode: number;
    ProfilePicture: object;
    Language: string;
    Bio: string;
    LinkedIn: string;
    Facebook: string;
    Twitter: string;
    Skills: object;
    Overview: string;
    Profession: string;
    rating: number;
    Portfolio: string;
    companyLogo: string;
    companyName: string;
    companyPosition: string;
    companySize: string;
    companyAddress: string;
    companyDescription: string;
    companyLinkedIn: string;
    companyFacebook: string;
    companyTwitter: string;
    companyWebsite: string;
    companyPhone: number;
  };
}

const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @description Register new user
// @route /user/register
// @access public
const registerUser = asyncHandler(
  async (req: UserInterface, res: Response): Promise<void> => {
    const { uid, userName, Email, Password } = req.body;

    // Check if the user already exists
    const userExists = await UserModel.findOne({ Email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create a new user document
    const newUser = new UserModel({
      _id: uid, // Use Firebase UID as the custom _id
      Email,
      userName,
      Password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    if (user) {
      const emailToken = await new EmailToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.CLIENT_NAME}/users/${user._id}/verify/${emailToken.token}`;
      await sendEmail(user.Email, "Verify Email", url);

      res.status(201).json({
        message: "An Email has been sent to your account. Please verify.",
        _id: user._id, // Ensure ObjectId is converted to string
        Email: user.Email,
        userName: user.userName,
        token: generateToken(user._id), // Pass the generated token
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

//@description Authenticate a  user
//@route /user/authenticate
//@access  public
const loginUser = asyncHandler(
  async (req: UserInterface, res: Response): Promise<void> => {
    try {
      const { Email, mobileNumber, Password } = req.body;

      // Check if user exists by email or mobile number
      const user = await UserModel.findOne({
        $or: [{ email: Email }, { mobileNumber }],
      });

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      // Check if the password matches
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        res.status(401).send("Invalid credentials");
        return;
      }

      // Check if the user is verified
      if (!user.Verified) {
        let token = await EmailToken.findOne({ userId: user._id });
        if (!token) {
          token = await new EmailToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          const url = `${process.env.CLIENT_NAME}/user/${user._id}/verify/${token.token}`;
          await sendEmail(user.Email, "Verify Email", url);
        }
        res.status(400).send({
          message: "An email has been sent to your account, please verify.",
        });
        return;
      }

      // If everything is fine, proceed with login success

      res.status(201).json({
        message: "An Email has been sent to your account. Please verify.",
        _id: user._id, // Ensure ObjectId is converted to string
        Email: user.Email,
        userName: user.userName,
        token: generateToken(user._id), // Pass the generated token
      });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// Verifying user's email
// @route /user/:id/verify/:token
const verifyEmailToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, token: tokenParam } = req.params;

      // Find user by ID
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        res.status(400).send({ message: "Invalid link" });
        return;
      }

      // Find the token for the user
      const token = await EmailToken.findOne({
        userId: user._id,
        token: tokenParam,
      });
      if (!token) {
        res.status(400).send({ message: "Invalid link" });
        return;
      }

      // Update user as verified
      await UserModel.updateOne(
        { _id: user._id },
        { $set: { Verified: true } }
      );

      // Remove the email token
      await EmailToken.deleteOne({ _id: token._id });

      // Send a response with user data
      res.status(200).send({
        message: "Email Verified Successfully",
      });
    } catch (error) {
      console.error("Verification Error: ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

//@description Google sign Up
//@route /user/googleSignup
//@access  public
const googleSignup = asyncHandler(
  async (req: UserInterface, res: Response): Promise<void> => {
    const { userName, Email, uid } = req.body;
    try {
      //check if user with same email already exists
      let existingUser = await UserModel.findOne({ Email });

      if (existingUser) {
        existingUser.userName = userName; //update userName if necessary

        await existingUser.save();

        res.status(201).json({
          message: "User signed in successfully",
          _id: existingUser._id,
          Email: existingUser.Email,
          userName: existingUser.userName,
          token: generateToken(existingUser._id), // Pass the generated token
        });
        return;
      } else {
        //if the user does not exist , create a new user
        const newUser = new UserModel({
          _id: uid, // Use Firebase UID as the custom _id
          Email,
          userName,
        });

        // Save the user to the database
        const user = await newUser.save();
        res.status(201).json({
          message: "User signed up successfully",
          _id: user._id,
          Email: user.Email,
          userName: user.userName,
          token: generateToken(user._id), // Pass the generated token
        });
      }
    } catch (error) {
      console.error("Error handling Google Sign in!", error);
      res.status(500).send("Server error");
    }
  }
);

//@ this function : it allows for getting the values from the update routes and make the changes in the database
const updateUserProfile = async (
  userId: string,
  updates: Partial<UserInterface>
): Promise<UserInterface> => {
  const user = (await UserModel.findById(userId)) as UserInterface | null;

  if (!user) {
    throw new Error("User not found");
  }

  Object.assign(user, updates); // Assign new data to the user object
  await user.save();

  return user; // Return the updated user
};

// @description updatePersonalUserInfo
// @route /user/updatePersonalUserInfo
// @access  private
const updatePersonalUserInfo = asyncHandler(
  async (req: UserInterface, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res
          .status(400)
          .json({ success: false, message: "User not authenticated" });
        return;
      }

      const userInfo = req.body;

      // Pass userId and userInfo to the updateUserProfile function
      const updatedUser = await updateUserProfile(userId, userInfo);

      // Send back the updated user information as a response
      res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } catch (error: unknown) {
      console.error("Error updating user profile:", (error as Error).message);

      res.status(500).json({
        success: false,
        message: (error as Error).message.includes("not found")
          ? (error as Error).message
          : "Internal server error",
      });
    }
  }
);


export {
  registerUser,
  loginUser,
  verifyEmailToken,
  googleSignup,
  updatePersonalUserInfo,
};

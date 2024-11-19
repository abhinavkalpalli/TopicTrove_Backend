import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { IuserController } from "./interfaces/IuserController";
import verificationService from "../services/verificationService";
import bcrypt from "bcrypt";
import generateJwt, { Payload } from "../middleware/jwt";
import { Types } from "mongoose";

export default class userController implements IuserController {
  private _userService: userService;
  private _verificationService: verificationService;
  constructor() {
    this._userService = new userService();
    this._verificationService = new verificationService();
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, phone, dob, email, password, preferences } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const data = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        preferences,
      };

      const userData = await this._userService.register(data);
      if (userData == null) {
        res.status(409).json({ message: "User already exists" });
      } else {
        const otp = this._verificationService.generateOtp();
        await this._verificationService.SendOtpEmail(
          email,
          "Your OTP Code",
          otp
        );
        res.status(201).json({
          message: "Admin registered successfully and OTP sent",
          email,
          otp,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async otpVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const data = await this._userService.otpVerify(email);
      if (data) {
        res.status(200).json({ message: "verified" });
      } else {
        res.status(400).json({ message: "Not verified" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.query;
      const otp = await this._verificationService.generateOtp();
      const data = await this._verificationService.SendOtpEmail(
        email as string,
        "This is your new Otp",
        otp
      );
      res.status(200).json({ message: "otp sent", otp });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { emailOrPhone, password } = req.body;
      const data = await this._userService.login(emailOrPhone);
      if (data) {
        const password2 = data.password;
        const isMatch = await bcrypt.compare(password, password2);
        if (isMatch) {
          const { email, firstName, photo, _id, preferences } = data;
          let tokens = await generateJwt(data as Payload);
          let posts = [{}];
          res.status(200).json({
            message: "User Logged in",
            email,
            tokens,
            firstName,
            photo,
            _id,
            preferences,
            posts,
          });
        } else {
          res.status(402).json({ message: "Password did not match" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async editProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, email, photo } = req.body;
      let user = await this._userService.login(email);
      if (user) {
        user.firstName = firstName;
        user.photo = photo;
        user.save();
      }
      res.status(200).json({ message: "Profile edited" });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await this._userService.forgotPassword(email);

      if (user) {
        const otp = this._verificationService.generateOtp();
        await this._verificationService.SendOtpEmail(
          email,
          "This is for your forgot password",
          otp
        );
        res.status(200).json({ message: "OTP sent", email, otp });
      } else {
        // If user does not exist, send a 404 response
        res.status(409).json({ message: "User does not exist" });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal Error" });
    }
  }

  async passwordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, oldPassword } = req.body;
      if (oldPassword) {
        const user = await this._userService.forgotPassword(email);
        if (user) {
          const isMatch = await bcrypt.compare(oldPassword, user.password);
          if (isMatch) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await this._userService.passwordReset(
              email,
              hashedPassword
            );
            if (data) {
              res.status(200).json({ message: "Password changed" });
            }
          } else {
            res.status(400).json({ message: "Enter correct Old Password" });
          }
        }
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await this._userService.passwordReset(
          email,
          hashedPassword
        );
        if (data) {
          res.status(200).json({ message: "Password Changed" });
        } else {
          res.status(500).json({ message: "Internal Error" });
        }
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, userId } = req.body;
      let topic = await this._userService.createTopic(name, userId);
      if (topic) {
        res.status(200).json({ message: "Created new Preference", topic });
      } else {
        res.status(409).json({ message: "Preference already exist" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async getPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const preferences = await this._userService.getPreferences(userId);
      res.status(200).json({ preferences });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async editTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, _id } = req.body;
      const topic = await this._userService.editTopic(name, _id);

      if (topic) {
        topic.name = name;
        topic.save();
        res.status(200).json({ message: "Edit successful", topic });
      } else {
        res.status(409).json({ message: "Preference already exist" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async getAllPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const preferences = await this._userService.getAllPreferences();
      if (preferences) {
        res.status(200).json({ preferences });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, photo, preference, userId } = req.body;
      const data = { name, description, photo, preference, userId };
      const post = await this._userService.createPost(data);
      res.status(201).json({ message: "Post Created", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async fetchPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string;
      const preferences = (req.query.preferences as string[]) || [];
      const posts = await this._userService.fetchPosts(userId, preferences);
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, userId, like } = req.body;
      const data = await this._userService.likePost(postId, userId, like);
      if (data) {
        res.status(200).json({ message: "Liked the post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async dislikePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, userId, dislike } = req.body;
      const data = await this._userService.dislikePost(postId, userId, dislike);
      if (data) {
        res.status(200).json({ message: "Disliked the post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async blockPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, userId } = req.body;
      const data = await this._userService.blockPost(postId, userId);
      if (data) {
        res.status(200).json({ message: "Blocked the post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      console.log(postId);

      const post = await this._userService.deletePost(postId);
      if (post) {
        res.status(200).json({ message: "Deleted the post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Error" });
    }
  }
  async editPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, photo, preference, _id } = req.body;
      const postId = new Types.ObjectId(_id);
      const data = { name, description, photo, preference, _id: postId };
      const post = await this._userService.editPost(data);
      if (post) {
        res.status(200).json({ message: "Post Edited" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  }
}

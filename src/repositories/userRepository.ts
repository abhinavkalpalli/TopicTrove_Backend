import { IuserRepository } from "./interfaces/IuserRepository";
import Users, { User } from "../models/userModel";
import Preferences, { Preference } from "../models/preferenceModel";
import Posts, { Post } from "../models/postModel";
import { Types } from "mongoose";
import { rmSync } from "fs";

export default class userRepository implements IuserRepository {
  async register(userData: Partial<User>): Promise<User | null> {
    try {
      const user = await Users.findOne({
        $or: [{ email: userData.email }, { phone: userData.phone }],
      });

      if (user) {
        return null;
      }
      return await Users.create(userData);
    } catch (err) {
      throw err;
    }
  }
  async otpVerify(email: Partial<User>): Promise<User | null> {
    try {
      let user = await Users.findOne({ email });
      if (user) {
        user.isVerified = true;
        user.save();
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async login(emailOrPhone: string): Promise<User | null> {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
      const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

      let query;
      if (isEmail) {
        query = { email: emailOrPhone, isVerified: true };
      } else if (isPhone) {
        query = { phone: emailOrPhone, isVerified: true };
      } else {
        // If neither, return null or throw an error
        throw new Error("Invalid email or phone number");
      }

      // Find the user based on the constructed query
      return await Users.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  async passwordReset(email: string, password: string): Promise<User | null> {
    try {
      const user = await Users.findOne({ email });
      if (user) {
        user.password = password;
        user.save();
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async forgotPassword(email: string): Promise<User | null> {
    try {
      const user = await Users.findOne({ email });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async createTopic(name: string, userId: string): Promise<Preference | null> {
    try {
      const topic = await Preferences.findOne({ name });
      if (topic) {
        return null;
      } else {
        return await Preferences.create({ name, userId });
      }
    } catch (error) {
      throw error;
    }
  }
  async getPreferences(userId: string): Promise<Preference[] | null> {
    try {
      return await Preferences.find({ userId });
    } catch (error) {
      throw error;
    }
  }
  async editTopic(name: string, _id: string): Promise<Preference | null> {
    try {
      const topic = await Preferences.findOne({ name });
      if (topic) {
        return null;
      } else {
        return await Preferences.findById(_id);
      }
    } catch (error) {
      throw error;
    }
  }
  async getAllPreferences(): Promise<Preference[] | null> {
    try {
      return await Preferences.find();
    } catch (error) {
      throw error;
    }
  }
  async createPost(data: Partial<Post>): Promise<Post | null> {
    try {
      return await Posts.create(data);
    } catch (error) {
      throw error;
    }
  }
  async fetchPosts(
    userId: string,
    preferences: string[]
  ): Promise<Post[] | null> {
    try {
      await Users.findByIdAndUpdate(userId, { preferences }, { new: true });
      const query = {
        ...(preferences && preferences.length > 0 && { preference: { $in: preferences } }),
        block: { $ne: userId },
      };
      
      const posts = await Posts.find(query)
        .sort({ createdAt: -1 })
        .populate({ path: "userId", select: "firstName lastName photo" });
      
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async likePost(
    postId: string,
    userId: string,
    like: boolean
  ): Promise<Post | null> {
    try {
      const post = await Posts.findById(postId);
      if (!post) throw new Error("Post not found");

      if (like) {
        post.dislike = post.dislike.filter((id) => id.toString() !== userId);
        post.like.push(userId as any);
      } else {
        post.like = post.like.filter((id) => id.toString() !== userId);
      }
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }
  async dislikePost(
    postId: string,
    userId: string,
    dislike: boolean
  ): Promise<Post | null> {
    try {
      const post = await Posts.findById(postId);
      if (!post) throw new Error("Post not found");

      if (dislike) {
        post.like = post.like.filter((id) => id.toString() !== userId);
        post.dislike.push(userId as any);
      } else {
        post.dislike = post.dislike.filter((id) => id.toString() !== userId);
      }
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }
  async blockPost(postId: string, userId: string): Promise<Post | null> {
    try {
      const result = await Posts.updateOne(
        { _id: postId },
        { $addToSet: { block: new Types.ObjectId(userId) } }
      );
      return await Posts.findById(postId);
    } catch (error) {
      throw error;
    }
  }
  async deletePost(postId: string): Promise<Post | null> {
    try {
      return await Posts.findByIdAndDelete(postId);
    } catch (error) {
      throw error;
    }
  }
  async editPost(data: Partial<Post>): Promise<Post | null> {
    try {
      const {_id,name,description,photo,preference}=data
      const post=await Posts.findById(_id)
      if(post){
        post.name=name||''
        post.description=description||''
        post.photo=photo||''
        post.preference=preference||[]
        post.save()
      }
      return post
    } catch (error) {
      throw error
    }
  }
}

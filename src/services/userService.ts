import userRepository from "../repositories/userRepository";
import { IuserService } from "./interfaces/IuserService";
import { User } from "../models/userModel";
import { Preference } from "../models/preferenceModel";
import { Post } from "../models/postModel";

export default class userService implements IuserService{
    private _userRepository:userRepository
    constructor(){
        this._userRepository=new userRepository()
    }
    async register(userData: Partial<User>): Promise<User | null> {
        try {
          return await this._userRepository.register(userData);
        } catch (error) {
          throw error;
        }
      }
      async otpVerify(email: Partial<User>): Promise<User | null> {
        try {
          return this._userRepository.otpVerify(email);
        } catch (error) {
          throw error;
        }
      }
      async login(emailOrPhone: string): Promise<User | null> {
        try {
          return await this._userRepository.login(emailOrPhone);
        } catch (error) {
          throw error;
        }
      }
      async passwordReset(email: string, password: string): Promise<User | null> {
        try {
          return await this._userRepository.passwordReset(email, password);
        } catch (error) {
          throw error;
        }
      }
      async forgotPassword(email: string): Promise<User | null> {
        try {
          return await this._userRepository.forgotPassword(email);
        } catch (error) {
          throw error;
        }
      }
      async createTopic(name: string, userId: string): Promise<Preference | null> {
        try {
          return await this._userRepository.createTopic(name,userId)
        } catch (error) {
          throw error
        }
      }
      async getPreferences(userId: string): Promise<Preference[] | null> {
        try {
          return await this._userRepository.getPreferences(userId)
        } catch (error) {
          throw error
        }
      }
      async editTopic(name: string,_id:string): Promise<Preference | null> {
        try {
          return await this._userRepository.editTopic(name,_id)
        } catch (error) {
          throw error
        }
      }
      async getAllPreferences(): Promise<Preference[] | null> {
        try {
          return this._userRepository.getAllPreferences()
        } catch (error) {
          throw error
        }
      }
      async createPost(data: Partial<Post>): Promise<Post | null> {
        try {
          return await this._userRepository.createPost(data)
        } catch (error) {
          throw error
        }
      }
      async fetchPosts(userId:string,preferences:string[]): Promise<Post[] | null> {
        try {
          return await this._userRepository.fetchPosts(userId,preferences)
        } catch (error) {
          throw error
        }
      }
      async likePost(postId: string, userId: string, like: boolean): Promise<Post | null> {
        try {
          return await this._userRepository.likePost(postId,userId,like)
        } catch (error) {
          throw error
        }
      }
      async dislikePost(postId: string, userId: string, dislike: boolean): Promise<Post | null> {
        try {
          return await this._userRepository.dislikePost(postId,userId,dislike)
        } catch (error) {
          throw error
        }
      }
      async blockPost(postId: string, userId: string): Promise<Post | null> {
        try {
          return await this._userRepository.blockPost(postId,userId)
        } catch (error) {
          throw error
        }
      }
      async deletePost(postId: string): Promise<Post | null> {
        try {
          return await this._userRepository.deletePost(postId)
        } catch (error) {
          throw error
        }
      }
      async editPost(data: Partial<Post>): Promise<Post | null> {
        try {
          return await this._userRepository.editPost(data)
        } catch (error) {
          throw error
        }
      }
}
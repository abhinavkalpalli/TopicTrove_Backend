import { Post } from "../../models/postModel";
import { Preference } from "../../models/preferenceModel";
import { User } from "../../models/userModel";
export interface IuserService {
  register(userData: Partial<User>): Promise<User | null>;
  otpVerify(email: Partial<User>): Promise<User | null>;
  login(emailOrPhone: string): Promise<User | null>;
  passwordReset(email: string, password: string): Promise<User | null>;
  forgotPassword(email: string): Promise<User | null>;
  createTopic(name: string, userId: string): Promise<Preference | null>;
  getPreferences(userId: string): Promise<Preference[] | null>;
  editTopic(name: string, _id: string): Promise<Preference | null>;
  getAllPreferences(): Promise<Preference[] | null>;
  createPost(data: Partial<Post>): Promise<Post | null>;
  fetchPosts(userId: string, preferences: string[]): Promise<Post[] | null>;
  likePost(postId: string, userId: string, like: boolean): Promise<Post | null>;
  dislikePost(
    postId: string,
    userId: string,
    dislike: boolean
  ): Promise<Post | null>;
  blockPost(postId: string, userId: string): Promise<Post | null>;
  deletePost(postId: string): Promise<Post | null>;
  editPost(data: Partial<Post>): Promise<Post | null>;
}

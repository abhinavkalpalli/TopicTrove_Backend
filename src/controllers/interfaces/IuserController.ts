import { NextFunction, Request, Response } from "express";

export interface IuserController{
  register(req: Request, res: Response, next: NextFunction): void;
  otpVerify(req: Request, res: Response, next: NextFunction): Promise<void>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  editProfile(req:Request,res:Response,next:NextFunction):void
  forgotPassword(req: Request, res: Response, next: NextFunction): void;
  passwordReset(req: Request, res: Response, next: NextFunction): void;
  createTopic(req:Request,res:Response,next:NextFunction):void
  getPreferences(req:Request,res:Response,next:NextFunction):void
  editTopic(req:Request,res:Response,next:NextFunction):void
  getAllPreferences(req:Request,res:Response,next:NextFunction):void
  createPost(req:Request,res:Response,next:NextFunction):void
  fetchPosts(req:Request,res:Response,next:NextFunction):void
  likePost(req:Request,res:Response,next:NextFunction):void
  dislikePost(req:Request,res:Response,next:NextFunction):void
  blockPost(req:Request,res:Response,next:NextFunction):void
  deletePost(req:Request,res:Response,next:NextFunction):void
  editPost(req:Request,res:Response,next:NextFunction):void

}
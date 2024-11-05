import { NextFunction, Request, Response } from "express";

export interface IauthController {
  userAuth(req: Request, res: Response, next: NextFunction): void;
}

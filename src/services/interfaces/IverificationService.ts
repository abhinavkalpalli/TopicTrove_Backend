// src/interfaces/IverificationService.ts
import { Request, Response, NextFunction } from "express";

export interface IverificationService {
  SendOtpEmail(to: string, subject: string, otp: string): Promise<void>;

  generateOtp(): string;
}

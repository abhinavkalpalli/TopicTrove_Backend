// src/services/patient/verificationService.ts
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { IverificationService } from "./interfaces/IverificationService";
import dotenv from "dotenv";

dotenv.config();

export default class verificationService implements IverificationService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS,
    },
  });
  public async SendOtpEmail(
    to: string,
    subject: string,
    otp: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.USER_MAIL!,
      to,
      subject,
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending OTP Email:", error);
      throw new Error("Failed to send OTP Email");
    }
  }
  public async SendReportEmail(
    to: string,
    subject: string,
    salesReport: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.USER_MAIL!,
      to,
      subject,
      text: "Here is your sales report.",
      html: salesReport,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending Sales Report Email:", error);
      throw new Error("Failed to send Sales Report Email");
    }
  }
  public generateOtp(): string {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  }
}

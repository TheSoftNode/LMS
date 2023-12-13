import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../models/user.model";
import AppError from "../errorsHandlers/appError";
import catchAsync from "../utils/catchAsync";
import Email from "../emails/email";
import { IActivationRequest, IRegistrationBody } from "../DTOs/UserDtos";
import { IActivationToken } from "../DTOs/UserDtos";
import IUser from "../models/Interfaces/userInterface";
import { sendToken } from "../utils/sendToken";

// Create activation token and the token
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    }
  );

  return { token, activationCode };
};

// Verify Account before saving it.
export const verifyAccount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) return next(new AppError("Email Already exists", 400));

    const user: IRegistrationBody = {
      name,
      email,
      password,
      passwordConfirm,
    };

    const { token, activationCode } = createActivationToken(user);
    // const activationCode = activationToken.activationCode;

    const data = {
      user: { name: user.name },
      activationCode,
    };

    await new Email(user, data).activateRegistration();

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account!`,
      token,
    });
  }
);

// activate user
export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let activation_token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      activation_token = req.headers.authorization.split(" ")[1];
    }

    const { activation_code } = req.body as IActivationRequest;

    const newUser: { user: IUser; activationCode: string } = jwt.verify(
      activation_token,
      process.env.JWT_SECRET as string
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode != activation_code)
      return next(new AppError("Invalid token. Please try again", 401));

    const { name, email, password, passwordConfirm } = newUser.user;

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    sendToken(user, 201, res);
  }
);

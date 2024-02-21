import { Request, Response } from "express";

import { signJWT } from "../../utils/jwt.utils";

import {
  // createSession,
  createUser,
  getUser,
  getUserById,
  // invalidateExistingSession,
} from "../../model/authencation/authentication.model";
import { ResponseMessages, ResponseStatus } from "../../helpers/responseEnums";
import { comparePassword } from "../../helpers/helpers";

const ACCESS_TOKEN_MAX_AGE = 3600000; // 1 hour in milliseconds
const REFRESH_TOKEN_MAX_AGE = 3.154e10; // 1 year in milliseconds
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function signupHandler(request: Request, response: Response) {
  try {
    const { email, password } = request.body;

    const existingUser = await getUser(email);

    if (existingUser) {
      return response
        .status(ResponseStatus.BadRequest)
        .send({ message: ResponseMessages.UserAlreadyExists });
    }

    const newUser = await createUser({
      ...request.body,
    });

    setUserCookies(response, newUser);

    return response
      .status(ResponseStatus.Created)
      .send({ message: "Signup Success" });
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
}

export async function loginHandler(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    console.log({ email, password }, "login");

    const user = await getUser(email);

    if (!user || !comparePassword(password, user.password)) {
      return response
        .status(ResponseStatus.Unauthorized)
        .send({ message: ResponseMessages.InvalidCredentials });
    }

    setUserCookies(response, user);

    return response
      .status(ResponseStatus.Success)
      .send({ message: "Sign in success" });
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
}

export async function logoutHandler(request: Request, response: Response) {
  try {
    console.log("Logout called");

    const cookieOptions = {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? ("none" as const) : ("lax" as const),
      ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
    };

    // Clearing the accessToken and refreshToken cookies
    response.clearCookie("access_token_flower_box", cookieOptions);
    response.clearCookie("refresh_token_flower_box", cookieOptions);

    return response
      .status(ResponseStatus.Success)
      .json({ message: "Successfully logged out" });
  } catch (error: any) {
    console.error("Logout error:", error);
    response
      .status(ResponseStatus.UnexpectedError)
      .json({ message: "An unexpected error occurred during logout." });
  }
}

//helpers...
function setUserCookies(
  response: Response,
  user: {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
) {
  const accessToken = signJWT(
    { email: user.email, userId: user.id.toString() },
    "1h"
  );
  const refreshToken = signJWT(
    { email: user.email, userId: user.id.toString() },
    "1y"
  );

  response.cookie("access_token_flower_box", accessToken, {
    maxAge: ACCESS_TOKEN_MAX_AGE,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? "none" : "lax",
    ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
  });

  response.cookie("refresh_token_flower_box", refreshToken, {
    maxAge: REFRESH_TOKEN_MAX_AGE,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? "none" : "lax",
    ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
  });
}

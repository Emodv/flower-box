import { Request, Response } from "express";

import {
  // createSession,
  createUser,
  getUser,
  // getUserById,
  // invalidateExistingSession,
} from "../../model/authencation/authentication.model";
import { ResponseMessages, ResponseStatus } from "../../enums/responseEnums";
import { comparePassword } from "../../helpers/helpers";
import { Roles } from "../../enums/rolesEnum";

import { z } from "zod";
import { signUpLoginSchema } from "../../schema/authentication";
import { setUserCookies } from "./helper";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function signupHandler(request: Request, response: Response) {
  try {
    const validatedData = signUpLoginSchema.parse(request.body);
    const existingUser = await getUser(validatedData.email);
    if (existingUser) {
      return response
        .status(ResponseStatus.BadRequest)
        .send({ message: "User Already Exists" });
    }

    const newUser = await createUser({
      email: validatedData.email,
      password: validatedData.password,
      role: Roles.USER,
    });

    setUserCookies(response, newUser);
    return response
      .status(ResponseStatus.Created)
      .send({ message: ResponseMessages.Success });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return response
        .status(ResponseStatus.BadGateway)
        .json({ message: error.errors[0].message });
    }
    return response
      .status(500)
      .json({ message: "An unexpected error occurred." });
  }
}

export async function loginHandler(request: Request, response: Response) {
  try {
    const validatedData = signUpLoginSchema.parse(request.body);
    const { email, password } = validatedData;
    console.log({ email, password }, "login");

    const user = await getUser(email);

    if (!user || !comparePassword(password, user.password)) {
      return response
        .status(ResponseStatus.Unauthorized)
        .send({ message: "Invalid Credentials" });
    }

    setUserCookies(response, user);

    return response
      .status(ResponseStatus.Success)
      .send({ message: ResponseMessages.Success });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: error.errors[0].message });
    }
    console.log(error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function logoutHandler(request: Request, response: Response) {
  try {
    console.log("Logout called");

    const LOGOUT_COOKIE_OPTIONS = {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? ("none" as const) : ("lax" as const),
      ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
    };

    // Clearing the accessToken and refreshToken cookies
    response.clearCookie("access_token_flower_box", LOGOUT_COOKIE_OPTIONS);
    response.clearCookie("refresh_token_flower_box", LOGOUT_COOKIE_OPTIONS);

    return response
      .status(ResponseStatus.Success)
      .json({ message: ResponseMessages.Success });
  } catch (error: any) {
    console.error("Logout error:", error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

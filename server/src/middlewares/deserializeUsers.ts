import "express";

import { NextFunction, Request, Response } from "express";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { environment } from "../types/global";

interface JWTPayload {
  email: string;
  userId: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JWTPayload;
  }
}

const ACCESS_TOKEN_MAX_AGE = 3600000 * 12; // 12 hour in milliseconds
const IS_PRODUCTION = process.env.NODE_ENV === environment.PRODUCTION;

async function deserializeUser(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const accessToken = request.cookies["access_token_flower_box"];
  const refreshToken = request.cookies["refresh_token_flower_box"];

  console.log({ accessToken, refreshToken });

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    request.user = payload as JWTPayload;
    return next();
  }

  // Only proceed if the access token has expired and a refresh token exists
  if (!expired || !refreshToken) {
    return next();
  }

  const refreshResult = verifyJWT(refreshToken);
  const refreshPayload = refreshResult.payload as JWTPayload | null;

  if (!refreshPayload) {
    return next();
  }

  const newAccessToken = signJWT(
    {
      email: refreshPayload.email,
      userId: refreshPayload.userId,
    },
    "1h", // expires in 1 hour.
  );

  response.cookie("`access_token_flower_box`", newAccessToken, {
    maxAge: ACCESS_TOKEN_MAX_AGE,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? "none" : "lax",
    ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
  });

  const newPayload = verifyJWT(newAccessToken).payload as JWTPayload;

  request.user = newPayload;

  return next();
}

export default deserializeUser;

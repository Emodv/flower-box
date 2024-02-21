import { NextFunction, Request, Response } from "express";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

interface JWTPayload {
  email?: string;
  userId?: string;
}

const ACCESS_TOKEN_MAX_AGE = 3600000; // 1 hour in milliseconds
const IS_PRODUCTION = process.env.NODE_ENV === "production";

async function deserializeUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { accessToken, refreshToken } = request.cookies;

  console.log({ accessToken, refreshToken });

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    //@ts-ignore
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
    "1h" // expires in 1 hour.
  );

  response.cookie("access_token_flower_box", newAccessToken, {
    maxAge: ACCESS_TOKEN_MAX_AGE,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? "none" : "lax",
    ...(IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }),
  });

  const newPayload = verifyJWT(newAccessToken).payload as JWTPayload;
  //@ts-ignore
  request.user = newPayload;

  return next();
}

export default deserializeUser;

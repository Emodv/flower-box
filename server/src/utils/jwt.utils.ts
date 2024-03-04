import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key_here";

interface JWTPayload {
  email?: string;
  userId?: string;
  role?: string;
}

export const signJWT = (
  payload: JWTPayload,
  expiresIn: string | number,
): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyJWT = (
  token: string,
): { payload: JWTPayload | null; expired: boolean } => {
  try {
    const payload = jwt.verify(token, SECRET_KEY) as JWTPayload;
    return { payload, expired: false };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { payload: null, expired: true };
    } else {
      return { payload: null, expired: false };
    }
  }
};

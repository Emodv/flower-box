//@ts-nocheck
import bcrypt from "bcryptjs";

export function generateSessionID() {
  return Math.random().toString(36).substring(7);
}

export function calculateSubscriptionEndDate(subscriptionType: string): Date {
  const endDate = new Date();
  switch (subscriptionType) {
    case "1 month subscription":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "3 months subscription":
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "6 months subscription":
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    default:
      throw new Error("Invalid subscription type");
  }
  return endDate;
}

export function hashPassword(password: string) {
  try {
    const salt = bcrypt.genSaltSync(Number(process.env.BYCRYPT_SALT));
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new Error("Hashing failed");
  }
}

export function comparePassword(password: string, hashedPassword: string) {
  try {
    const result = bcrypt.compareSync(password, hashedPassword);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Comparison failed");
  }
}

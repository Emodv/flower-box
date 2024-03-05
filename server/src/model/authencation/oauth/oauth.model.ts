import prisma from "../../../prisma";
import { UserType, UserRole } from "@prisma/client";

export async function findOrCreateUser(email: string, userType: UserType) {
  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "OAUTH_NO_PASSWORD",
          role: UserRole.USER,
          userType,
        },
      });
    }

    return user;
  } catch (error: unknown) {
    console.error("Error in findOrCreateUser:", error);
    throw error;
  }
}

import { Roles } from "../../../enums/rolesEnum";
import prisma from "../../../prisma";

export async function findOrCreateUser(email: string, userType: string) {
  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "OAUTH_NO_PASSWORD",
          role: Roles.USER,
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

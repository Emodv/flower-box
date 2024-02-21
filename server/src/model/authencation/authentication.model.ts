import { hashPassword } from "../../helpers/helpers";
import prisma from "../../prisma";

interface userDataParams {
  email: string;
  password: string;
}

export async function createUser(userData: userDataParams) {
  const pass = hashPassword(userData.password);
  console.log(pass, 'pass');
  try {
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: pass,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
}

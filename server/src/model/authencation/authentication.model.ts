import prisma from "../../prisma";
import { hashPassword } from "../../helpers/helpers";
import { User } from "@prisma/client";

interface CreateUserInput {
  email: string;
  password: string;
  role?: string;
}

async function createUser(data: CreateUserInput): Promise<User> {
  try {
    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role || "user",
      },
    });
    return newUser;
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error: unknown) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error: unknown) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export { createUser, getUser, getUserById };

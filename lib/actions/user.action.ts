"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User?.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log("Database connnection failed", error);
  }
}

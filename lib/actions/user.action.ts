import User from "@/database/user.modal";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.modal";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  UpdateUserParams,
  DeleteUserParams,
} from "./shared.types";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User?.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log("Database connnection failed: ", error);
  }
}
export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found!");
    }

    // TODO => Get user question id to delete them

    // Delete User Questions
    await Question.deleteMany({ author: user._id });

    // TODO! => delete user answers, comments, etc

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

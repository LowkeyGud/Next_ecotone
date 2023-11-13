"use server";

import Question from "@/database/question.modal";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.modal";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // TODO! Add cookie checking method if user is not logged in

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        // User has already viewed this question.
        return;

      // Update view count for the question
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

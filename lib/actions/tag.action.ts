"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTagByIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.modal";
import Question from "@/database/question.modal";
import mongoose, { FilterQuery } from "mongoose";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 5 } = params;

    const query: FilterQuery<typeof Tag> = {};

    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        // questionCount is defined in aggregrate function below
        sortOptions = { questionCount: -1 };
        break;

      case "recent":
        sortOptions = { createdAt: -1 };
        break;

      case "name":
        sortOptions = { name: 1 };
        break;

      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        sortOptions = { questionCount: -1 };
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.aggregate([
      { $match: query },
      {
        $project: {
          name: 1,
          questions: 1,
          questionCount: { $size: "$questions" },
        },
      },
      { $skip: skipAmount },
      { $limit: pageSize + 1 },
      { $sort: sortOptions },
    ]);

    const hasNext = totalTags > skipAmount + tags.length;

    return { tags, hasNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagById(params: GetTagByIdParams) {
  try {
    connectToDatabase();

    const { tagId } = params;

    if (mongoose.isValidObjectId(tagId)) {
      const tag = await Tag.findById(tagId);

      return tag;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const {
      userId,
      // limit= 3
    } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "React" },
      { _id: "2", name: "Typescript" },
    ];
  } catch (error) {
    console.log(error);
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 5, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    let tag;

    if (mongoose.isValidObjectId(tagId)) {
      tag = await Tag.findOne(tagFilter).populate({
        path: "questions",
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: "i" } }
          : {},
        options: {
          skip: skipAmount,
          limit: pageSize + 1, // pageSize+1 to find if there are other questions and compute hasNext based on that
          sort: { createdAt: -1 },
        },
        populate: [
          { path: "tags", model: Tag, select: "_id name" },
          { path: "author", model: User, select: "_id clerkId name picture" },
        ],
      });
    }

    if (!tag) {
      return;
    }

    const questions = tag.questions;

    const hasNext = questions.length > pageSize;

    return { tagTitle: tag.name, questions, hasNext };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

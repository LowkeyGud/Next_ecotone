"use server";

import Question from "@/components/forms/Question";

import React from "react";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();

  const userId = "5f7b1d9c4a8d3d5a9f6c0d5e";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;

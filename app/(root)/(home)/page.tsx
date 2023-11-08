import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/navbar/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "Bai Xiaochun",
      picture:
        "https://i.pinimg.com/736x/ee/84/b7/ee84b71728200286aa9baf6f92409a7d.jpg",
    },
    upvotes: 1043546,
    views: 103453450,
    answers: [
      {
        ans: [
          "I'm so amazing!",
          "I want to live!",
          "I'm not a coward, I'm just cautious. And smart. And handsome",
          "Why am I so amazing? Sigh...",
          "lord turtle",
          "hahahaha",
        ],
      },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a Div?",
    tags: [
      { _id: "1", name: "html" },
      { _id: "2", name: "css" },
    ],
    author: {
      _id: "2",
      name: "Su Ming",
      picture:
        "https://static.wikia.nocookie.net/pursuit-of-the-truth-novel/images/f/f1/AHR0cDovL2ltZzAuaW1ndG4uYmRpbWcuY29tL2l0L3U9MjM4ODE0ODQwOSwyMzQ4MjY1NzU1JmZtPTI2JmdwPTAuanBn.jpg/revision/latest?cb=20181226225413",
    },
    upvotes: 80,
    views: 350,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Theres no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your query could be the next big thing others learn from.
          Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}

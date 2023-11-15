import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="flex-center h-screen flex-col p-5 font-inter">
        <div className=" text-center text-3xl font-bold max-sm:text-xl">
          This page either does not exist or has mysteriously disappeared.
        </div>

        <div className="mt-3 text-center font-semibold max-sm:px-5">
          Perhaps the page has ascended to a new world?
        </div>

        <Link href="/" className="mt-10 flex justify-center max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Take Me Back To Our World
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;

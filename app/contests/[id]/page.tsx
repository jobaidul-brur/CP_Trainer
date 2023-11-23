"use client";
import React, { useEffect } from "react";
import Statusbar from "./statusbar";
import ContestNavbar from "./contestNavbar";
import Problems from "./problems";
import Submissions from "./submissions";
import StandingPage from "./standing";

interface Props {
  params: {
    id: string;
  };
}

interface ContestData {
  id: string;
  name: string;
  authorId: string;
  authorName: string;
  startTime: string;
  Duration: number;
  createdAt: string;
  problems: {
    id: string;
    name: string;
    time_limit: string;
    memory_limit: string;
  }[];
  participants: { id: string }[];
}

export default function ContestPage({ params: { id } }: Props) {
  const [contest, setContest] = React.useState<ContestData>();

  const [currPage, setCurrPage] = React.useState(1);

  const handleClickOfNavigation = (page: number) => {
    console.log(page);
    setCurrPage(page);
  };

  useEffect(() => {
    const fetchContest = async () => {
      const res = await fetch(`${process.env.BASE_URL}/api/contests/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setContest(data);
    };
    fetchContest();
  });
  console.log(contest);

  // i wanted to make
  return (
    <div className="bg-white m-2 rounded relative p-5">
      {/* <div className=" flex flex-row justify-center items-center ">
        <span className="  font-bold text-lg  "> {contest?.name} </span>
      </div> */}
      <Statusbar
        contestName={contest?.name!}
        contestStartTime={contest?.startTime!}
        contestEndTime={"xyz"}
      />
      <ContestNavbar handleClickOfNavigation={handleClickOfNavigation} />
      <hr className="my-2 w-full " />
      {currPage === 1 && <Problems contest={contest!} />}
      {currPage == 2 && <Submissions />}
      {currPage == 3 && <StandingPage />}
    </div>
  );
}

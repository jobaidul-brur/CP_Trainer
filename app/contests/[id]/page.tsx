"use client";
import React, { useEffect } from "react";
import Statusbar from "./statusbar";
import ContestNavbar from "./contestNavbar";
import Problems from "./problems";
import Submissions from "./submissions";
import StandingPage from "./standing";
import SingleProblem from "./problem";

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
  startTime: Date;
  duration: number;
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
  const [contest, setContest] = React.useState<ContestData | null>(null);

  const [currPage, setCurrPage] = React.useState(1);

  const handleClickOfNavigation = (page: number) => {
    console.log(page);
    setCurrPage(page);
  };
  const [problemNo, setProblemNo] = React.useState(-1);
  const handleClickOfProblem = (problemNo: number) => {
    console.log(`problem no ${problemNo} clicked`);
    setProblemNo(problemNo);
    setCurrPage(4);
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
  }, []);
  console.log(contest);

  // i wanted to make
  return (
    <div className="bg-white p-10 mx-10">
      {contest && (
        <div>
          <Statusbar
            contestName={contest.name}
            contestStartTime={contest.startTime}
            duration={contest.duration}
          />
          <ContestNavbar handleClickOfNavigation={handleClickOfNavigation} />
          <hr className="my-2 w-full " />
          {currPage === 1 && (
            <Problems
              handleClickOfProblem={handleClickOfProblem}
              contest={contest}
            />
          )}
          {currPage == 2 && <Submissions contestId={contest.id} />}
          {currPage == 3 && <StandingPage contestId={contest.id} />}
          {currPage == 4 && (
            <SingleProblem
              problemID={contest.problems[problemNo].id}
              constID={contest.id}
              indexInContest={String(problemNo + 1)}
            />
          )}{" "}
        </div>
      )}
    </div>
  );
}

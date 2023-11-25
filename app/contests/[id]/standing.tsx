"use client";
import React, { useEffect } from "react";
import StandingRow from "./singRow";
interface Props {
  contestId: string;
}

interface Submission {
  id: string;
  remoteRunId: string;
  problemId: string;
  userId: string;
  contestId: string;
  verdict: string;
  language: string;
  createdAt: string;
  sourceCode: string;
  time: number;
  memory: number;
}
interface Cell {
  isSolved: boolean;
  problemId: string;
  solveAt: Date;
  waCnt: number;
}
interface Row {
  userId: string;
  userName: string;
  solveCnt: number;
  totalPenalty: number;
  cells: Cell[];
}

const StandingPage = ({ contestId }: Props) => {
  const [rows, setRows] = React.useState<Row[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(
        `${process.env.BASE_URL}/api/contests/${contestId}`,
        {
          method: "POST",
          body: JSON.stringify({
            rank: "rank",
          }),
          cache: "no-store",
          credentials: "include",
        }
      );
      const data: Row[] = await res.json();
      console.log(data);
      setRows(data);
    };

    // Call fetchSubmissions immediately
    fetchSubmissions();

    // Then call fetchSubmissions every minute
    const intervalId = setInterval(fetchSubmissions, 60 * 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  if (!rows) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>rank</th>
            <th>username</th>
            <th>solved</th>
            <th>penalty</th>
            <th className=" text-center ">Problems</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <StandingRow key={index} row={row} rank={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingPage;

import ShowProblem from "@/components/showProblem/ShowProblem";
import SubmitPage from "@/components/submitPage/SubmitPage";
import React, { use, useEffect, useState } from "react";
interface Props {
  problemID: string;
  constID: string;
  indexInContest: string;
}

interface Problem {
  id: string;
  contest_id: number;
  index: string;
  name: string;
  solvedCount: number;
  // tags: string[];
  rating: number;
  time_limit: string;
  memory_limit: string;
  problem_statement: string;
  input_specification: string;
  output_specification: string;
  sample_tests: string;
  note: string;
}

const SingleProblem = ({ problemID, constID, indexInContest }: Props) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  useEffect(() => {
    const fetchContest = async () => {
      const res = await fetch(
        `${process.env.BASE_URL}/api/problems/${problemID}`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );
      setProblem(await res.json());
    };
    fetchContest();
  }, []);
  return (
    <div>
      {problem && (
        <div>
          <ShowProblem problem={problem} indexInContest={indexInContest} />
          <SubmitPage id={problemID} contestID={constID} />
        </div>
      )}
    </div>
  );
};

export default SingleProblem;

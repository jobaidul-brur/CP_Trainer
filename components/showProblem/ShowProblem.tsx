import React from "react";

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
interface Props {
  problem: Problem;
}

const ShowProblem = ({ problem }: Props) => {
  return (
    <div>
      <div className={"pt-2 pb-2 pl-4 pr-4"}>
        <div className={"problem-title pb-4 text-lg font-bold"}>
          <h2 className={""}>{problem.name}</h2>
        </div>
        <hr />
        <div className="bg-gray-50 flex justify-between p-4">
          <div>
            Time Limit: <span>{problem.time_limit}</span>
          </div>
          <div>
            Memory Limit: <span>{problem.memory_limit}</span>
          </div>
        </div>
        <h1 className={"mt-3 pb-4 font-bold"}>Problem Statements</h1>
        <hr />
        <div className="problem-statement p-4 bg-gray-50">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: problem.problem_statement }}
          />
        </div>
        <h1 className={"font-bold mt-3 pb-4"}>Input</h1>
        <hr />
        <div className="p-4 bg-gray-50">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: problem.input_specification }}
          />
        </div>
        <h1 className={"mt-3  pb-4 font-bold"}>Output</h1>
        <hr />
        <div className="p-4 bg-gray-50">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: problem.output_specification }}
          />
        </div>
        <h1 className={"mt-3 pb-4 font-bold"}>Examples</h1>
        <hr />
        <div className="p-4 bg-gray-50">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: problem.sample_tests }}
          />
        </div>
        <h1 className={"mt-3 pb-4 font-bold"}>Note</h1>
        <hr />
        <div className="p-4 bg-gray-50">
          {problem.note && (
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: problem.note.replace("Note", " "),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProblem;

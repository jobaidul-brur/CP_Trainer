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
const Description = ({ problem }: Props) => {
  return (
    <>
      <div className={"w-1/4 pr-10 pt-2"}>
        <div className="block">
          <div className="flex center m-1">
            <button className="btn btn-xs btn-outline">Submit</button>
            <button className="btn btn-xs btn-outline ml-2">Favourite</button>
          </div>
        </div>
        <div className="card shadow-xl mt-10">
          <div className="card-body">
            <p>Time limit : {problem.time_limit}</p>
            <p>Mem limit : {problem.memory_limit}</p>
          </div>
        </div>
      </div>

      <div className={"block w-3/4 mr-32"}>
        <div className={"flex content-center"}>
          <h2 className={"text-3xl"}>{problem.name}</h2>
          <a
            href={"problem.problem_link"}
            className={"text-xl pl-5 text-blue-700"}
          >
            Link
          </a>
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Problem Statements</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.problem_statement }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Input</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.input_specification }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Output</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.output_specification }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Examples</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.sample_tests }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Note</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.note }}
          />
        </div>
      </div>
    </>
  );
};

export default Description;

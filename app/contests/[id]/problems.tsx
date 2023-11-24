import { handleClientScriptLoad } from "next/script";
import React from "react";

interface ContestData {
  id: string;
  name: string;
  authorId: string;
  authorName: string;
  // startTime: DateTime;
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

interface Props {
  contest: ContestData;
  handleClickOfProblem: (problemNo: number) => void;
}

export default function Problems({ contest, handleClickOfProblem }: Props) {
  return (
    <div>
      {" "}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left">No</th>
            <th className="text-left">Title</th>
            <th className="text-left">Time Limit</th>
            <th className="text-left">Memory Limit</th>
          </tr>
        </thead>
        <tbody>
          {/* I wanted to map for each problems  */}

          {contest?.problems.map((problem, index) => (
            <tr
              className={`text-gray-700 p-3 mb-2 hover:bg-blue-100  ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={problem.id}
            >
              <td className="text-left">{index + 1}</td>
              <td
                onClick={() => handleClickOfProblem(index)}
                className="text-left hover:underline hover:cursor-pointer"
              >
                {problem.name}
              </td>

              <td className="text-left text-sm">{problem.time_limit}</td>
              <td className="text-left text-sm">{problem.memory_limit}</td>
            </tr>
          ))}

          {/* Problem B, C, D, E, F - Add similar rows for other problems */}
        </tbody>
      </table>
    </div>
  );
}

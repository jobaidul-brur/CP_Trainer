import React from "react";

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

interface Props {
  contest: ContestData;
}

export default function Problems({ contest }: Props) {
  return (
    <div>
      {" "}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="">id</th>
            <th className="">name</th>
            <th className="">limte limite</th>
            <th className="">memory limite</th>
          </tr>
        </thead>
        <tbody>
          {/* I wanted to map for each problems  */}

          {contest?.problems.map((problem, index) => (
            <tr
              className={`text-gray-700 p-3 mb-2 hover:bg-blue-100 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={problem.id}
            >
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{problem.name}</td>

              <td className="text-center text-sm">{problem.time_limit}</td>
              <td className="text-center text-sm">{problem.memory_limit}</td>
            </tr>
          ))}

          {/* Problem B, C, D, E, F - Add similar rows for other problems */}
        </tbody>
      </table>
    </div>
  );
}

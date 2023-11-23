import React from "react";

//
//  {
//       rank: 3,
//       username: "sayeef_1903006",
//       displayName: "Sayeef",
//       solved: 2500,
//       penalty: {
//         minutes: 191,
//         hms: "3:11:05",
//       },
//       problems: [
//         { time: "0:04:19", points: 100, firstSolver: true },
//         { time: "0:02:45", points: 200 },
//         { time: "0:18:34", points: 400 },
//         { time: "0:15:08", points: 500 },
//         { time: "0:59:10", points: 600 },
//         { time: "0:56:09", points: 700 },
//       ],
//     },

// make an interface for this

interface Props {
  participant: {
    rank: number;
    username: string;
    displayName: string;
    solved: number;
    penalty: {
      minutes: number;
      hms: string;
    };
    problems: {
      time: string;
      points: number;
      firstSolver?: boolean;
    }[];
  };
}

const StandingRow = ({ participant }: Props) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td>{participant.rank}</td>
      <td className="">
        <a
          href={`/user/${participant.username}`}
          title={`${participant.displayName} (${participant.username})`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {participant.displayName}{" "}
          {/* <span className="text-gray-500">({participant.username})</span> */}
        </a>
      </td>

      <td className="py-2 px-4 ">{participant.solved}</td>
      <td className="py-2 px-4 ">
        {participant.penalty.hms} ({participant.penalty.minutes} min)
      </td>
      <td className="py-2 px-4 ">{participant.rank}</td>
      <td className="py-2 px-4">
        <div className="flex flex-wrap items-center gap-2">
          {participant.problems.map((problem, index) => (
            <div
              key={index}
              className={`rounded-lg p-2  ${
                problem.firstSolver
                  ? "bg-blue-700 text-white"
                  : "bg-blue-200 text-blue-900"
              }`}
            >
              <span className="block mb-1">{problem.time}</span>
              <b>{problem.points}</b>
              {problem.firstSolver && <span className="text-sm">(-1)</span>}
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default StandingRow;

import Link from "next/link";
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
interface Props {
  row: Row;
  rank: number;
}

const StandingRow = ({ row, rank }: Props) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td>{rank}</td>
      <td className="">
        <Link
          href={`/user/${row.userId}`}
          title={`${row.userName}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {row.userName}{" "}
        </Link>
      </td>

      <td className="py-2 px-4 ">{row.solveCnt}</td>
      <td className="py-2 px-4 ">{row.totalPenalty} min</td>

      <td className="py-2 px-4">
        <div className="flex flex-wrap items-center gap-2">
          {row.cells.map((cell, index) => (
            <div key={index} className="">
              {cell.isSolved && (
                <div className="flex flex-col items-center justify-center w-20 h-12 bg-green-300 ">
                  <span>
                    {new Date(cell.solveAt).toISOString().slice(11, 19)}
                  </span>
                  <span>(-{cell.waCnt})</span>
                </div>
              )}
              {!cell.isSolved && cell.waCnt > 0 && (
                <div className="flex items-center justify-center w-20 h-12 bg-red-300">
                  <span className="text-w">(-{cell.waCnt})</span>
                </div>
              )}
              {!cell.isSolved && cell.waCnt === 0 && (
                <div className="flex items-center justify-center w-20 h-12 bg-slate-50">
                  <span className="text-w">-</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default StandingRow;

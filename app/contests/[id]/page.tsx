"use client";
import React, { useEffect } from "react";

interface Props {
  params: {
    id: string;
  };
}

interface ContestData {
  id: string;
  name: string;
  authorId: string;
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

  useEffect(() => {
    const fetchContest = async () => {
      const res = await fetch(`${process.env.BASE_URL}/api/contest/${id}`, {
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

  // i wanted to make
  return (
    <div className="bg-white m-2 rounded relative p-5">
      <div className=" flex flex-row justify-center items-center ">
        <span className="  font-bold text-lg  "> {contest?.name} </span>
      </div>
      <hr className="my-2 w-full " />
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

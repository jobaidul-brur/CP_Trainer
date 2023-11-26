import Link from "next/link";
import React from "react";

interface Contest {
  id: string;
  name: string;
  authorId: string;
  authorName: string;
  startTime: Date;
  duration: number;
  createdAt: Date;
}

const Contests = async () => {
  const BASE_URL = process.env.BASE_URL;
  const res = await fetch(BASE_URL + "/api/contests", {
    cache: "no-store",
    credentials: "include",
  });
  const contests: Contest[] = await res.json();
  return (
    <div className="flex flex-col justify-left items-center  bg-white  mx-10">
      <table className=" border-none w-5/6 mx-auto border-collapse border my-10">
        <caption>
          <h1 className="text-2xl mb-4 font-bold">Contest List</h1>
        </caption>
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Begin Time</th>
            <th className="px-4 py-2">Length</th>
            <th className="px-4 py-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {contests.map((contest, index) => (
            <tr
              className={`text-gray-700 pb-3 hover:bg-blue-100 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={contest.id}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 hover:underline">
                <Link href={"contests/" + contest.id}>{contest.name}</Link>
              </td>
              <td className="px-4 py-2">
                {new Date(contest.startTime).toLocaleString()}
              </td>
              <td className="px-4 py-2">{contest.duration}</td>
              <td className="px-4 py-2">{contest.authorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <br /> <br />
      <div className="join">
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          checked
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
        />
      </div> */}
    </div>
  );
};

export default Contests;

"use client";
import { useState } from "react";

const ContestForm = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [contestName, setContestName] = useState<string>("");
  const [problemIds, setProblemIds] = useState<string[]>([]);

  const [username, setUsername] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex flex-col justify-left items-center bg-white mx-10">
      <div className="form-container bg-white shadow-orange-100 p-5 rounded-xl">
        <h1 className="text-2xl mb-4 font-bold">Create Contest</h1>
        <div className="px-4 py-2">
          <label className="font-bold mr-4">Contest Name</label>
          <input
            type="text"
            placeholder="Contest Name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setContestName(e.target.value)}
          />
        </div>
        <div className="px-4 py-2">
          <label className="font-bold">Usernames:</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            onChange={handleChange}
          />
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            onClick={() => setUsernames([...usernames, username])}
          >
            Add
          </button>
        </div>
        <div className="px-4 py-2">
          <label className="font-bold mr-4">Start Time</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="px-4 py-2">
          <label className="font-bold mr-4">Duration (in minutes)</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div className="px-4 py-2">
          <label className="font-bold mr-4">Problem IDs</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setProblemIds(e.target.value.split(","))}
          />
        </div>
        <div className="px-4 py-2">
          <button className="w-20 px-4 py-2 bg-blue-500 text-white rounded-md">
            Create
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default ContestForm;

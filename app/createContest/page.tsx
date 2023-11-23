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
    <div className=" p-4  flex flex-row justify-center items-center">
      <div className=" flex flex-col items-center justify-center  p-6">
        <div className=" h-auto w-auto bg-white shadow-orange-100 p-5 rounded-xl ">
          <h2 className=" font-extrabold  mb-2"> Create Contest </h2>
          <hr className=" w-full mb-4" />
          <div>
            <div className="mb-4">
              <label className="font-bold mr-4">Contest Name</label>
              <input
                type="text"
                placeholder="Contest Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => setContestName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mt-2">
                <label className="font-bold">Usernames:</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  onClick={() => setUsernames([...usernames, username])}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <label className="font-bold mr-4">Start Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex">
                <label className="font-bold mr-4">Start Time:</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Duration"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
            <button className=" w-20 px-4 py-2 bg-blue-500 text-white rounded-md">
              Create
            </button>{" "}
          </div>
        </div>{" "}
      </div>

      <div className=" h-auto w-auto bg-white shadow-orange-100 p-5 rounded-xl ">
        <h2 className=" font-extrabold  mb-2"> usernames </h2>
        <div className="flex flex-col justify-start items-start space-x-2">
          {usernames.map((username, index) => (
            <span
              key={index}
              className="px-3 py-1 m-1 text-base badge text-blue-700 rounded-lg underline-offset-0"
            >
              {username}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestForm;

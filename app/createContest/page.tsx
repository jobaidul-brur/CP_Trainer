"use client";
import { useEffect, useState } from "react";
import { set } from "zod";

interface User {
  id: string;
  userName: string;
}

const ContestForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [contestName, setContestName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [totalProblems, setTotalProblems] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("user");
    setUser(JSON.parse(data!));
  }, []);

  useEffect(() => {
    // Fetch users from your API and set them to the state
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Replace with your API endpoint
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  const handleCreateContest = async () => {
    const response = await fetch("/api/createContest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contestName,
        authorId: user?.id,
        startTime: new Date(`${startDate}T${startTime}`).toISOString(),
        duration: duration,
        participantIds: selectedUsers.map((user) => user.id),
        totalProblems: totalProblems,
      }),
    });
    if (response.status === 200) {
      alert("Contest Created Successfully");
      const data = await response.json();
      window.location.href = `/contests/${data.contestId}`;
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className=" p-4  flex flex-col justify-center bg-white mx-10">
      <div className="w-full flex flex-col items-center justify-center  p-6">
        <div className=" bg-white shadow-orange-100 p-5 rounded-xl ">
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
            <div className="space-y-2">
              <div className="flex">
                <label className="font-bold mr-4 pt-2">Start Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex">
                <label className="font-bold mr-4 pt-2">Start Time:</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <label className="font-bold mr-4">Duration</label>
              <input
                type="number"
                placeholder="Duration in minutes"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="font-bold mr-4">Total Problems: </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => setTotalProblems(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mt-2">
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  onChange={handleChange}
                  value={selectedUserId}
                >
                  <option disabled value="">
                    Select a username
                  </option>
                  {users.map((user, index) => (
                    <option
                      key={index}
                      value={user.id}
                      disabled={selectedUsers.includes(user)}
                    >
                      {user.userName}
                    </option>
                  ))}
                </select>
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  onClick={() => {
                    const user = users.find(
                      (user) => user.id === selectedUserId
                    );
                    if (user) {
                      setSelectedUsers([...selectedUsers, user]);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <button
              onClick={handleCreateContest}
              className=" w-20 px-4 py-2 mt-2 bg-blue-500 text-white rounded-md"
            >
              Create
            </button>{" "}
          </div>
        </div>{" "}
      </div>

      <div className="  bg-white shadow-orange-100  rounded-xl ">
        {selectedUsers && (
          <div>
            <div className="flex flex-col  justify-left">
              <div className="flex flex-col items-center justify-center">
                <h2 className=" font-extrabold  mb-2"> Selected Users </h2>
                <hr className=" w-full mb-4" />
                <table className="border-none w-5/6 mx-auto border-collapse border">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-700 text-left">
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUsers.map((user, index) => (
                      <tr
                        className={`text-gray-700 pb-3 hover:bg-blue-100 ${
                          index % 2 === 1 ? "bg-gray-100" : "bg-white"
                        }`}
                        key={user.id}
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{user.userName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestForm;

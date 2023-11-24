"use client";
import React from "react";

const CreateContest = () => {
  const handleClick = async () => {
    const problemIds = [
      "952G",
      "954A",
      "954B",
      "954C",
      "954D",
      "954E",
      "954F",
      "954G",
      "954H",
      "954I",
      "955A",
    ];

    const participantIds = ["user1", "user2", "user3"];
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/api/createContest`, {
      method: "POST",
      body: JSON.stringify({
        name: "So You Have Chosen Death",
        authorID: "admin",
        startTime: "2022-11-24T14:00:00.000Z",
        duration: 120,
        problemIds: problemIds,
        participantIds: participantIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status !== 200) {
      console.log("Error: ", res);
      return;
    }
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleClick}>Create Contest</button>
    </div>
  );
};

export default CreateContest;

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

    const participantIds = [
      "clp2in1yf0000nqxcvcdx0tx7",
      "clp5w1mwr0000nq40xizqacv5",
      "clp9tbt4n0008nqscsy34exbg",
    ];
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/api/createContest`, {
      method: "POST",
      body: JSON.stringify({
        name: "So You Have Chosen Death",
        authorID: "clp2in1yf0000nqxcvcdx0tx7",
        startTime: "2021-08-15T14:00:00.000Z",
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

"use client";
import React from "react";

const FetchProblems = () => {
  const handleClick = async () => {
    const res = await fetch("https://codeforces.com/api/problemset.problems", {
      cache: "no-store",
    });
    const problems = await res.json();
    console.log(problems);
  };
  return <button onClick={handleClick}>Fetch</button>;
};

export default FetchProblems;

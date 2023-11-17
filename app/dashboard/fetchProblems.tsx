"use client";
import React, { useState } from "react";

const FetchProblems = () => {
  const [alert, setAlert] = useState(false);
  const handleClick = async () => {
    const res = await fetch("/api/fetchProblems");
    if (res["status"] !== 200) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };
  return (
    <>
      {alert && (
        <div className="alert alert-error">
          There was an error fetching the problems.
        </div>
      )}
      <button onClick={handleClick}>Fetch</button>
    </>
  );
};

export default FetchProblems;

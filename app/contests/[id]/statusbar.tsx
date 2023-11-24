"use client";
import React, { useEffect, useState } from "react";

interface Props {
  contestName: string;
  contestStartTime: Date;
  duration: number;
}

export default function Statusbar({
  contestName,
  contestStartTime,
  duration,
}: Props) {
  const initialElapsedSeconds = Math.floor(
    (new Date().getTime() - new Date(contestStartTime).getTime()) / 1000
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(initialElapsedSeconds);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId); // This clears the interval when the component unmounts
  }, []);
  return (
    <div className="row card pt-4 pb-4" id="time-info">
      <div className="flex">
        <div className="w-1/3">
          <b>Begin: </b>
          <span className="timestamp ">
            {new Date(contestStartTime).toLocaleString()}
          </span>
        </div>
        <div className="w-1/3 text-center text-3xl">
          <h1>
            <i id="btn-favorite" className="fa fa-star-o"></i>
            {contestName}
          </h1>
        </div>
        <div className="w-1/3 text-right">
          <b>End: </b>
          <span className="timestamp">
            {new Date(
              new Date(contestStartTime).getTime() + duration * 60 * 1000
            ).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex" id="contest-time-slider-container">
        {/* Add your slider component here */}
      </div>
      <div className="flex">
        <div className="w-1/3 text-left" id="info-elapsed"></div>
        <div className="w-1/3 text-center">
          {new Date(contestStartTime).getTime() + duration * 60 * 1000 <
          new Date().getTime() ? (
            <span id="info-running" className="text-green-500">
              {new Date(elapsedSeconds * 1000).toISOString().slice(11, 19)}
            </span>
          ) : (
            <span id="info-running" className="text-green-500">
              Ended
            </span>
          )}
        </div>
        <div className="w-1/3 text-right" id="info-remaining"></div>
      </div>
    </div>
  );
}

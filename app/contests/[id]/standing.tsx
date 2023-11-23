import React from "react";
import StandingRow from "./singRow";

const StandingPage = () => {
  // Example data for a participant
  const participant = {
    rank: 2,
    username: "sayeef_1903006",
    displayName: "Sayeef",
    solved: 2500,
    penalty: {
      minutes: 191,
      hms: "3:11:05",
    },
    problems: [
      { time: "0:04:19", points: 100, firstSolver: true },
      { time: "0:02:45", points: 200 },
      { time: "0:18:34", points: 400 },
      { time: "0:15:08", points: 500 },
      { time: "0:59:10", points: 600 },
      { time: "0:56:09", points: 700 },
    ],
  };

  const participants = [
    {
      rank: 1,
      username: "sayeef_1903006",
      displayName: "Sayeef",
      solved: 2500,
      penalty: {
        minutes: 191,
        hms: "3:11:05",
      },
      problems: [
        { time: "0:04:19", points: 100, firstSolver: true },
        { time: "0:02:45", points: 200 },
        { time: "0:18:34", points: 400 },
        { time: "0:15:08", points: 500 },
        { time: "0:59:10", points: 600 },
        { time: "0:56:09", points: 700 },
      ],
    },
    {
      rank: 2,
      username: "sayeef_1903006",
      displayName: "Sayeef",
      solved: 2500,
      penalty: {
        minutes: 191,
        hms: "3:11:05",
      },
      problems: [
        { time: "0:04:19", points: 100, firstSolver: true },
        { time: "0:02:45", points: 200 },
        { time: "0:18:34", points: 400 },
        { time: "0:15:08", points: 500 },
        { time: "0:59:10", points: 600 },
        { time: "0:56:09", points: 700 },
      ],
    },
    {
      rank: 3,
      username: "sayeef_1903006",
      displayName: "Sayeef",
      solved: 2500,
      penalty: {
        minutes: 191,
        hms: "3:11:05",
      },
      problems: [
        { time: "0:04:19", points: 100, firstSolver: true },
        { time: "0:02:45", points: 200 },
        { time: "0:18:34", points: 400 },
        { time: "0:15:08", points: 500 },
        { time: "0:59:10", points: 600 },
        { time: "0:56:09", points: 700 },
      ],
    },
  ];

  const problems = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>rank</th>
            <th>username</th>
            <th>score</th>
            <th>penalty</th>
            <th>solved</th>
            <th className=" text-center ">Problems</th>
          </tr>
        </thead>

        <tbody>
          {participants.map((participant, index) => (
            <StandingRow key={index} participant={participant} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingPage;

import React from "react";

interface Submission {
  id: string;
  remoteRunId: string;
  problemId: string;
  userId: string;
  contestId: string;
  verdict: string;
  language: string;
  createdAt: string;
  sourceCode: string;
  time: number;
  memory: number;
}
const Submissions = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/submissions`, {
    cache: "no-store",
    credentials: "include",
  });
  const submissions: Submission[] = await res.json();
  return (
    <div>
      <table className="table table-pin-rows table-pin-col">
        <thead className="thead-light">
          <tr className="table-header">
            <th>Username</th>
            <th>OJ</th>
            <th>Problem</th>
            <th>Result</th>
            <th>time</th>
            <th>Memory</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody className="">
          {submissions.map((submission, index) => (
            <tr key={submission.id}>
              <td>{submission.userId}</td>
              <td>{"Codeforces"}</td>
              <td>{submission.problemId}</td>
              <td>{submission.verdict}</td>
              <td>{submission.time}</td>
              <td>{submission.memory}</td>
              <td>{submission.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;

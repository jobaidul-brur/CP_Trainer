import React from "react";
interface Props {
  params: {
    id: string;
  };
}

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
const RenderSubmission = async ({ params: { id } }: Props) => {
  const res = await fetch(`${process.env.BASE_URL}/api/submissions/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  const submission: Submission = await res.json();
  return (
    <div>
      <div>
        <span className="mr-3">ProblemID {submission.problemId}</span>
        <span className="mr-3">Verdict {submission.verdict}</span>
        <span className="mr-3">Time {submission.time}</span>
        <span className="mr-3">Memory {submission.memory}</span>
        <span>Lang {submission.language}</span>
      </div>
      <div className="mockup-code">
        <pre>{submission.sourceCode}</pre>
      </div>
    </div>
  );
};

export default RenderSubmission;

"use client";
import React, { useState, useEffect } from "react";
import { set } from "zod";

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

const Submissions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const handleModal = async (id: string) => {
    console.log(id);
    const res = await fetch(`${process.env.BASE_URL}/api/submissions/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    const data: Submission = await res.json();
    setSubmission(data);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(`${process.env.BASE_URL}/api/submissions`, {
        cache: "no-store",
        credentials: "include",
      });
      const data: Submission[] = await res.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="flex flex-col justify-left items-center  bg-white  mx-10">
      <table className="border-none w-5/6 mx-auto border-collapse border my-10">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">OJ</th>
            <th className="px-4 py-2">Problem</th>
            <th className="px-4 py-2">Result</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Memory</th>
            <th className="px-4 py-2">Language</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr
              className={`text-gray-700 pb-3 hover:bg-blue-100 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={submission.id}
            >
              <td className="px-4 py-2">{submission.userId}</td>
              <td className="px-4 py-2">{"Codeforces"}</td>
              <td className="px-4 py-2">{submission.problemId}</td>

              <td className="px-4 py-2 hover:text-slate-400">
                <a onClick={() => handleModal(submission.id)} className="">
                  {submission.verdict}
                </a>
              </td>
              <td className="px-4 py-2">{submission.time}</td>
              <td className="px-4 py-2">{submission.memory}</td>
              <td className="px-4 py-2">{submission.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-40">
          <div className="flex items-center justify-center min-h-screen">
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-3/4 h-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Submission {submission?.id}
                </h2>
                <div className="mt-2">
                  <div>
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden mx-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Problem
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Verdict
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Memory
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Language
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission?.problemId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission?.verdict}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission?.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission?.memory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission?.language}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    Source
                    <div className="mockup-code bg-gray-100 text-black">
                      {submission?.sourceCode.split("\n").map((line, index) => (
                        <pre data-prefix={index + 1}>{line}</pre>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;

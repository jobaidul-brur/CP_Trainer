"use client";
import React, { useEffect, useState } from "react";
import SelectLanguage from "./SelectLanguage";

interface Props {
  id: string;
}
interface User {
  userName: string;
  id: string;
}

const SubmitPage = ({ id }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("73");
  const onSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    setUser(JSON.parse(data!));
  }, []);

  const handleClick = async () => {
    const codeInput = document.getElementById(
      "codeInput"
    ) as HTMLTextAreaElement;
    console.log(codeInput.value);
    const res = await fetch(`${process.env.BASE_URL}/api/submit`, {
      method: "POST",
      body: JSON.stringify({
        code: codeInput.value,
        problemId: id,
        languageId: selectedLanguage,
        userId: user?.id,
        contestID: "practice",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log("Submission log: ", data);
  };
  return (
    <div className="pt-2 pb-2 pl-4 pr-4">
      <div className="select-language pb-1 text-lg font-bold">
        <h2>Select Language</h2>
      </div>
      <SelectLanguage onSelectLanguage={onSelectLanguage} />
      <div className="pt-4">
        <textarea
          id="codeInput"
          name="codeInput"
          className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter code here..."
          rows={10}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default SubmitPage;

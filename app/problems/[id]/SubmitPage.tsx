"use client";
import React, { useState } from "react";
import SelectLanguage from "./SelectLanguage";

interface Props {
  id: string;
}

const SubmitPage = ({ id }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("73");
  const onSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      Select Language
      <SelectLanguage onSelectLanguage={onSelectLanguage} />
      <div> {selectedLanguage} </div>
      <div className="p-4">
        <label
          className="block mb-2 font-bold text-gray-700"
          htmlFor="codeInput"
        >
          Enter Your Code:
        </label>
        <textarea
          id="codeInput"
          name="codeInput"
          className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter code here..."
          rows={10}
        ></textarea>
      </div>
      <button className="btn btn-outline" onClick={handleClick}>
        Submit
      </button>
    </>
  );
};

export default SubmitPage;

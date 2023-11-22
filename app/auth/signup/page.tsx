"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { set } from "zod";

const signup = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cfhandle, setcfhandle] = useState("");

  const [errorUsername, seterrorUsername] = useState(false);
  const [errorPassword, seterrorPassword] = useState(false);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const handleChangeCfhandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcfhandle(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirm_password = event.target.value;
    if (confirm_password !== password) {
      seterrorPassword(true);
    } else {
      seterrorPassword(false);
    }
  };

  const router = useRouter();
  const handleSignup = async () => {
    console.log(username, password, cfhandle);
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(BASE_URL + "/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, cfhandle }),
    });
    if (res["status"] === 200) {
      seterrorUsername(false);
      router.push("/auth/login");
    } else {
      seterrorUsername(true);
    }
  };

  return (
    <div className=" border h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  p-20  w-auto h-auto bg-white rounded-lg ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <div className="flex flex-col justify-center items-center">
              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="text"
                placeholder="Enter your name"
                onChange={(event) => handleChangeUsername(event)}
              />
              {errorUsername && (
                <div className="text-red-500">Username already exists</div>
              )}
              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="text"
                placeholder="Enter your codeforces handle"
                onChange={(event) => handleChangeCfhandle(event)}
              />
              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="password"
                placeholder="Enter your password"
                onChange={(event) => handleChangePassword(event)}
              />
              {errorPassword && (
                <div className="text-red-500">Passwords do not match</div>
              )}

              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="password"
                placeholder="Confirm your password"
                onChange={(event) => handleCheckPassword(event)}
              />
              <button
                className="bg-blue-500 rounded-lg px-4 py-2 m-2 text-white"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default signup;

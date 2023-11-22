"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState(false);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const router = useRouter();

  const handleLogin = async () => {
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(BASE_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res["status"] === 200) {
      seterror(false);

      const user = await res.json();
      console.log("Login successful 200", user);

      // store it in local storeage

      console.log("user", user);
      localStorage.setItem("user", JSON.stringify(user.data));
      let userData = localStorage.getItem("user");
      userData = JSON.parse(userData!);
      console.log("userData", userData);
      router.push("/");
    } else {
      seterror(true);
      console.log("Login failed 401");
    }
  };

  return (
    <div className=" border h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  p-20  w-auto h-auto bg-white rounded-lg ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="flex flex-col justify-center items-center">
              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="text"
                placeholder="Enter your name"
                onChange={(event) => handleChangeUsername(event)}
              />
              <input
                className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2"
                type="password"
                placeholder="Enter your password"
                onChange={(event) => handleChangePassword(event)}
              />
              {error && (
                <span className="text-red-500">
                  UserName or Password is incorrect
                </span>
              )}
              s
              <button
                className="bg-blue-500 rounded-lg px-4 py-2 m-2 text-white"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <hr className="w-full mt-2 mb-2" />
            <span className=" font-bold inline-block ">or</span>
            <Link
              className=" btn  hover:bg-blue-600 hover:text-white "
              href="/auth/signup"
            >
              {" "}
              sing up{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;

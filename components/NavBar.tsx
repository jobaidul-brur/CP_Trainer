"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Skeleton from "@/components/Skeleton";

export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/contests",
    title: "Contests",
  },
  {
    id: "/problems",
    title: "Problems",
  },
  {
    id: "/submissions",
    title: "Submissions",
  },
  {
    id: "/dashboard",
    title: "dashboard",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" shadow-md mb-10 ">
      {/* Desktop Navigation */}
      <nav
        className="sm:flex hidden navbar px-5 bg-white text-black"
        style={{
          minHeight: "40px",
        }}
      >
        <div className="navbar-start">
          {navLinks.map((nav) => (
            <span
              key={nav.id}
              onClick={() => setActive(nav.title)}
              // className={`mx-1 pt-2 pb-2 pr-3 pl-3 hover:bg-gray-100  hover:rounded-lg hover:font-light${
              //   nav.title === "Home" ? "text-blue-900 font-bold " : ""
              // }`}
              className="btn btn-ghost btn-md rounded-btn hover:bg-gray-100 hover:text-gray-600"
            >
              <Link href={`${nav.id}`}>{nav.title}</Link>
            </span>
          ))}
        </div>
        <div className="navbar-end">
          <AuthStatus />
        </div>
      </nav>

      {/* Mobile Navigation */}
      {/* <nav className="sm:hidden flex flex-1 justify-end items-center">
        <button
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav> */}
    </div>
  );
};

export default Navbar;

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} height={"32px"} />;
  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Login
      </Link>
    );
  return (
    <details className="dropdown dropdown-left bg-none text-black">
      <summary>
        <div className="avatar">
          <div className="h-8 text-white">
            <p>{session!.user!.email![0]}</p>
          </div>
        </div>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <p>{session!.user!.email}</p>
        </li>
        <li>
          <Link href={"/api/auth/signout"} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </details>
  );
};

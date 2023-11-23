import React from "react";

interface Props {
  handleClickOfNavigation: (page: number) => void;
}

export default function ContestNavbar({ handleClickOfNavigation }: Props) {
  return (
    <div className=" pb-2 pt-2  ">
      <div className=" flex flex-row justify-left  items-center font-bold  ">
        <span
          onClick={() => handleClickOfNavigation(1)}
          className=" mr-3 pt-3 pb-3 pr-4 pl-4  bg-gray-200 rounded-lg hover:bg-blue-300 hover:underline hover:cursor-pointer "
        >
          Problems
        </span>
        <span
          onClick={() => handleClickOfNavigation(2)}
          className=" mr-3 pt-3 pb-3 pr-4 pl-4 bg-gray-200 rounded-lg hover:bg-blue-300 hover:underline hover:cursor-pointer"
        >
          Submissions
        </span>
        <span
          onClick={() => handleClickOfNavigation(3)}
          className=" pt-3 pb-3 pr-4 pl-4 bg-gray-200 rounded-lg hover:bg-blue-300 hover:underline hover:cursor-pointer"
        >
          Standings
        </span>
      </div>
    </div>
  );
}

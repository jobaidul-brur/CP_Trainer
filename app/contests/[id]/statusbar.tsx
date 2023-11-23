import React from "react";

interface Props {
  contestName: string;
  contestStartTime: string;
  contestEndTime: string;
}

export default function Statusbar({
  contestName,
  contestStartTime,
  contestEndTime,
}: Props) {
  return (
    <div className="row card pt-4 pb-4" id="time-info">
      <div className="flex">
        <div className="w-1/3">
          <b>Begin:</b>
          <span className="timestamp">{contestStartTime} BST</span>
        </div>
        <div className="w-1/3 text-center">
          <h3>
            <i id="btn-favorite" className="fa fa-star-o"></i>
            {contestName}
          </h3>
        </div>
        <div className="w-1/3 text-right">
          <b>End:</b>
          <span className="timestamp">{contestEndTime}</span>
        </div>
      </div>
      <div className="flex" id="contest-time-slider-container">
        {/* Add your slider component here */}
      </div>
      <div className="flex">
        <div className="w-1/3 text-left" id="info-elapsed"></div>
        <div className="w-1/3 text-center">
          <span id="info-running" className="text-green-500">
            Ended
          </span>
        </div>
        <div className="w-1/3 text-right" id="info-remaining"></div>
      </div>
    </div>
  );
}

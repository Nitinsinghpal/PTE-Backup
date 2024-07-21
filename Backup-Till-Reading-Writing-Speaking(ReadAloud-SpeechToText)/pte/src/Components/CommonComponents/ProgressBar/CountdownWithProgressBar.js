import React, { useState } from "react";
import "./CountdownWithProgressBar.css";
import useCountdown from "../useCountdown/useCountdown.tsx";
// Define props for the component
const CountdownWithProgressBar = ({duration,onExpire}) => {
  const { CountDownDiv, progressPercentage } = useCountdown(duration,onExpire);

  return (
     <div className="CDWPB-Main">
        <div className="CDWPB-CountDown">{CountDownDiv}</div>
        <div className="CDWPB-ProgressBar-Main">
          <div
            className="CDWPB-ProgressBar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    
  );
};

export default CountdownWithProgressBar;

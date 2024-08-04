import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCountDown } from "./countDownSlice";

function CountDown( duration, active,reset ) {
  //#region Count Down
  
  const [seconds, setSeconds] = useState(duration); // Initial countdown time in seconds
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setSeconds(duration);
  }, [duration,reset]);

  useEffect(() => {
    let intervalId;
    if (seconds === 0) {
      return;
    }
    if (active) {
      if (isActive || active) {
        intervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
      } 
    }else {
      clearInterval(intervalId);
    }
   

    return () => clearInterval(intervalId);
  }, [seconds, isActive, active]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = (100 * (duration - seconds)) / duration;
  //#endregion

  return {seconds,progressPercentage}
  //  (
  //   <div>
  //     {seconds}
  //   </div>
  // );
}

export default CountDown;

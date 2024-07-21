import React, { useEffect, useState } from 'react';

const useCountdown = ( duration,onExpire?: () => void ) => {
  const [seconds, setSeconds] = useState(duration);

    // Calculate progress percentage
    const progressPercentage = (100 * (duration - seconds)) / duration;

  useEffect(() => {
    debugger
    if (seconds <= 0 && onExpire) {
      onExpire();
    }
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    // console.log("initated intervalId: ",intervalId)
    return () => {clearInterval(intervalId)
      // console.log("clearInterval: ",intervalId)
    };
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  let CountDownDiv = (<div><p>{minutes}:{displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}</p></div>)
  let result = {CountDownDiv,minutes,seconds,progressPercentage}
  return result;
};

export default useCountdown;

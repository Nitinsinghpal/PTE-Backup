import React, { useEffect, useState } from "react";

function ProgressBarSynthesisAudio() {
  const [currentValue, setCurrentValue] = useState(0); //ProgressBar
  const [estimatedTime, setEstimatedTime] = useState(0); //ProgressBar
  let data =
  "An English paragraph for reading is a concise piece of text composed of one or more sentences that convey a specific idea, information, or story.";
  useEffect(() => {
    setEstimatedTimeFunc(); //ProgressBar
  }, []);

  useEffect(() => {
    //ProgressBar
    if (currentValue == estimatedTime) {
      return;
    }
    if (currentValue === 0) {
      // handleSpeak()
    }
    const r = setInterval(() => {
      increment();
    }, 1000);

    return () => {
      clearInterval(r);
    };
  }, [currentValue, estimatedTime]);
  function increment() {
    //ProgressBar
    setCurrentValue((p) => p + 1);
  }

  function setEstimatedTimeFunc() {
    //ProgressBar
    const text = data;

    const wordsPerMinute = 140; // Adjust according to average speech rate
    const words = text.split(" ").length;
    let estimatedDurationInSeconds = (words / wordsPerMinute) * 60;
    estimatedDurationInSeconds = estimatedDurationInSeconds.toFixed(0);
    estimatedDurationInSeconds = estimatedDurationInSeconds-1
    setEstimatedTime(estimatedDurationInSeconds);
  }

  return (
    <div>
      <progress
        className="progressBar"
        value={currentValue}
        max={estimatedTime}
      >
        {currentValue}
      </progress>
    </div>
  );
}

export default ProgressBarSynthesisAudio;

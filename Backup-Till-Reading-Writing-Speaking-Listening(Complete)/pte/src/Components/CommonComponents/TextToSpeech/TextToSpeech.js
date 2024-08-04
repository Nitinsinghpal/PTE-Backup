import React, { useEffect, useState } from "react";
import "./TextToSpeech.css";
import CountDown from "../Countdown/Countdown";
import { useSelector } from "react-redux";
import ProgressBarSynthesisAudio from "../ProgressBarSynthesisAudio/ProgressBarSynthesisAudio";
function TextToSpeech({text}) {
  let data = text;
  const [volume, setVolume] = useState(1);
  // const [progress, setProgress] = useState(0); // State for progress bar
  // const [speechStartTime, setSpeechStartTime] = useState(null); 
  // const [speechDuration, setSpeechDuration] = useState(0); 

  const countDown = useSelector((state) => state.countDown);

  let count = CountDown(5, countDown.active, countDown.reset);

  useEffect(() => {
    handleStop();
  }, []);

  useEffect(() => {
    if (count.seconds === 0) {
      handleSpeak();
    }
  }, [count.seconds]);

  // useEffect(() => {
  //   if (speechStartTime && speechDuration > 0) {
  //     const interval = setInterval(() => {
  //       const elapsedTime = (Date.now() - speechStartTime) / 1000; // Time in seconds
  //       if (elapsedTime >= speechDuration) {
  //         setProgress(100);
  //         clearInterval(interval);
  //       } else {
  //         setProgress((elapsedTime / speechDuration) * 100);
  //       }
  //     }, 100);

  //     return () => clearInterval(interval);
  //   }
  // }, [speechStartTime, speechDuration]);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(data);
    const availableVoices = speechSynthesis.getVoices();
    utterance.voice = availableVoices[0];
    utterance.rate = 1;
    utterance.volume = volume;
    utterance.pitch = 1;
    utterance.onstart = () => {
      // setIsSpeaking(true);
    };
    utterance.onend = () => {
      // setIsSpeaking(false);
      // setHistory([...history, text]);
    };
    speechSynthesis.speak(utterance);
  };
  function handleStop(params) {
    speechSynthesis.cancel();
  }
  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="textToSpeech-Main">
      <div className="textToSpeech-Content">
        <p>Status: Begining in {count.seconds}</p>

        <div className="textToSpeech-Volume">
          <p>Volume: </p>
          <input
            className="textToSpeech-Volume-input"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: "100px" }}
          />
        </div>

        {/* ProgressBar */}
        {count.seconds == 0 ? <ProgressBarSynthesisAudio /> : <></>}
        {/* {currentValue} */}

        {/* <label>Volume: {volume}</label> */}
      </div>
      {/* <div>Time Remaining {count.seconds}</div> */}
      {/* {count.seconds == 0 ? handleSpeak() : <></>} */}
      {/* {handleSpeak()} */}
      {/* <button onClick={handleSpeak}>Speak</button>
      <button onClick={handleStop}>Stop</button> */}
    </div>
  );
}

export default TextToSpeech;

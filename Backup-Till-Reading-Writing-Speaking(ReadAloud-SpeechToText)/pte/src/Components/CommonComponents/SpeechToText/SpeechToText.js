import React, { useState, useEffect, useRef } from "react";
import "./SpeechToText.css";
import useCountdown from "../useCountdown/useCountdown.tsx";
import CountdownWithProgressBar from "../ProgressBar/CountdownWithProgressBar";


const SpeechToText = () => {
  const { CountDownDiv, minutes, seconds } = useCountdown(
    5,
    handleExpireCountDown
  );
  // Audio rec
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const [startProgressiveBar, setProgressiveBar] = useState(false);

  // Audio rec
  useEffect(() => {
    // Initialize SpeechRecognition API
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true;
      recognitionRef.current.onresult = (event) => {
        const results = event.results;
        const finalTranscript = Array.from(results)
          .map((result) => result[0].transcript)
          .join("");

        setTranscript(finalTranscript);
      };

      //   recognitionRef.current.onend = () => {
      //     setIsListening(false);
      //   };
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start(); // Restart recognition if still listening
        }
      };
    } else {
      alert(
        "Your browser does not support Speech Recognition. Please try Google Chrome or Firefox."
      );
    }
  }, []);

  function handleExpireCountDown() {
    setProgressiveBar(true);
    handleStartStop();
    // console.log("CountDown Finished : handleExpireCountDown");
  }

  function handleExpireForProgressiveBar() {
    handleStartStop();
    // console.log("CountDown Finished : handleExpireForProgressiveBar");
  }

  // Audio rec
  const handleStartStop = () => {
    debugger;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="speechToText-Main">
      <div className="speechToText-Content">
        <h3 className="speechToText-Element">Recorded Answer</h3>
        <h4 className="speechToText-Element">
          Beginning in {CountDownDiv} seconds
        </h4>
        {/* <p>
          minutes:{minutes}, Seconds:{seconds}
        </p> */}
      </div>
      {startProgressiveBar ? (
        <CountdownWithProgressBar
          duration={10}
          onExpire={handleExpireForProgressiveBar}
        />
      ) : (
        <></>
      )}

      {/* Audio recording */}
      {isListening ? "Stop Listening" : "Start Listening"}
      <textarea
          value={transcript}
          readOnly
          rows="10"
          cols="50"
          placeholder="Your transcribed text will appear here..."
        />
        {console.log(transcript)}
    </div>
  );
};

export default SpeechToText;

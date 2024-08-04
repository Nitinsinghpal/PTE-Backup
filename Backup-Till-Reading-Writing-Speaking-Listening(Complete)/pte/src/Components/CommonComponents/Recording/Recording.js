import React, { useEffect, useRef, useState } from "react";
import { transcriptData } from "./recordingSlice";
import { useDispatch } from "react-redux";

function Recording({active}) {
  //#region SpeechToText
  const [transcript, setTranscript] = useState("Recorded answer");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();

  //   const [startRecordingState,setStartRecordingState] =useState(false)
  //#endregion


  //#region SpeechToText
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

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start(); // Restart recognition if still listening
        }
        else{
          dispatch(transcriptData(transcript))
        }
      };
    } else {
      alert(
        "Your browser does not support Speech Recognition. Please try Google Chrome or Firefox."
      );
    }
  }, []);
  useEffect(()=>{
    if (active) {
      startRecording()
    }else{
      stopRecording()
    }
  },[active])

  function startRecording() {
    recognitionRef.current.start();
    setIsListening(true);
  }

  function stopRecording() {
    console.log("StopRecording Called from progress");
    recognitionRef.current.stop();
    setIsListening(false);
  }
  //#endregion

  return <div className="recording">
    Transcript : {transcript}
    {console.log(transcript)}
    {/* <button onClick={startRecording}>startRecording</button>
    <button onClick={stopRecording}>stopRecording</button> */}

  </div>;
}

export default Recording;

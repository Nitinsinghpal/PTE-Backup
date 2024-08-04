import React, { useEffect, useRef, useState } from "react";
// import CountDown from "../CountDown/CountDown";
import { useDispatch, useSelector } from "react-redux";
// import CountDown from "../CommonComponents/CountDown/CountDown";
// import Recording from "../CommonComponents/Recording/Recording";
// import { startRecording, stopRecording } from "../CommonComponents/Recording/recordingSlice";
// import CountdownWithProgressBar from "../CommonComponents/CountdownWithProgressBar/CountdownWithProgressBar";
import './SpeechToText.css'
import CountDown from "../Countdown/Countdown";
import CountdownWithProgressBar from "../ProgressBar/CountdownWithProgressBar";

function SpeechToText() {
  const dispatch = useDispatch();
  const countDown = useSelector((state) => state.countDown);
  // const recording = useSelector((state) => state.recording);


  let count = CountDown(10,countDown.active,countDown.reset)

  return (
    <div className="speechToText-Main">
      <div className="speechToText-Content">
      Beginning in {count.seconds}
      {/* <CountDown duration={10} active={countDown.active} reset={countDown.reset}/> */}
      {/* <Recording active={recording.active}/> */}
      {count.seconds ===0 ?(<CountdownWithProgressBar duration={5}/>):(<></>)}
      {/* <button onClick={() => dispatch(startRecording(true))}>startRecording</button>
      <button onClick={() => dispatch(stopRecording(false))}>StopRecording</button> */}
      </div>
     

    </div>
  );
}

export default SpeechToText;

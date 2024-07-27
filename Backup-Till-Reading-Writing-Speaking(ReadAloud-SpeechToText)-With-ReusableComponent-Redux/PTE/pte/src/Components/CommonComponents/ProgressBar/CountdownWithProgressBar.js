import React, { useEffect, useState } from "react";
import "./CountdownWithProgressBar.css";
import { useDispatch, useSelector } from "react-redux";
// import CountDown from "../../../Components/CommonComponents/CountDown/CountDown.js";
import Recording from "../../../Components/CommonComponents/Recording/Recording.js";
import { startRecording, stopRecording } from "../../../Components/CommonComponents/Recording/recordingSlice.js";
import CountDown from "../Countdown/Countdown.js";
// Define props for the component
const   CountdownWithProgressBar = (props) => {
  const countDown = useSelector((state) => state.countDown);
  const recording = useSelector((state) => state.recording);
  const dispatch = useDispatch();

  let count = CountDown(props.duration,countDown.active,countDown.reset)

  useEffect(()=>{
    dispatch(startRecording(true))
  },[])
if (count.seconds === 0) {
  dispatch(stopRecording(false))
}
  return (
     <div className="CDWPB-Main">
      <Recording active={recording.active}/>
        <div className="CDWPB-CountDown">Time Remaining  {count.seconds}</div>
        <div className="CDWPB-ProgressBar-Main">
        
          <div
            className="CDWPB-ProgressBar"
            style={{ width: `${count.progressPercentage}%` }}
          />
        </div>
      </div>
    
  );
};

export default CountdownWithProgressBar;

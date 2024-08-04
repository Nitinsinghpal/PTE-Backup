import React from "react";
import "./DescribeImage.css";
import CountDown from "../../Countdown/Countdown";
import { useSelector } from "react-redux";
import CountdownWithProgressBar from "../../ProgressBar/CountdownWithProgressBar";
import SpeechToText from "../../SpeechToText/SpeechToText";
function DescribeImage({ image }) {
  const countDown = useSelector((state) => state.countDown);
  let count = CountDown(10, countDown.active, countDown.reset);

  return (
    <div className="describeImage-Main">
      <div className="describeImage-Content">
        <div className="describeImage-Image">
          <div>
            <img src={image} />
          </div>
        </div>
        <div className="describeImage-RecordAnswer">
        <SpeechToText/>
        </div>
      </div>
    </div>
  );
}

export default DescribeImage;

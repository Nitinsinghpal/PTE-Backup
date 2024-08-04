import React, { useEffect, useState } from "react";
import "./ReTellLecture.css";
import img01 from '../../../../Images/reTell01.jpg'
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";
import SpeechToText from "../../SpeechToText/SpeechToText";
function ReTellLecture({audio,questionId}) {
    const [audioEnds, setAudioEnds] = useState(false);
    const audioPlayer = useSelector((state) => state.audioPlayer);
  
    useEffect(() => {
      setAudioEnds(false);
    }, [questionId]);
  
    function onAudioEnds(params) {
      setAudioEnds(true);
    }
  return (
    <div className="reTellLecture-Main">
      <div className="reTellLecture-Content">
        <div className="reTellLecture-image">
            <div className="reTellLecture-img">
                <img src={img01}/>
            </div>
        </div>
        <div className="reTellLecture-audioAndRec">
          <div className="reTellLecture-audio"><AudioPlayer src={audio} reset={audioPlayer.reset} onEnd={onAudioEnds} questionId={questionId}/></div>
          <div className="reTellLecture-recording">{audioEnds ? <SpeechToText /> : <></>}</div>
        </div>
      </div>
    </div>
  );
}

export default ReTellLecture;

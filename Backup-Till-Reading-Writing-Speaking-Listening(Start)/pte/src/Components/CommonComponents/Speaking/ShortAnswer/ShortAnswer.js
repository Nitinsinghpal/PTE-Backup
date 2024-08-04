import React, { useEffect, useState } from "react";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";
import SpeechToText from "../../SpeechToText/SpeechToText";

function ShortAnswer({ audio,questionId }) {
  debugger
  const [audioEnds, setAudioEnds] = useState(false);
  const audioPlayer = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    setAudioEnds(false);
  }, [questionId]);

  function onAudioEnds(params) {
    setAudioEnds(true);
  }
  return (
    <div>
      <AudioPlayer src={audio} reset={audioPlayer.reset} onEnd={onAudioEnds} />
      {audioEnds ? <SpeechToText /> : <></>}
    </div>
  );
}

export default ShortAnswer;

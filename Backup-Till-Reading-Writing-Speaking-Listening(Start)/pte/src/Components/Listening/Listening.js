import React from "react";
import TextToSpeech from "../CommonComponents/TextToSpeech/TextToSpeech";

function Listening() {
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        <div className="listening-main">
          <div className="listening-main-content">
            <div className="listening-Audio-Div">
              <div className="listening-Audio-Div-Content">
                <TextToSpeech />
              </div>
            </div>
            {/* <TextToSpeech/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listening;

import React, { useState } from "react";
import "./Speaking.css";
import ReadAloud from "../CommonComponents/Speaking/ReadAloud/ReadAloud";
import DescribeImage from "../CommonComponents/Speaking/DescribeImage/DescribeImage";
// import SpeechToText from "../CommonComponents/SpeechToText/SpeechToText";
function Speaking() {
  let que = [{
    heading:"Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
    paragraph:"Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
    type:"readAloud"
  },
  {
    heading:"Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
    paragraph:"Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
    type:"describe"
  },
  {
    heading:"Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
    paragraph:"Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
    type:"readAloud"
  }
]
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(que);

  const nextQuestion = (questionId) => {
    setCurrentQuestion(currentQuestion + 1);
  };

  function questionFunc(questionIndex) {
    let queArray = []
    if (questions[questionIndex].type === "readAloud") {
      queArray.push(<ReadAloud/>)
    }
    else if (questions[questionIndex].type === "describe") {
      queArray.push(<DescribeImage/>)
    }
    return queArray;
  }

  function submitTest() {
    
  }
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        <div className="speaking-main">
          <div className="speaking-main-content">
            {currentQuestion < questions.length ? (
              <div>
                <h2>Question {currentQuestion + 1}</h2>
                {/* <p>{questions[currentQuestion].heading}</p> */}
                {questionFunc(currentQuestion)}
                <button onClick={() => nextQuestion()}>Next Question</button>
              </div>
            ) : (
              <button onClick={submitTest}>Submit Test</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speaking;

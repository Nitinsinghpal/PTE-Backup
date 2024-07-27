import React, { useState } from "react";
import ReadAloud from "../CommonComponents/Speaking/ReadAloud/ReadAloud";
import { useDispatch, useSelector } from "react-redux";
// import { resetCountDown, startStopCountDown } from "../CommonComponents/CountDown/countDownSlice";
import { stopRecording } from "../CommonComponents/Recording/recordingSlice";
import { resetCountDown } from "../CommonComponents/Countdown/countDownSlice";
function Speaking() {
  let que = [
    {
      questionId: 1,
      heading:
        "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
      paragraph:
        "Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
      type: "readAloud",
    },
    {
      questionId: 2,
      heading:
        "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
      paragraph:
        "Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
      type: "readAloud",
    },
    {
      questionId: 3,
      heading:
        "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
      paragraph:
        "Once most animals reach adulthood, they stop growing. In contrast, even plants that are thousands of years old continue to grow new needles, add new wood, and produce cones and new flowers, almost as if parts of their bodies remained 'forever young'. The secrets of plant growth are regions of tissue that can produce cells that later develop into specialized tissues.",
      type: "readAloud",
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(que);
  const [answers, setAnswers] = useState([])

  const dispatch = useDispatch();
  const recording = useSelector((state) => state.recording);

  const nextQuestion = (questionId) => {
    // dispatch(resetCountDown(10));
    dispatch(resetCountDown({ reset: `speaking${questionId}`}))
    dispatch(stopRecording(false))
    console.log("recording.transcript",recording.transcript)
    setAnswers([...answers, { questionId, answer: recording.transcript }]);
    setCurrentQuestion(currentQuestion + 1);
  };

  function questionFunc(questionIndex, questionId) {
    let queArray = [];
    if (questions[questionIndex].type === "readAloud") {
      queArray.push(<ReadAloud />);
    } else if (questions[questionIndex].type === "describe") {
      //   queArray.push(<DescribeImage/>)
    }
    return queArray;
  }

  function submitTest() {
    console.log("answers",answers)
  }
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        <div className="speaking-main">
          <div className="speaking-main-content">
            {currentQuestion < questions.length ? (
              <div>
                <h2>Question {currentQuestion + 1}</h2>
                <p>{questions[currentQuestion].heading}</p>
                {questionFunc(
                  currentQuestion,
                  questions[currentQuestion].questionId
                )}
                <p>{questions[currentQuestion].paragraph}</p>
                
                <button
                  onClick={() =>
                    nextQuestion(questions[currentQuestion].questionId)
                  }
                >
                  Next Question
                </button>

             
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

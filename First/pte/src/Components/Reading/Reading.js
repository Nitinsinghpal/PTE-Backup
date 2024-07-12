import React, { useEffect, useRef, useState } from "react";
import "../CSS/Common.css";
import axios from "axios";
import "./Reading.css";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

function Reading() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState({ answer: "" });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState();
  const [resultCalculated, setResultCalculated] = useState(false);

  //  export const DataContext = React.createContext();
  const dragAndDropRef = useRef(null); //ref
  useEffect(() => {
    getAllQuestions();
  }, []);

  function getAllQuestions() {
    axios
      .get("http://localhost:5001/api/user/getAllReadingQuestions")
      .then((d) => {
        console.log(d.data);
        setQuestions(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function QuestionOptions(params) {
    let options = [];
    if (questions && questions[currentQuestion].Options.length != 0) {
      if (questions[currentQuestion].selection === "single") {
        questions[currentQuestion].Options.map((option, index) => {
          options.push(
            <li key={index} className="optionsLi">
              <label>
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={option === selectedOption.answer}
                  onChange={() =>
                    handleOptionSelect(
                      option,
                      questions[currentQuestion].QuestionID
                    )
                  }
                />
                {option}
              </label>
            </li>
          );
        });
      } else if (questions[currentQuestion].selection === "multiple") {
        questions[currentQuestion].Options.map((option, index) => {
          options.push(
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() =>
                  handleOptionChangeCheckBox(
                    option,
                    questions[currentQuestion].QuestionID
                  )
                }
              />
              {option}
              <br />
            </label>
          );
        });
      } else if (questions[currentQuestion].selection === "dragAndDrop") {
        debugger
        let optionWithSide = [];
        questions[currentQuestion].Options.map((option, index) => {
          optionWithSide.push({ id: index, option: option, side: "left" });
        });
        options.push(
          <DragAndDrop
            options={optionWithSide}
            // sendDataToReading={handleDragAndDropAnswers}
            ref={dragAndDropRef} //ref
          />
        );
      }
    }

    return options;
  }

  const handleOptionSelect = (answer, questionId) => {
    setSelectedOption({ questionId, answer });
  };

  const handleOptionChangeCheckBox = (answer, questionId) => {
    // const answer = event.target.value;
    if (selectedOptions.includes(answer)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== answer));
    } else {
      setSelectedOptions([...selectedOptions, answer]);
    }
    // setAnswers([...answers, {selectedOptions}]);
  };

  // function handleDragAndDropAnswers(data) {
  //   console.log(data);
  //   setDragAndDrop(data);
  // }

  const nextQuestion = (questionId) => {
    debugger
   
    if (selectedOption.answer !== "") {
      setAnswers([...answers, selectedOption]);
    }
    if (selectedOptions.length !== 0) {
      setAnswers([...answers, { questionId, answer: selectedOptions }]);
    }
    if (dragAndDropRef.current) {
      let data = dragAndDropRef.current.dataFromDragAndDropComp(); // Call child function via ref
      console.log(data)
      setAnswers([...answers, {questionId,answer:data}])
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption({ answer: "" });
    setSelectedOptions([]);
    console.log("answers", answers);

    //handle dragAndrop Answers
  };

  function submitTest() {
    console.log("answers", answers);
    axios
      .post("http://localhost:5001/api/user/checkAnswers", answers)
      .then((d) => {
        setResult(d.data);
        setResultCalculated(true);
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function resultFunc() {
    let totalScore = questions.length * 10;
    let ObtainedScore = result[result.length - 1];

    return (
      <div>
        You got {ObtainedScore.score} Out Of {totalScore}
      </div>
    );
  }
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        <div className="reading-main">
          <div className="reading-main-content">
            {currentQuestion < questions.length ? (
              <div>
                <h2>Question {currentQuestion + 1}</h2>
                {questions[currentQuestion].Heading !== "" ? (
                  <div>
                    <p>{questions[currentQuestion].Heading}</p>
                  </div>
                ) : (
                  <></>
                )}
                {questions[currentQuestion].Paragraph !== "" ? (
                  <div>
                    <p>{questions[currentQuestion].Paragraph}</p>
                  </div>
                ) : (
                  <></>
                )}
                {questions[currentQuestion].Question !== "" ? (
                  <div>
                    <p>{questions[currentQuestion].Question}</p>
                  </div>
                ) : (
                  <></>
                )}
                <p>{QuestionOptions()}</p>
                <button
                  onClick={() =>
                    nextQuestion(questions[currentQuestion].QuestionID)
                  }
                >
                  Next Question
                </button>
              </div>
            ) : (
              <button onClick={submitTest}>Submit Test</button>
            )}

            {resultCalculated ? resultFunc() : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reading;

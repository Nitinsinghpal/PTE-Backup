import React, { useRef, useState } from "react";
import TextToSpeech from "../CommonComponents/TextToSpeech/TextToSpeech";
import { resetCountDown } from "../CommonComponents/Countdown/countDownSlice";
import { useDispatch } from "react-redux";
import TextAreaWithWordCount from "../CommonComponents/TextAreaWithWordCount/TextAreaWithWordCount";
import PlaceInputInString from "../CommonComponents/Listening/PlaceInputInString";
import HighLightInCorrectWord from "../CommonComponents/HighLightInCorrectWord/HighLightInCorrectWord";
// import CheckBox from "../CommonComponents/CheckBox/CheckBox";

function Listening() {
  let ques = [
   
    {
      questionId: 13,
      heading:
        "You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker(s) said. Please click on the words that are different.",
      text: "An English paragraph for reading is a concise piece of text composed of one or more sentences that convey a specific idea, information, or story.",
      type: "highLightInCorrectWord",
     summary:"So far in our discussion of chemical equations we have assumed that these reactions only go in one direction, the forward direction, from left to right as we read it in the equation. That's why our arrowhead points from left to right reactants react together to make products. However, this is not exactly how things occur in reality. In fact, practically every chemical reaction is reversible, meaning the products can also react together to reform the reactants that they were made of. So instead of writing that single arrow facing from right to top, a more appropriate symbol would be a double arrow, one going from left to right and one going from right to left. Reactants are continually continuously reacting to form produce. But at the same time as those products are formed, they remake the reactants. They're both going simultaneously, forming each other. This is what we would call a state of equality."
    },
    {
      questionId: 14,
      heading:
        "You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker(s) said. Please click on the words that are different.",
      text: "An English paragraph for reading is a concise piece of text composed of one or more sentences that convey a specific idea, information, or story.",
      type: "highLightInCorrectWord",
     summary:"So far in our discussion of chemical equations we have assumed that these reactions only go in one direction, the forward direction, from left to right as we read it in the equation. That's why our arrowhead points from left to right reactants react together to make products. However, this is not exactly how things occur in reality. In fact, practically every chemical reaction is reversible, meaning the products can also react together to reform the reactants that they were made of. So instead of writing that single arrow facing from right to top, a more appropriate symbol would be a double arrow, one going from left to right and one going from right to left. Reactants are continually continuously reacting to form produce. But at the same time as those products are formed, they remake the reactants. They're both going simultaneously, forming each other. This is what we would call a state of equality."
    },
  ];
  const [questions, setQuestions] = useState(ques);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState({ answer: "" });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const dispatch = useDispatch();
  const listeningRef = useRef(null); //ref

  function nextQuestion(questionId) {
    debugger
    // console.log("selectedOptions", selectedOptions);
    dispatch(resetCountDown({ reset: `listening${questionId}` }));

    if (selectedOption.answer !== "") {
      setAnswers([...answers, selectedOption]);
    }
    if (selectedOptions.length !== 0) {
      setAnswers([...answers, { questionId, answer: selectedOptions }]);
    }
    if (listeningRef.current) {
      if ("dataFromTextAreaWithWordCount" in listeningRef.current) {
        let dataFromTextAreaWithWordCount =
          listeningRef.current.dataFromTextAreaWithWordCount();
        let { questionId, text, wordCount } = dataFromTextAreaWithWordCount;
        setAnswers([
          ...answers,
          { questionId, answer: text, wordCount: wordCount },
        ]);
      }
      if ("dataFromPlaceInputInStrings" in listeningRef.current) {
        let dataFromPlaceInputInStrings =
          listeningRef.current.dataFromPlaceInputInStrings();
        setAnswers([
          ...answers,
          { questionId, answer: dataFromPlaceInputInStrings },
        ]);
      }
      if ("dataFromHighLightInCorrectWord" in listeningRef.current) {
        debugger
        let dataFromHighLightInCorrectWord =
          listeningRef.current.dataFromHighLightInCorrectWord();
        setAnswers([
          ...answers,
          { questionId, answer: dataFromHighLightInCorrectWord },
        ]);
      }
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOptions([]);
    setSelectedOption({ answer: "" });
  }

  const handleOptionChangeCheckBox = (answer, questionId) => {
    // const answer = event.target.value;
    if (selectedOptions.includes(answer)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== answer));
    } else {
      setSelectedOptions([...selectedOptions, answer]);
    }
    // setAnswers([...answers, {selectedOptions}]);
  };

  const handleOptionSelect = (answer, questionId) => {
    setSelectedOption({ questionId, answer });
  };

  // function getAnswerFromTextArea(ans) {
  //   let {questionId, text, wordCount } = ans;
  //   if (text != "") {
  //     setAnswers([...answers, { questionId, answer: text,wordCount: wordCount }]);

  //   }
  //   console.log("from listening",{questionId, text, wordCount })
  // }

  function questionOptions(params) {
    let options = [];
    if (questions[currentQuestion].type === "multiple") {
      questions[currentQuestion].options.map((option, index) => {
        options.push(
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() =>
                handleOptionChangeCheckBox(
                  option,
                  questions[currentQuestion].questionId
                )
              }
            />
            {option}
            <br />
          </label>
        );
      });

      // options.push(<CheckBox questionId={questions[currentQuestion].questionId} options={ questions[currentQuestion].options}/>)
    } else if (questions[currentQuestion].type === "single") {
      questions[currentQuestion].options.map((option, index) => {
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
                    questions[currentQuestion].questionId
                  )
                }
              />
              {option}
            </label>
          </li>
        );
      });
    } else if (questions[currentQuestion].type === "summarize") {
      options.push(
        <TextAreaWithWordCount
          questionId={questions[currentQuestion].questionId}
          ref={listeningRef}
        />
      );
    } else if (questions[currentQuestion].type === "dictation") {
      options.push(
        <TextAreaWithWordCount
          questionId={questions[currentQuestion].questionId}
          ref={listeningRef}
        />
      );
    } else if (questions[currentQuestion].type === "fillUps") {
      options.push(
        <PlaceInputInString
          questionId={questions[currentQuestion].questionId}
          text={questions[currentQuestion].text}
          ref={listeningRef}
        />
      );
    }else if (questions[currentQuestion].type === "highLightCorrectSummary") {
      questions[currentQuestion].options.map((option, index) => {
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
                    questions[currentQuestion].questionId
                  )
                }
              />
              {option}
            </label>
          </li>
        );
      });
    }
    else if (questions[currentQuestion].type === "highLightInCorrectWord") {
      options.push(
        <HighLightInCorrectWord
          questionId={questions[currentQuestion].questionId}
          summary={questions[currentQuestion].summary}
          ref={listeningRef}
        />
      );
    }
    return options;
  }
  function submitTest(params) {
    console.log("answers", answers);
  }
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        {currentQuestion < questions.length ? (
          <div className="listening-main">
            <h2>Question {currentQuestion + 1}</h2>
            {questions[currentQuestion].heading !== "" ? (
              <div>
                <p>{questions[currentQuestion].heading}</p>
              </div>
            ) : (
              <></>
            )}
            <br />
            {questions[currentQuestion].heading2 !== "" ? (
              <div>
                <p>{questions[currentQuestion].heading2}</p>
              </div>
            ) : (
              <></>
            )}
            <div className="listening-main-content">
              <div className="listening-Audio-Div">
                <div className="listening-Audio-Div-Content">
                  <TextToSpeech text={ques[0].text} />
                </div>
              </div>
              <div className="listening-Options">
                <div>
                  <p>{questionOptions()}</p>
                  <button
                    onClick={() =>
                      nextQuestion(questions[currentQuestion].questionId)
                    }
                  >
                    Next Question
                  </button>
                </div>
              </div>
              {/* <TextToSpeech/> */}
            </div>
          </div>
        ) : (
          <button onClick={submitTest}>Submit Test</button>
        )}
      </div>
    </div>
  );
}

export default Listening;

const questions = require("../Database/Data.json");
const answers = require("../Database/Answer.json");

const getReadingQuestions = async (req, res) => {
  try {
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST endpoint to compare answers
const checkAnswers = async (req, res) => {
  const userAnswers = req.body;

  if (!userAnswers || userAnswers.length === 0) {
    return res.status(400).json({ message: "No answers provided" });
  }

  const result = [];
  let score = 0;

  // Compare each question's answer
  userAnswers.forEach((userAnswer) => {
    const questionId = userAnswer.questionId;
    const answer = userAnswer.answer;

    // Find the correct answer for the questionId
    const correctAnswerObj = answers.find(
      (item) => item.questionId === questionId
    );

    if (!correctAnswerObj) {
      result[questionId] = "Question ID not found in database";
    } else if (correctAnswerObj.selection === "dragAndDrop") {
      if (correctAnswerObj.answer.length !== answer.length) {
        return;
      }
      let userSelectedOptions = [];
      answer.map((d) =>{
        userSelectedOptions.push(d.option)
      })
      let matched = correctAnswerObj.answer.every(
        (element, index) => element === userSelectedOptions[index]
      );
      if (matched) {
        result.push({ questionId, result: "Correct" });
        score = score + 10;
      }
    } else if (Array.isArray(answer)) {
      const answerSet = new Set(answer);
      const [firstAnswer, secondAnswer] = correctAnswerObj.answer;
      if (answerSet.has(firstAnswer) && answerSet.has(secondAnswer)) {
        // return true; // Match found
        result.push({ questionId, result: "Correct" });
        score = score + 10;
      }
    } else if (answer === correctAnswerObj.answer) {
      // result[questionId] = 'Correct';
      result.push({ questionId, result: "Correct" });
      score = score + 10;
    } else {
      result[questionId] = "Incorrect";
    }
  });
  result.push({ score });
  res.status(200).json(result);
};

module.exports = { getReadingQuestions, checkAnswers };

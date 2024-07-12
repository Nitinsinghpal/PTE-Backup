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
  for (let i = 0; i < userAnswers.length; i++) {
    const userAnswer = userAnswers[i];
    const questionId = userAnswer.questionId;
    const answer = userAnswer.answer;

    if (answer !== undefined) {
      // Find the correct answer for the questionId
      const correctAnswerObj = answers.find(
        (item) => item.questionId === questionId
      );

      if (!correctAnswerObj) {
        result[questionId] = "Question ID not found in database";
      } else if (correctAnswerObj.selection === "dragAndDrop") {
        if (correctAnswerObj.answer.length !== answer.length) {
          continue;
        }
        let userSelectedOptions = [];
        answer.map((d) => {
          userSelectedOptions.push(d.option);
        });
        let matched = correctAnswerObj.answer.every(
          (element, index) => element === userSelectedOptions[index]
        );
        if (matched) {
          result.push({ questionId, result: "Correct" });
          score = score + 10;
        }
      } else if (correctAnswerObj.selection === "fillUps") {
        if (correctAnswerObj.answer.length !== answer.length) {
          continue;
        }
        let userSelectedOptions = [];
        answer.map((d) => {
          delete d["index"];
          userSelectedOptions.push(d);
        });
        let compare = compareArryOfObjects(
          correctAnswerObj.answer,
          userSelectedOptions
        );
        // let matched = correctAnswerObj.answer.every(
        //   (element, index) => element === userSelectedOptions[index]
        // );
        if (compare) {
          result.push({ questionId, result: "Correct" });
          score = score + 10;
        }
      } else if (correctAnswerObj.selection === "fillUpsWithDropDown") {
        if (correctAnswerObj.answer.length !== Object.keys(answer).length) {
          continue;
        }
        let correctAnswers = correctAnswerObj.answer;
        let userAnswer = answer;
        let count = 0;
        correctAnswers.map((d, index) => {
          if (d.value === userAnswer[index]) {
            count = count + 1;
          } else {
            return count;
          }
        });
        if (count === correctAnswers.length) {
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
    }
  }
  result.push({ score });
  res.status(200).json(result);
};

function compareArryOfObjects(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!objectsAreEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}
function objectsAreEqual(obj1, obj2) {
  // Get the keys of each object
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through keys and compare values
  for (let key of keys1) {
    // Compare values for each key
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  // If all keys and values match, objects are equal
  return true;
}

module.exports = { getReadingQuestions, checkAnswers };

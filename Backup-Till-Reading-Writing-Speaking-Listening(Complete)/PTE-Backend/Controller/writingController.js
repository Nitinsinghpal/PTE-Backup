var Typo = require("typo-js");
var axios = require('axios')
const checkSummary = async (req, res) => {
  const userAnswers = req.body.summary;
  try {
    //Tokenize summary into words
    const summaryTokens = tokenize(userAnswers);
    const spellingResult = checkSpellingFunc(summaryTokens);
    const grammerResult = await checkGrammerFunc(userAnswers);
    spellingResult.summaryLength = summaryTokens.length
    let finalResult = {spellingResult,grammerResult}
    res.status(200).json(finalResult);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Function to tokenize text into words
function tokenize(text) {
  return text.toLowerCase().match(/\b\w+\b/g); // Split text into words
}

// Get users from database
const checkSpellings = async (req, res) => {
  try {
    var dictionary = new Typo("en_US");
    // console.log(dictionary)

    var is_spelled_correctly = dictionary.check("aree");
    console.log(is_spelled_correctly);
    res.status(200).json(is_spelled_correctly);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


async function checkGrammerFunc(summary) {
  let result = []
  await axios
      .post("http://127.0.0.1:1234", { summary })
      .then((d) => {
        result.push(d.data)
      })
      .catch((e) => {
        console.log(e);
      });
      return result;
}
function checkSpellingFunc(summaryTokens) {
  let spellingCheckCount = 0;
  let incorrectSpelling = [];

  try {
    var dictionary = new Typo("en_US");
    summaryTokens.map((word) => {
      let is_spelled_correctly = dictionary.check(word);
      if (is_spelled_correctly === true) {
        spellingCheckCount = spellingCheckCount + 1;
      }
      else{
        incorrectSpelling.push(word)
      }
    });
    return {spellingCheckCount,incorrectSpelling};
  } catch (error) {
    return {spellingCheckCount,incorrectSpelling};
  }
}
module.exports = { checkSpellings, checkSummary };

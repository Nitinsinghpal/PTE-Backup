import React, { useEffect, useState } from "react";

function CheckBox({ questionId, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  let optionsArr = [];

  useEffect(() =>{
    optionFunc()
  },[])
  const handleOptionChangeCheckBox = (answer, questionId) => {
    // const answer = event.target.value;
    if (selectedOptions.includes(answer)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== answer));
    } else {
      setSelectedOptions([...selectedOptions, answer]);
    }
    // setAnswers([...answers, {selectedOptions}]);
  };
  function optionFunc() {
    
    options.map((option, index) => {
        optionsArr.push(
        <label>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChangeCheckBox(option, questionId)}
          />
          {option}
          <br />
        </label>
      );
    });
  }

  return optionsArr;
}

export default CheckBox;

import React, { useEffect, useState } from "react";
import "./PlaceDropDownInString.css";
const PlaceDropDownInString = React.forwardRef((props, ref) =>{

  // let dataFromDb = {
  //   QuestionID: 7,
  //   Heading: "",
  //   Paragraph: "",
  //   Question: "",
  //   Option:
  //     "This short book has been concerned with the main tool of learning: language. Many children, particularly those in the industrial areas of the country, start their educational lives with this tool blunt, and live their early years in home circumstances which often conspire to keep it 'blank' with the result, as the young sixth-former wrote in Chapter One, that even he becomes increasingly conscious of his 'blank' of fluency, which may become the most prominent manifestation of his embarrassment and discomfort. To 'blank' this, to give the child the confidence, which derives from 'blank' of speech and writing, is surely one of the prime tasks of the country's schools. There is no single recipe for a 'blank' to do this well, but it may be helpful to consider the conditions, which appear to be 'blank' to the primary schools whose work has been quoted.",
  //   Options: [
  //     { id: 1, options:["sharp","same","different","blunt","young",] },
  //     { id: 2, options: ["shortage","difficulty", "lack", "weakness", "gap"] },
  //     { id: 3, options: ["miss", "avoid", "waste", "spare","pass"] },
  //     { id: 4, options: ["ease", "skill", "comfort", "utility","ability"] },
  //     { id: 5, options: ["meal", "lesson", "way", "teaching","style"] },
  //     { id: 6, options: ["frequent", "clear", "similar", "shared","common"] }

  //   ],
  //   selection: "fillUps",
  // }
  // let dataFromDb = props.question;
  const [dataFromDb, setDataFromDb] = useState(props.question)
  const [selectedOptions,setSelectedOptions] = useState()
  
  useEffect(() =>{
    setDataFromDb(props.question)
    setSelectedOptions()
  },[props.question])

  //#region calling child func from parent
const dataFromPlaceDropDownInString = () => {
  // Function to be called from parent
  let dataToReturn = selectedOptions;
  return dataToReturn;
};

// Expose childFunction to parent via ref
React.useImperativeHandle(ref, () => ({
  dataFromPlaceDropDownInString,
}));
//#endregion


  // Function to handle dropdown change
  const handleDropdownChange = (index, value) => {
    
    setSelectedOptions({
      ...selectedOptions,
      [index]: value
    });
  };

  const replaceBlankWithInputs = (text) => {
    const parts = text.split("'blank'");
    const result = [];

    parts.forEach((part, index) => {
      result.push(part);

      if (index < parts.length - 1) {
        
        result.push(
          <select
            key={"key"}
            value={selectedOptions !== undefined && selectedOptions.length !== 0 ? (selectedOptions[index]):("select")}
            onChange={(e) => handleDropdownChange(index, e.target.value)}
          >
            <option value="">{"select"}</option>
            {optionsFunc(index)}
          </select>
        );
      }
    });
    return result;
  };

  function optionsFunc(index) {
    if (dataFromDb.Options.length !== 0) {
      return dataFromDb.Options[index].options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ));
    }
    else{
      return
    }
    
  }
  return <div>{replaceBlankWithInputs(dataFromDb.Option)}
  {console.log(selectedOptions)}
  </div>;
})

export default PlaceDropDownInString;

// dropdownData.map(({ key, label, options }) => (
//   <select key={key} value={selectedOptions[key]} onChange={(e) => handleDropdownChange(key, e.target.value)}>
//     <option value="">{label}</option>
//     {options.map(option => (
//       <option key={option} value={option}>{option}</option>
//     ))}
//   </select>
// ));

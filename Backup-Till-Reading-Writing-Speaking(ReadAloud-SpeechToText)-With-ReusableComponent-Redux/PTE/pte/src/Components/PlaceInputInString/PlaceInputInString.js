import React, { useEffect, useState } from "react";
import "./PlaceInputInString.css";

const PlaceInputInString = React.forwardRef((props, ref) => {

  let dataFromDb = [props.question];
  const [inputValues, setInputValues] = useState({
    ideaOfWolves: "",
    opinionOnEnvironment: "",
    oppositionReason: "",
    impactOnLivestock: "",
  });

  const [inputTagValues, setInputTagValues] = useState([]);
  const [optionsFromDb, setOptionsFromDb] = useState(dataFromDb[0].Options);
  const [inputValuesWithOption, setInputValuesWithOption] = useState();

  useEffect(() => {
    // Initialize left and right states based on options prop
    setOptionsFromDb(dataFromDb[0].Options)
    setInputTagValues([])
    // setRight([{ id: "", option: "", side: "" }])
  }, [props.question]);

//#region calling child func from parent
const dataFromPlaceInputInString = () => {
  // Function to be called from parent
  let dataToReturn = inputTagValues;
// setInputTagValues([])
// setOptionsFromDb([])
  return dataToReturn;
};

// Expose childFunction to parent via ref
React.useImperativeHandle(ref, () => ({
  dataFromPlaceInputInString,
}));
//#endregion

  //#region DragDrop
  const handleDragStart = (e, key, inputVal) => {
    e.dataTransfer.setData("text/plain", key); // Set data to identify the dragged item

    // Convert object to JSON string
    const jsonString = JSON.stringify(inputVal);
    e.dataTransfer.setData("inputVal", jsonString);
  };
  const handleDragOver = (e, key) => {
    e.preventDefault(); // Set data to identify the dragged item
  };
  const handleDrop = (e, index) => {
    if (index === "fillUpOptions") {
      //triggers when drop back to options Div
      let itemId = e.dataTransfer.getData("text/plain");
      let jsonString = e.dataTransfer.getData("inputVal");
      if (jsonString === "undefined") {
        return;
      }
      const item = JSON.parse(jsonString);

      setOptionsFromDb([...optionsFromDb, { id: item.id, value: item.value }]);

      let filterdOptions = inputTagValues.filter(
        (op) => op.value !== item.value
      );
      setInputTagValues(filterdOptions);
      // setInputTagValues({
      //   ...inputTagValues,
      //   [index]: itemVal,
      // });
    } else {
      let itemId = e.dataTransfer.getData("text/plain");
      let item = dataFromDb[0].Options.filter((d) => d.id == itemId);
      item[0].index = index;

      //Count 'blank' in question
      let regex = /\bblank\b/gi;
      let matches = dataFromDb[0].Option.match(regex);
      let count = matches ? matches.length : 0;

      if (inputTagValues.length === count) {
        return
      }
      let filterdOptions = optionsFromDb.filter(
        (op) => op.value !== item[0].value
      );
      setOptionsFromDb(filterdOptions);
      setInputTagValues((prevInputTagValues) => {
        const updatedValues = [...prevInputTagValues, item[0]]; // Create a copy of the current array
        // updatedValues[index] = item[0]; // Update the specific index with new value
        return updatedValues; // Return the updated array to set state
      });
      // setInputTagValues(prevInputTagValues => {
      //   const updatedValues = [...prevInputTagValues]; // Create a copy of the current array
      //   updatedValues[index] = item[0]; // Update the specific index with new value
      //   return updatedValues; // Return the updated array to set state
      // });
      // setInputTagValues({
      //   ...inputTagValues,
      //   [index]: item[0],
      // });
      // setInputTagValues({
      //   ...inputTagValues,
      //   [index]: saveToState,
      // });
    }
  };
  //#endregion

  function questionOptions(params) {
    if (dataFromDb[0].selection === "fillUps") {
      let option = dataFromDb[0].Option; //In this option we have string of question with fill up blank

      let result = replaceBlankWithInputs(option);
      return result;
    }
  }

  function inputValueFunc(index, from) {
    if (inputTagValues.length !== 0 && inputTagValues !== undefined) {
      if (inputTagValues !== undefined) {
        let val = inputTagValues.filter((d) => d.index === index);
        if (val.length !== 0 && val[0].index === index) {
          // setInputValuesWithOption(val[0])
          if (from === "fromDragStart") {
            return val[0];
          } else {
            return val[0].value;
          }
        } else {
          return "";
        }
        // if (inputTagValues[index].index === index) {
        //   return inputTagValues[index].value;

        // }
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  // Function to replace 'blank' with input fields
  const replaceBlankWithInputs = (text) => {
    const parts = text.split("'blank'");
    const result = [];

    parts.forEach((part, index) => {
      result.push(part);

      if (index < parts.length - 1) {
        const key = Object.keys(inputValues)[index]; // Get the key from state
        result.push(
          <input
            key={index}
            type="text"
            value={inputValueFunc(index)}
            // value={inputTagValues.length !== 0 && inputTagValues[index] !== undefined ? (inputTagValues[index].index === index ? (inputTagValues[index].value):('')):('')}

            // value={inputTagValues.length !== 0 && inputTagValues[index] !== undefined ? (inputTagValues[index].value):('')}

            // inputTagValues[index].index === index
            // value={inputTagValues[index].value ?? ''}
            placeholder={key}
            readOnly
            draggable
            onDragStart={(e) =>
              handleDragStart(e, index, inputValueFunc(index, "fromDragStart"))
            }
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          />
        );
      }
    });
    // setInputsCount(counts)
    return result;
  };

  const originalText = `Considering their lingering reputation as man-killers, it's hardly surprising that hackles are raised any time someone brings up the idea of 'blank' wolves to the Scottish Highlands. Debate on this topic has been raging for years; 'blank' would like to see the Highland environment returned to its natural state. Opponents 'blank' the animals' 'blank' for killing livestock.`;
  //   const originalText = `A charge often leveled against organic agriculture is that it is more philosophy than science. There's some truth to this indictment, if that is what it is, though why organic farmers should feel 'blank' about it is itself a mystery, a relic, perhaps, of our fetishism of science as the only 'blank' tool with which to approach nature. The philosophy of 'blank' natural processes precedes the science of understanding them.`;
  //   function options() {
  //     let optionsForFill = [];
  //     if (dataFromDb[0].Options !== undefined) {
  //         dataFromDb[0].Options.map((d,index) => {
  //             //In this Options we have array of options that we have to drag in fill ups
  //             optionsForFill.push(<li draggable
  //             onDragStart={(e) => handleDragStart(e,index)}
  //             onDragOver={(e) => handleDragOver(e)}>{d}</li>);
  //           });
  //     }

  //#region Testing
  function options() {
    
    let optionsForFill = [];
    if (optionsFromDb !== undefined && optionsFromDb.length !==0) {
      
      optionsFromDb.map((d, index) => {
        //In this Options we have array of options that we have to drag in fill ups
        optionsForFill.push(
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, d.id)}
            onDragOver={(e) => handleDragOver(e)}
          >
            {d.value}
          </li>
        );
      });
    }
    return optionsForFill;
  }
  //#endregion

  return (
    <div>
      <p>{questionOptions()}</p>
      <div
        className="fillUpOptions"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => {
          handleDrop(e, "fillUpOptions");
        }}
      >
        {options()}
      </div>
      {console.log("inputTagValues",inputTagValues)}
    </div>
  );
});

export default PlaceInputInString;

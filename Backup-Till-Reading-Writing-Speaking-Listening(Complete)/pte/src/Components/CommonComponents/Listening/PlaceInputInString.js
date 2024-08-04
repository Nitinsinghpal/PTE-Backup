import React, { useEffect, useState } from 'react';

const PlaceInputInString = React.forwardRef((props, ref) =>{
  const { questionId,text  } = props
const [inputs, setInputs] = useState([]);

useEffect(() => {
  setInputs([]);
}, [questionId]);

 //#region calling child func from parent
 const dataFromPlaceInputInStrings = () => {
  return inputs;
};

// Expose childFunction to parent via ref
React.useImperativeHandle(ref, () => ({
  dataFromPlaceInputInStrings,
}));
//#endregion



  // Handle input change
  const handleInputChange = (e, index) => {
    
    const { value } = e.target;
    setInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = value;
        return newInputs;
      });
  };

const replaceBlankWithInputs = () => {
    const parts = text?.split("'blank'");
    const result = [];

    parts.forEach((part, index) => {
      result.push(part);

      if (index < parts.length - 1) {
        // const key = Object.keys(inputValues)[index]; // Get the key from state
        result.push(
          <input
            key={index}
            type="text"
            value={inputs[index] || ''}
            placeholder="type here..."
            onChange={(e) => handleInputChange(e,index)}
          />
        );
      }
    });

    return result;
  };
  let dataToReturn = replaceBlankWithInputs()
  return dataToReturn
});

export default PlaceInputInString;

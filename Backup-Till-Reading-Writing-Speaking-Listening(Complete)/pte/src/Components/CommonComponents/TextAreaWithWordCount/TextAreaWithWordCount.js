import React, { useEffect, useState } from "react";
import "./TextAreaWithWordCount.css";
const TextAreaWithWordCount = React.forwardRef((props, ref) => {
    const { questionId,  } = props
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setText("");
    setWordCount(0);
  }, [questionId]);

//   useEffect(() => {
//     return () => {
//       console.log("ChildComponent will unmount.");
//       console.log({ text, wordCount });
//       getAnswerFromTextArea({ questionId, text, wordCount });
//     };
//   }, []);

  //#region calling child func from parent
  const dataFromTextAreaWithWordCount = () => {
    let dataToReturn = { questionId, text, wordCount };
    return dataToReturn;
  };

  // Expose childFunction to parent via ref
  React.useImperativeHandle(ref, () => ({
    dataFromTextAreaWithWordCount,
  }));
  //#endregion

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    updateWordCount(newText);
  };

  const handlePaste = (event) => {
    // Prevent default paste behavior
    event.preventDefault();

    // Get the pasted text and update state
    const pastedText = event.clipboardData.getData("text");
    const newText = text + pastedText;
    setText(newText);
    updateWordCount(newText);
  };

  const updateWordCount = (text) => {
    // Remove extra white spaces and split by spaces to count words
    const wordsArray = text.trim().split(/\s+/);
    setWordCount(wordsArray.length);
  };

  return (
    <div className="textAreaWithWordCount-Main">
      <textarea
        className="textAreaWithWordCount-textArea"
        value={text}
        onChange={handleTextChange}
        onPaste={handlePaste}
        rows={10}
        cols={50}
      />

      <p>Word count: {wordCount}</p>
    </div>
  );
});

export default TextAreaWithWordCount;

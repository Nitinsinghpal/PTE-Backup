import React, { useEffect, useState } from 'react';

const HighLightInCorrectWord = React.forwardRef((props, ref) =>{
    const { questionId,summary  } = props
  const [clickedWords, setClickedWords] = useState([]);

useEffect(()=>{
setClickedWords([])
},[questionId])
 //#region calling child func from parent
 const dataFromHighLightInCorrectWord = () => {
    return clickedWords;
  };
  
  // Expose childFunction to parent via ref
  React.useImperativeHandle(ref, () => ({
    dataFromHighLightInCorrectWord,
  }));
  //#endregion


  // Function to handle click on a word
  const handleWordClick = (word) => {
    if (!clickedWords.includes(word)) {
      setClickedWords(prevClickedWords => [...prevClickedWords, word]);
    }
  };

  // Example paragraph text
  const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius justo eget justo maximus ullamcorper.";

  // Split paragraph into words
  const words = summary?.split(' ') ?? [];

  return (
    <div>
      <p>
        {words.map((word, index) => (
          <span key={index}>
            <span
              style={{ cursor: 'pointer', textDecoration: clickedWords.includes(word) ? 'underline' : 'none' }}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </span>{' '}
          </span>
        ))}
      </p>
      <div>
        <p>Clicked Words: {clickedWords.join(', ')}</p>
      </div>
    </div>
  );
});

export default HighLightInCorrectWord;

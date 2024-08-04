import React, { useState } from "react";
import "./Writing.css";
import axios from "axios";
function WritingWithPython() {
  const [respone, setResponse] = useState(
    {
      misspelled: [],
      grammerMistakes: []
  }
  );
  let topic = "Write essay on climate change";
  let obj = {
    topic: "Climate change",
    summary:
      "I can not belive it's allredy July! Thes year has gone by so fast. Their are so many things I havn't got done yet. Me and my freinds were planning a trip, but we dont no where to go. Its hard too decide because everyone wants somthing diferent. Also, theres alot of work at my job write now, so i dont have much time too plan. I hope we can figure it out soon, though.",
  };
  // let summary = JSON.parse(obj);
  function checkSpellings(e) {
    
    e.preventDefault();
    axios
      .post("http://127.0.0.1:1234", obj)
      .then((d) => {
        
        console.log(d.data[0]);
        console.log(d.data[1]);
        setResponse(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function grammerMistakesFunc(params) {
    let arr = [];
    let replacementArr = [];
    respone.grammerMistakes.map((d) => {
      {
        if (replacementArr.length === 0) {
          d.replacements.map((rep) => {
            replacementArr.push(<li>{rep}</li>);
          });
        }
       
      }
      arr.push(
        <div>
          <p>context : {d.context}</p>
          <p>errorLength : {d.errorLength}</p>
          <p>message : {d.message}</p>
          <p>replacements : {replacementArr}</p>
          <p>context : {d.ruleIssueType}</p>
        </div>
      );
    });
    return arr;
  }
  return (
    <div className="main-Div">
      <div className="main-Div-Content">
        <div className="writing-main">
          <div className="writing-main-content">
            {topic}
            <p>Spelling Mistakes : {respone.misspelled}</p>
            <p>Grammer Mistakes : {respone !== undefined && respone !== null ? (grammerMistakesFunc()):(<></>)}</p>

            <button onClick={checkSpellings}>CheckSpellings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritingWithPython;

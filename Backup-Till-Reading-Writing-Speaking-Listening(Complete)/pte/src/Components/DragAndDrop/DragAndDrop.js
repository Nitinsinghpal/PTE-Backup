import React, { useContext, useEffect, useState } from "react";
import "./DragAndDrop.css";

const DragAndDrop = React.forwardRef((props, ref) => {
  //ref
  
  // console.log(props.options)
  // const options = [
  //   { option: "first", side: "right" },
  //   { option: "second", side: "right" },
  //   { option: "third", side: "right" },
  //   { option: "fourth", side: "right" },
  //   { option: "fifth", side: "right" },
  // ];
  // const options = [
  //   { id: 0, option: "first", side: "left" },
  //   { id: 1, option: "second", side: "left" },
  //   { id: 2, option: "third", side: "left" },
  //   { id: 3, option: "fourth", side: "left" },
  //   { id: 4, option: "fifth", side: "left" },
  // ];

  const [left, setLeft] = useState(props.options);
  const [right, setRight] = useState([{ id: "", option: "", side: "" }]);

  // useEffect(() =>{
  //   setLeft(options)
  //   setRight([{ id: "", option: "", side: "" }])
  // },[])
  useEffect(() => {
    // Initialize left and right states based on options prop
    setLeft(props.options)
    setRight([{ id: "", option: "", side: "" }])
  }, [props.options]);
  //#region calling child func from parent
  const dataFromDragAndDropComp = () => {
    
    // Function to be called from parent
    let dataToReturn = right;
    setLeft(props.options);
    setRight([{ id: "", option: "", side: "" }]);
    return dataToReturn;
  };

  // Expose childFunction to parent via ref
  React.useImperativeHandle(ref, () => ({
    dataFromDragAndDropComp,
  }));
  //#endregion

  //#region adding Data left and right Divs

  function leftData() {
    let leftArray = [];
    if (left.length !== 0 && left[0].option !== "") {
      left.map((option, index) => {
        leftArray.push(
          <div
            key={index}
            className="optionsDiv"
            draggable
            onDragStart={(e) => handleDragStart(e, index, option.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index, option.side)}
          >
            {option.option}
          </div>
        );
      });
      return leftArray;
    }
    return <></>;
  }
  function rightData() {
    
    let rightArray = [];
    if (right[0].option !== "") {
      right.map((option, index) => {
        rightArray.push(
          <div
            key={index}
            className="optionsDiv"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index, option.side)}
          >
            {option.option}
          </div>
        );
      });
      return rightArray;
    }
    return <></>;
  }
  //#endregion

  //#region dragAndDrop Logic
  function handleDragStart(e, index, id) {
    e.dataTransfer.setData("index", index.toString());
    e.dataTransfer.setData("id", id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, newIndex, side) {
    
    if (newIndex === "main") {
      const draggedIndex = parseInt(e.dataTransfer.getData("id"));
      console.log("draggedIndex :", draggedIndex);
      if (draggedIndex == NaN || draggedIndex == undefined) {
        return;
      }
      if (side === "right") {
        // let updatedTasks = left.map((option) =>
        //   option.id == draggedIndex ? {...option, side:"right"}: option
        // );
        let updatedTasks = left.filter((option) => option.id === draggedIndex);
        if (updatedTasks.length !== 0) {
          updatedTasks[0].side = "right";
          let leftFilteredData = left.filter(
            (option) => option.id !== draggedIndex
          );
          setLeft(leftFilteredData);

          if (right[0].option === "") {
            setRight(updatedTasks);
          } else {
            setRight([...right, updatedTasks[0]]);
          }
        }
      } else {
        let updatedTasks = right.map((option) =>
          option.id == draggedIndex ? { ...option, side: "left" } : option
        );
        setLeft(updatedTasks);
      }
    } else {
      const draggedIndex = parseInt(e.dataTransfer.getData("index"));

      if (side == "right") {
        const draggedItem = right[draggedIndex];
        // Remove the item from its previous position
        let newItems = right.filter((item, index) => index !== draggedIndex);
        // Add the item to the new position
        newItems.splice(newIndex, 0, draggedItem);

        setRight(newItems);
      } else {
        const draggedItem = left[draggedIndex];
        let newItems = left.filter((item, index) => index !== draggedIndex);
        // Add the item to the new position
        newItems.splice(newIndex, 0, draggedItem);

        setLeft(newItems);
      }
    }
  }

  //#endregion
  return (
    <div className="main-dd">
      <div className="main-dd-content">
        <div className="leftDiv">
          <h3>Left</h3>
          {leftData()}
        </div>
        <div
          className="rigthDiv"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, "main", "right")}
        >
          <h3>Right</h3>
          {/* {right[0].option !== "" ? (rightData()):(<></>)} */}
          {rightData()}
        </div>
      </div>
    </div>
  );
});

export default DragAndDrop;

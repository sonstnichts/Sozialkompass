import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { questionData } from "./questionData";
const Question = () => {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();
  const addNumber = () => {
    number < questionData.length - 1
      ? setNumber(number + 1)
      : navigate("/results");
  };
  const subtractNumber = () => {
    if(number != 0) setNumber(number - 1)
  };
  return (
    <>
      <h1>{questionData[number].question}</h1>
      <button onClick = {subtractNumber}>zurück</button>
      <span>
        {number} von {questionData.length} erledigt
      </span>
      {
        questionData[number].questionmode ==="Buttons" ?
        questionData[number].options.map(answer => (
          <button onClick={addNumber} key={answer.id}>
            {answer}
          </button>
        ))
        :
        <>
        <select>
            <option value = ""> --Bitte wähle eine Option-- </option>
            {
            questionData[number].options.map(answer => (
              <option value = {answer}>{answer}</option>
            ))
            }
          </select>
          <button onClick = {addNumber} key = {questionData[number].id}>Bestäigen</button>
        </>
      }
    </>
  );
};
export default Question;

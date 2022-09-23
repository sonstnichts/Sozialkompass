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

  return (
    <>
      <h1>{questionData[number].question}</h1>
      <span>
        {number} von {questionData.length} erledigt
      </span>
      {questionData[number].options.map((answer) => (
        <button onClick={addNumber} key={answer.id}>
          {answer}
        </button>
      ))}
    </>
  );
};

export default Question;

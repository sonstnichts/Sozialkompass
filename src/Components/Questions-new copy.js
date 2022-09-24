import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';import {Button} from 'react-bootstrap'
import "./questions.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { questionData } from "./questionData";
import Carousel from 'react-bootstrap/Carousel'

// const styles = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100',
//   };

const Question = () => {

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex, e) =>{
    setIndex(selectedIndex);
  };

  const addSelect =() => {
    index < questionData.length - 1
    ? setIndex(index + 1)
    : navigate("/results");
  }

  const subtractSelect = () =>{
    if(index != 0) setIndex(index - 1)
  }

  return (
    
    <Carousel interval={null} activeIndex = {index} onSelect = {handleSelect}>

    
    {
      questionData.map(question =>(
        <Carousel.Item>
          <div className="cardcontent">
          <h1>{question.question}</h1>
          <div className="bedienelemente">
          <Button variant="secondary" onClick = {subtractSelect}>zurück</Button>
        {  
        question.questionmode ==="Buttons" ?
        question.options.map(answer => (
          <Button variant="secondary" onClick={addSelect} key={answer.id}>
            {answer}
          </Button>
        ))
        :
        <>
        <select>
            <option value = ""> --Bitte wähle eine Option-- </option>
            {
            question.options.map(answer => (
              <option value = {answer}>{answer}</option>
            ))
            }
          </select>
          <Button variant="secondary" onClick = {addSelect} key = {question.id}>Bestätigen</Button>
          </>
      } 
      </div>
      </div>
      </Carousel.Item>
      ))};

    </Carousel>
  );




};
export default Question;

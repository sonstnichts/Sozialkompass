//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import results from './results'
import { questionDataUKR } from './questionDataUKR'


class QuestionUKR extends React.Component{
  state = {
    currentQuestion: 0,
    options: [],
    disabled: true,
    isEnd: false
  };

  loadQuestionData = () => {
    // console.log(questionData[0].question)
    this.setState(() => {
      return {
        disabled: true,
        questions: questionDataUKR[this.state.currentQuestion].question,
        options: questionDataUKR[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuestionData();
  }

  nextQuestionHandler = () => {
   
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
    
  };

 

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: questionDataUKR[this.state.currentQuestion].question,
          options: questionDataUKR[this.state.currentQuestion].options,
         
        };
      });
    }
  }
 
  
  finishHandler = () => {
    if (this.state.currentQuestion === questionDataUKR.length - 1) {
      this.setState({
        isEnd: true
      });
    }
    
  };

  render() {
    const { options, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3>Ende der Fragen erreicht </h3>
          <div>
           Hier sind deine möglichen Anträge
           
          
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion}  von ${questionDataUKR.length -
            1} erledigt `}</span>
          {options.map(option => (
            <p
            key={option.id}
          
            
            >
              {option}
            </p>
          ))}
          {currentQuestion < questionDataUKR.length - 1 && (
            <button
             
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === questionDataUKR.length - 1 && (
            <button  onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}



export default QuestionUKR;
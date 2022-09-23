
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import results from './results'
import { questionData } from './questionData'


class Question extends React.Component{
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
        questions: questionData[this.state.currentQuestion].question,
        options: questionData[this.state.currentQuestion].options
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
          questions: questionData[this.state.currentQuestion].question,
          options: questionData[this.state.currentQuestion].options,
         
        };
      });
    }
  }
 
  
  finishHandler = () => {
    if (this.state.currentQuestion === questionData.length - 1) {
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
          <span>{`Questions ${currentQuestion}  von ${questionData.length -
            1} erledigt `}<br/></span>
          {options.map(option => (
            <>
            <button
              onClick={console.log("Hallo")}
              key={option.id}
            >hallo
              {option}
            </button>
            <br/>
          </>
          ))}
          {currentQuestion < questionData.length - 1 && (
            <button
             
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === questionData.length - 1 && (
            <button  onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}



export default Question;




  /*  function Question() {
        return (

   
            <Card style={{ width: '18rem' }}>
              
              <Card.Body variant ="center">
                <Card.Title>Frage</Card.Title>
                <Card.Text>
                  Beschreibung
                </Card.Text>
                <Button onClick={() => alert('Antwort: Ja')}>  Ja </Button>
                 
                <Button onClick={() => alert('Antwort: Nein')}>  Nein </Button>
              </Card.Body>
            </Card>
          
        
        );
   } */
        
    
    


    








import {
  Grid, Container, Paper, Button, Box, styled, Typography, TextField, Input, Card, CardContent, CardAct, Buttonions, Autocomplete,
} from "@mui/material";
import test from "../Assets/test"
import attribute from "../Assets/Attribute"
import React, { useEffect, useState } from 'react';
import { sizing } from '@mui/system';
import { useTheme, ThemeProvider } from "@mui/material/styles";





function RenderPreviousContent() {


  return (
    <h1>TEST</h1>
  )
}


function Iterate() {




  return (

    test.Antworten.map((entry) => {
      entry.Bezeichnung.map((name) => {


        <h1> test </h1>




        /* if (value.includes('Auswahl')) {
          <RenderCategory />
        }
        else if (value.includes('Ganzzahl')) {
    
        }
        else if (value.includes('JaNein')) {
    
        } */
      })
    })



  )


}

function RenderNumbers() {
  return (
    <TextField id="outlined-basic" label="ttt" variant="outlined" />
  )
}


export function Question() {
  const theme = useTheme();



  const [message, setMessage] = useState('');
  const [current, setCurrent] = useState(['eins','zwei'])
  const [question, setQuestion] = useState({});
  const fetchUrl = "http://127.0.0.1:5000/api/tree";
  const handleSubmit = () => {
    fetch(fetchUrl, { method: "GET" })
      .then(res => res.json())
      .then(
        (result) => {
          setQuestion(result)
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const updatequestion = (id) => {
    console.log(id)
    fetch(fetchUrl, { method: "POST", body: JSON.stringify({ _id: id }), headers: { 'Content-Type': 'application/JSON' } })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setQuestion(result)
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    handleSubmit()
  }, []);

  const compareQuestion = (mess) => {
const answers = question.Antworten
console.log(question.Antworten)


    
      question.Antworten?.map((entry, index) => {
        console.log(entry.Bezeichnung)
        var convert = JSON.parse(entry.Bezeichnung);
        const both = [convert, entry.NodeId]

        convert.forEach(function (item, n) {


          if (mess >= convert[0] && mess <= convert[1]) {
            updatequestion(entry.NodeId)

          }
        })
      }
      )
    
  }

  const getAnswerNode = (value) =>{
    question.Antworten?.map((entry, index) => {
      if(value === entry.Bezeichnung){
        updatequestion(entry.NodeId)
      }
    })}





  return (
    <ThemeProvider theme={theme}>
      <div className="Question">
        <Container border={40}>

          <Grid
            container spacing={24}
            justifyContent="center"
            alignItems="center">
            <Grid item md={4}>


            </Grid>
            <Grid item md={4}>
              <Card style={{
                width: '100%',
                margin: 'auto',
                padding: '10px',
                backgroundColor: '#ECEFF1',
                minHeight: '30vw',
                marginTop: "100px",
              }}>
                <CardContent>
                  {question.Frage && <h1>{question.Frage}</h1>}

                  {question.Kategorie == "Auswahl" &&
                    <div>


                      <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={question.Antworten?.map((entry, index) => (entry.Bezeichnung))} 
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Eingabe" />} onChange={(event, value) => getAnswerNode(value)}>
                       
                      </Autocomplete>
                      


                    </div>}




                  {question.Kategorie == "Ganzzahl" &&
                    <div>

                      <Input type="number" id="outlined-basic" label="Eingabe" variant="outlined" onChange={handleChange}
                        value={message}></Input>

                      <Button onClick={() => compareQuestion(message)}>Weiter</Button>
                    </div>}


                  <Button onClick={() => updatequestion('reset')}>Neu Starten</Button>
                  {question.parentId && <Button onClick={() => updatequestion(question.parentId)}>zurück</Button>}
                  {question.result?.map((result, index) => (
                    <div key={index}>{result}</div>
                  ))}
                  {question.Kategorie && <div>{question.Kategorie}</div>}
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card style={{
                width: '100%',
                margin: 'auto',
                padding: '10px',
                backgroundColor: '#ECEFF1',
                minHeight: '30vw',
                marginTop: "100px",
              }}>
                <CardContent>
                  <Typography variant="h4">Vorläufiges Ergebnis</Typography>
                  {question.Ergebnismenge?.map((result, index) => (
                    <div key={index}>{result}</div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
};


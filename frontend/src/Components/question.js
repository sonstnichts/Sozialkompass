import {
  Grid, Container, Paper, Button, Box, styled, Typography, TextField, Card, CardContent, CardActions,
} from "@mui/material";
import test from "../Assets/test"
import attribute from "../Assets/Attribute"
import React, { useState } from 'react';
import { sizing } from '@mui/system';




/* function ConnectJson () {
  Object.entries(test).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
    Object.entries(attribute.includes(key.includes("Frage"))).forEach(([aKey, aValue]) => {
 
      console.log(`${aKey}: ${aValue}`);
    })
  })
} */


function RenderPreviousContent() {
const [previous, setPrevious] = useState([])

  return (
    <h1>TEST</h1>
  )
}


function KeysAndValues() {



  Object.entries(test).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);

    console.log(value.includes('Auswahl'))
    //const allCategories = test.filter(c => c.Kategorie.includes("Ganzzahl", "Auswahl"))


    if (value.includes('Auswahl')) {
      <RenderCategory />
    }
    else if (value.includes('Ganzzahl')) {

    }
    else if (value.includes('JaNein')) {

    }

  })

}


function RenderCategory() {
  return( <h1>text</h1>)
   }

function RenderNumbers() {
  return (
    <TextField id="outlined-basic" label="ttt" variant="outlined" />
  )
}

function RenderYesNo() {

  return (<div>
    <h1></h1>
    <Button > JA </Button>
    <Button> NEIN </Button>
  </div>
  )
}


export const Question = () => {
  return (
    <Container border={40}>
    
      <Grid
        container spacing={24}
        justifyContent="center"
        alignItems="center">
        <Grid  item md={4}>
        <Button variant="contained"> Zurück </Button>
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
            <h1> <Button onClick={KeysAndValues}> test</Button></h1>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
};


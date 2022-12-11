import {
  Grid,
  Container,
  Paper,
  Button,
  Box,
  styled,
  Typography,
  TextField,
  Input,
  Card,
  CardContent,
  CardAct,
  Buttonions,
  Autocomplete,
  IconButton
} from "@mui/material";
import test from "../Assets/test";
import attribute from "../Assets/Attribute";
import React, { useContext, useEffect, useState } from "react";
import { sizing } from "@mui/system";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { ApplicationContext } from "../App";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

export function Question() {
  const theme = useTheme();

  const { applications, setApplications } = useContext(ApplicationContext);
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(["eins", "zwei"]);
  const [question, setQuestion] = useState({});
  const [count, setCount] = useState(1);

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "rgba(244, 91, 57, 0.71)",

    color: "#0E1C36",
    borderRadius: "25px",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    width: "405px",
    height: "60px",
  }));

  const fetchUrl = "http://127.0.0.1:5000/api/tree";
  const handleSubmit = () => {
    fetch(fetchUrl, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setQuestion(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  const updatequestion = (id) => {
    console.log(id);
    fetch(fetchUrl, {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setQuestion(result);
          setCount(count+1)
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  const compareQuestion = (mess) => {
    const answers = question.Antworten;
    console.log(question.Antworten);

    question.Antworten?.map((entry, index) => {
      console.log(entry.Bezeichnung);
      var convert = JSON.parse(entry.Bezeichnung);
      const both = [convert, entry.NodeId];

      convert.forEach(function (item, n) {
        if (mess >= convert[0] && mess <= convert[1]) {
          updatequestion(entry.NodeId);
        }
      });
    });
  };

  const updateResults = (applications) =>{
    
  }

  const getAnswerNode = (value) => {
    question.Antworten?.map((entry, index) => {
      if (value === entry.Bezeichnung) {
        updatequestion(entry.NodeId);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Question">
        <Container border={40}>
          <Grid
            container
            spacing={24}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={1}>
            {question.parentId && (
                    <IconButton>
                    <ArrowBackIosNewOutlinedIcon  onClick={() => {updatequestion(question.parentId); setCount(count-1)}}>
                     
                        </ArrowBackIosNewOutlinedIcon>
                      zurück
                    </IconButton>
                  )}

            </Grid>
            <Grid item md={6}>
              <Box
                sx={{
            
                  margin: "auto",
                  padding: "10px",
                  backgroundColor: "#FFFFF",
                  minHeight: "30vw",
                  marginTop: "100px",
                  textAlign:"center",
                  alignItems: "justify-start",
                  borderRadius: "16px",
                  border: "2px solid" ,
                  borderColor: "black.500"
                }}
              >
                <h1>
                <Typography variant="h4" > Frage {count}:</Typography>
                </h1>
                  {question.Frage && <h1>{question.Frage}</h1>}

                  {question.Kategorie == "Auswahl" && (
                    <div>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={question.Antworten?.map(
                          (entry, index) => entry.Bezeichnung
                        )}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Eingabe" />
                        )}
                        onChange={(event, value) => getAnswerNode(value)}
                      ></Autocomplete>
                    </div>
                  )}
                  {question.Kategorie == "Ganzzahl" && (
                    <div>
                      <Input
                        type="number"
                        id="outlined-basic"
                        label="Eingabe"
                        variant="outlined"
                        onChange={handleChange}
                        value={message}
                      ></Input>

                      <ColorButton onClick={() => compareQuestion(message)}>
                        Weiter
                      </ColorButton>
                    </div>
                  )}

                  <ColorButton onClick={() => updatequestion("reset")}>
                    Neu Starten
                  </ColorButton>
                  
                  {question.result?.map((result, index) => (
                    <div key={index}>{result}</div>
                  ))}
                  {question.Kategorie && <div>{question.Kategorie}</div>}
           
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  padding: "10px",
                  backgroundColor: "#FFFFF",
                  minHeight: "30vw",
                  marginTop: "100px",
                  textAlign:"center",
                  borderRadius: "16px",
                  border: "2px solid" ,
                  borderColor: "black"
                }}
              >
                
                  <Typography variant="h4">Vorläufiges Ergebnis</Typography>
                  {question.Ergebnismenge?.map((result, index) => (
                    <div key={index}>{result}</div>
                  ))}
                
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

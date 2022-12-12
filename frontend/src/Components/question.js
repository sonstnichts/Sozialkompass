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
  FormControl,
  IconButton
} from "@mui/material";
import test from "../Assets/test";
import attribute from "../Assets/Attribute";
import React, { useContext, useEffect, useState } from "react";
import { sizing } from "@mui/system";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from 'react-redux'
import { getApplications } from "../redux/applicationReducer";
import { one, zero, minus } from "../redux/applicationReducer";
import store from "../redux/store"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

export function Question() {
  const theme = useTheme();
  const applications = useSelector((state) => state.application)
  const dispatch = useDispatch()

  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(['']);
  const [question, setQuestion] = useState({});
  const [count, setCount] = useState(1);
  const [declined, setDeclined] = useState([]);


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
  const handleDeclined = (event) =>{
    setDeclined(event.target.value)
  }
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



  const updateResults = () => {



    var resultArr = question.result



    if (resultArr.includes('BAB')) {
      dispatch(one({ BAB: 1 }))
    } else {
      dispatch(one({ BAB: -1 }))
    }

    if (resultArr.includes('Kindergeld')) {
      dispatch(one({ Kindergeld: 1 }))
    } else {
      dispatch(one({ Kindergeld: -1 }))
    }

    if (resultArr.includes('BafÃ¶g')) { // TODO: CHANGE ON DATABASE UPDATE 
      dispatch(one({ BAFög: 1 }))
    } else {
      dispatch(one({ BAFög: -1 }))
    }

    if (resultArr.includes('ALG2')) {
      dispatch(one({ ALG2: 1 }))
    } else {
      dispatch(one({ ALG2: -1 }))
    }

    if (resultArr.includes('Wohngeld')) {

      dispatch(one({ Wohngeld: 1 }))
    } else {
      dispatch(one({ Wohngeld: -1 }))
    };
  }
  //TODO: CHANGE STRINGS ON NEW DATASTRUCTURE
  const declinedResults = () => {

    let allResults = [
      "BafÃ¶g",
      "Kindergeld",
      "ALG2",
      "Wohngeld",
      "BAB"]
    const progressResults = question.Ergebnismenge
    const acceptedResults = question.Akzeptiert
    const tempResults = (allResults.filter(x => !progressResults.includes(x)))
    console.log(tempResults)
    setDeclined(tempResults)
    const allDeclinedResults = (tempResults.filter(x => !acceptedResults.includes(x)))
    setDeclined(allDeclinedResults)
 
  
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
            <Grid item xs={1}>
              {question.parentId && (
                <IconButton onClick={() => { updatequestion(question.parentId); setCount(count - 1); setCurrent(''); setMessage('') }}>
                  <ArrowBackIosNewOutlinedIcon  >

                  </ArrowBackIosNewOutlinedIcon>
                  zurück
                </IconButton>
              )}

            </Grid>
            <Grid item md={6}>
              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  margin: "auto",
                  padding: "10px",
                  backgroundColor: "#FFFFF",
                  minHeight: "40vw",
                  marginTop: "100px",
                  alignItems: "center",
                  width: "30vw",
                  borderRadius: "16px",
                  border: "2px solid",
                  borderColor: "black.500",
                  justiyContent: 'space-between',
                  flexDirection: 'column'
                }}
              >
                <h1>
                  <Typography variant="h4" > Frage {count}:</Typography>
                </h1>
                {question.Frage && <h1>{question.Frage}</h1>}

                {question.Kategorie == "Auswahl" && (
                  <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={current}
                        options={question.Antworten?.map(
                          (entry, index) => entry.Bezeichnung
                        )}

                        sx={{ width: 300, alignItems: "center", m: 3 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Eingabe" />
                        )}
                        onChange={(event, value) => { setCurrent(value) }}
                      ></Autocomplete>
                    </FormControl>
                    <div>
                      <ColorButton onClick={() => { getAnswerNode(current); setCount(count + 1); setCurrent('');declinedResults()}}>
                        Weiter
                      </ColorButton>
                    </div>
                  </div>

                )}
                {question.Kategorie == "Ganzzahl" && (
                  <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        sx={{
                          type: "number",
                          id: "outlined-basic",
                          label: "Eingabe",
                          variant: "outlined",
                          alignItems: "center",
                          m: 3
                        }}
                        onChange={handleChange}
                        value={message}

                      ></TextField>
                    </FormControl>
                    <div>
                      <ColorButton onClick={() => { compareQuestion(message); setCount(count + 1); setMessage('');declinedResults() }}>
                        Weiter
                      </ColorButton>
                    </div>
                  </div>
                )}



                {question.result?.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}

                <ColorButton sx={{ marginTop: 20 }} onClick={() => { updatequestion("reset"); setCount(1) }}>
                  Neu Starten
                </ColorButton>

              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  padding: "10px",
                  backgroundColor: "#FFFFF",
                  minHeight: "40vw",
                  marginTop: "100px",
                  textAlign: "center",
                  borderRadius: "16px",
                  border: "2px solid",
                  borderColor: "black"
                }}
              >

                <Typography variant="h4">Vorläufiges Ergebnis</Typography>
                {question.Ergebnismenge && <h1>{question.Ergebnismenge?.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}</h1>

                }

                {question.Akzeptiert && <h4>{question.Akzeptiert?.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}</h4>

                }

                <h2>{declined}</h2>

                <ColorButton sx={{ marginTop: 20, width: "200px", }} onClick={() => { updateResults() }}> {/* updateResults() */}
                  Beenden
                </ColorButton>

              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

import {
  Grid,
  Container,
  Paper,
  Button,
  Box,
  styled,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from "react-router-dom";


export default function Question() {
  const theme = useTheme();
  const applications = useSelector((state) => state.application)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(['']);
  const [question, setQuestion] = useState({});
  const [count, setCount] = useState(1);
  const [declined, setDeclined] = useState([]);
  const [faded, setFaded] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "rgba(244, 91, 57, 0.71)",

    color: "#0E1C36",
    borderRadius: "25px",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    width: "405px",
    height: "60px",
  }));


  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }


  const fetchUrl = "/api/tree";
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

  function navigateResult() {
    navigate("/results")

  }

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



  const updateResults = () => { // Needs to be completely changed in the Future



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

    if (resultArr.includes('BAföG')) {  
      dispatch(one({ BAföG: 1 }))
    } else {
      dispatch(one({ BAföG: -1 }))
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

    console.log(applications)
  }

  const declinedResults = () => {

    let allResults = [ // Workaround to get all possible Applications
      "BAföG",
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
                      <ColorButton onClick={() => { getAnswerNode(current); setCount(count + 1); setCurrent(''); declinedResults() }}>
                        Weiter
                      </ColorButton>

                  
                    </div>
                    <Button variant="outlined" size="large"  sx={{ marginTop:5, color:"grey", border:"2px grey solid" }} onClick={() => { updatequestion(question.noneoftheabove); setCount(count+1) }}>
                  Überspringen
                </Button>
                  
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
                      <ColorButton onClick={() => { compareQuestion(message); setCount(count + 1); setMessage(''); declinedResults() }}>
                        Weiter
                      </ColorButton>
                    </div>
                  </div>
                )}


                {question.result && (

                  <ColorButton onClick={() => { navigateResult(); updateResults() }}> Ergebnisse anzeigen </ColorButton>
                )}

                

                <ColorButton sx={{ marginTop: 15 }} onClick={() => { updatequestion("reset"); setCount(1) }}>
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
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleOutlineIcon />
                      </Avatar>
                    </ListItemAvatar>
                    {question.Akzeptiert && <div>{question.Akzeptiert?.map((result, index) => {
                      return (<h2 key={index}> {result}</h2>);
                    })}</div>}


                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HelpOutlineIcon />
                      </Avatar>
                    </ListItemAvatar>
                    {question.Ergebnismenge && <div>{question.Ergebnismenge?.map((result, index) => {
                      return (<h2 key={index}> {result}</h2>);
                    })}</div>}

                  </ListItem>
                  <Divider variant="inset" component="li" />

                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HighlightOffIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <div>
                      {declined.map((value, index) => {
                        return (
                          <h2 key={index}>
                            {value}
                          </h2>
                        );
                      })
                      }
                    </div>
                  </ListItem>
                </List>







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


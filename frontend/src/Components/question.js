import {
  Grid,
  Container,
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
import React, {useEffect, useState } from "react";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from 'react-redux'
import { getApplications } from "../redux/applicationReducer";
import { applicationUpdate } from "../redux/applicationReducer";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from "react-router-dom";


export default function Question() {
  const theme = useTheme();
  const applications = useSelector((state) => state.application)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, setMessage] = useState(""); //state to save and use the number input from input fields
  const [input, setInput] = useState(['']); //state to save and use chosen inputs from dropdowns
  const [question, setQuestion] = useState({}); //state for the node_ids of the questions
  const [count, setCount] = useState(1); //counter to count the number of questions (needs improvement as there are some bugs)
  const [declined, setDeclined] = useState([]);//state storing the declined results

  // custom styling for some of the buttons used
  const ColorButton = styled(Button)(({ theme }) => ({ 
    backgroundColor: "rgba(244, 91, 57, 0.71)",
    color: "#0E1C36",
    borderRadius: "25px",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    width: "405px",
    height: "60px",
  }));

  //link to results
  function navigateResult() { 
    navigate("/results")
  }

  const fetchUrl = "/api/tree"; //Url to fetch from database

  //handling the submit so updating the question state works properly
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

//needed to handle changes to our message state
  const handleChange = (event) => { 
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  //function to update the current node_id to the next node_id in the question tree
  const updatequestion = (id) => { 
    console.log(id);
    fetch(fetchUrl, { //fetching node_id from database
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


//taking input from the input fields and comparing it with valid answer possibilities
  const compareQuestion = (message) => { 
    const answers = question.Antworten;
  console.log(question.Antworten)
    question.Antworten?.map((entry, index) => {
      console.log(entry.Bezeichnung);
      var convertedJson = JSON.parse(entry.Bezeichnung); 

      convertedJson.forEach(function (item, n) { //loop to determine correct question
        if (message >= convertedJson[0] && message <= convertedJson[1]) {
          updatequestion(entry.NodeId);

        }
      });
    });
  };


//comparing the result array with all possible applications and assigning 1 for accepted and -1 for declined
//Needs to be changed in the Future, because its not the best solution (just a workaround)
//ending the progress early is also not possible at the moment and needs to be added
  const updateResults = () => { 
    var resultArr = question.result
    if (resultArr.includes('BAB')) {
      dispatch(applicationUpdate({ BAB: 1 })) //dispatch lets us update the redux slice using applicationUpdate
    } else {
      dispatch(applicationUpdate({ BAB: -1 }))
    }

    if (resultArr.includes('Kindergeld')) {
      dispatch(applicationUpdate({ Kindergeld: 1 }))
    } else {
      dispatch(applicationUpdate({ Kindergeld: -1 }))
    }

    if (resultArr.includes('BAföG')) {  
      dispatch(applicationUpdate({ BAföG: 1 }))
    } else {
      dispatch(applicationUpdate({ BAföG: -1 }))
    }

    if (resultArr.includes('ALG2')) {
      dispatch(applicationUpdate({ ALG2: 1 }))
    } else {
      dispatch(applicationUpdate({ ALG2: -1 }))
    }

    if (resultArr.includes('Wohngeld')) {

      dispatch(applicationUpdate({ Wohngeld: 1 }))
    } else {
      dispatch(applicationUpdate({ Wohngeld: -1 }))
    };
  }


  //function to get all the declined Results
  //has some issues as sometimes the results do not get stored properly
  //Reason for the issues are asynchronous states, will get fixed in near future 
  const declinedResults = () => {

    let allResults = [ //Workaround to get all possible Applications as complete list of applications is not in database yet
      "BAföG",
      "Kindergeld",
      "ALG2",
      "Wohngeld",
      "BAB"]
    const progressResults = question.Ergebnismenge //storing all possible applications
    const acceptedResults = question.Akzeptiert //storing only the accepted applications

    const tempResults = (allResults.filter(x => !progressResults.includes(x))) // filtering the applications which are not determined

    setDeclined(tempResults) //updating the state with the filtered applications
    const allDeclinedResults = (tempResults.filter(x => !acceptedResults.includes(x))) //filtering the accepted results so only the declined results remain
    setDeclined(allDeclinedResults) //state gets set with all declined applications

  }

  //getting the id of the chosen answer and updating the question with the corresponding id
  const getAnswerNode = (value) => {
    question.Antworten?.map((entry, index) => {
      if (value === entry.Bezeichnung) {
        updatequestion(entry.NodeId);
      }
    });
  };


  //needs to be updated for mobile usage
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
                <IconButton onClick={() => { updatequestion(question.parentId); setCount(count - 1); setInput(''); setMessage('') }}> 
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

                {question.Kategorie == "Auswahl" && ( //rendering if Kategorie is Auswahl
                  <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={input}
                        options={question.Antworten?.map(
                          (entry, index) => entry.Bezeichnung
                        )}

                        sx={{ width: 300, alignItems: "center", m: 3 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Eingabe" />
                        )}
                        onChange={(event, value) => { setInput(value) }}
                      ></Autocomplete>
                    </FormControl>
                    <div>
                      <ColorButton onClick={() => { getAnswerNode(input); setCount(count + 1); setInput(''); declinedResults() }}>
                        Weiter
                      </ColorButton>
                  
                    </div>
                    <Button variant="outlined" size="large"  sx={{ marginTop:5, color:"grey", border:"2px grey solid" }} onClick={() => { updatequestion(question.noneoftheabove); setCount(count+1) }}>
                  Überspringen 
                </Button>
                  </div>
                )}
                {question.Kategorie == "Ganzzahl" && ( //rendering if Kategorie is Ganzzahl
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

                {question.result && ( // rendering all data in question.result if any results exist

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
                    {question.Ergebnismenge && // rendering if node has applications
                    <div>{question.Ergebnismenge?.map((result, index) => {
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
                <ColorButton sx={{ marginTop: 20, width: "200px", }} onClick={() => {{ navigateResult(); updateResults() }}}> 
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


import React from "react";
import { useReactToPrint } from "react-to-print";
import "./results.css";
import {
  Stack,
  Box,
  Button,
  List,
  ListItemButton,
  Fade,
  Typography,
  styled
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useRef, useEffect } from "react";
import { textAlign } from "@mui/system";
import logo from "../../Assets/logo/mainLogo.png";
import { useSelector } from "react-redux";


export default function Results({ applicationstatus }) {


  const applications = useSelector((state) => state.application)
  // Settings for size of Logo (Compass picture)
  const Logo = styled("img")(() => ({
  width: "130px",
  minWidth: "2rem",
  }));

  const fetchUrl = "/api/results";



console.log(applications)
  //function for fading
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  // state for application details
  const data = [
    {
      Beschreibung:
        "Laden...",
      Name: "Laden...",
      Adresse: "Laden...",
      Link: "Laden...",
      Kontakt: {
        Telefon: "Laden...",
        Fax: "Laden...",
        Email: "Laden...",
      },
    }
  ];
  const[applicationDetails,setApplicationDetails] = useState(data)

  //State for the selected application in the list
  const [selectedIndex, setSelectedIndex] = useState(0);
  //State for the fade effect
  const [faded, setFaded] = useState(true);

  // mock applicationDetails for detailed description of the application

  useEffect(() => {
    console.log(applications)
    if(applications){
    loadResults()
    }
  }, [applications]);


  const loadResults = () => {

     fetch(fetchUrl, { method: "POST",body:JSON.stringify(applications),headers:{'Content-Type':'application/JSON'}})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setApplicationDetails(result)
        },
        (error) => {
          console.log(error);
        }
      );
  };

  

  // Handles the click of an item in the list
  const handleListItemClick = async (event, index) => {
    setFaded(false);
    await timeout(300);
    setSelectedIndex(index);
    setFaded(true);
  };

  // useRef for printing
  const componentRef = useRef();

  //handles the effect of the print button
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Befragungsergebnis",
    onAfterPrint: () => alert("Druck erfolgreicht"),
  });

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "90vh",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={1}
          height="100%"
        >
          <Box
            sx={{
              margin: "1em",
              borderRadius: "20px",
              border: 1,
              overflow: "hidden",
              height: "70vh",
              width: "20vw",
              boxShadow: 2,
            }}
          >
            <Stack
              direction="column"
              justifyContent="stretch"
              alignItems="stretch"
              spacing={0}
              height="100%"
            >
              <Box
                sx={{
                  bgcolor: "rgba(244, 91, 57, 0.71)",
                  color: "white",
                  height: "12%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                  boxShadow: 3,
                }}
              >
                Ihr Ergebnis
              </Box>
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "100%",
                  height: "78%",
                }}
              >
                {applicationDetails.map((application, index) => (
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      height: "15%",
                      alignItems: "center",
                      backgroundColor: "rgba(14, 28, 54, 0.8)",
                      color: "white",
                      fontSize: 25,
                    }}
                  >
                    {applications[application["Antrag"]] === 0 ? (
                      <HelpOutlineIcon fontSize="large" />
                    ) : applications[application["Antrag"]] === 1 ? (
                      <CheckCircleOutlineIcon fontSize="large" />
                    ) : (
                      <CancelOutlinedIcon fontSize="large" />
                    )}
                    {application["Antrag"]}
                    <ArrowForwardIosIcon fontSize="large" />
                  </ListItemButton>
                ))}
              </List>
              <Button
                size="large"
                onClick={handlePrint}
                variant="outlined"
                sx={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  fontSize: 25,
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                Ergebnis drucken
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              margin: "1em",
              borderRadius: "20px",
              border: 1,
              overflow: "hidden",
              height: "70vh",
              width: "50vw",
              boxShadow: 2,
            }}
          >
            <Fade in={faded}>
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="stretch"
                spacing={0}
                margin="5rem"
                height="80%"
              >
                {" "}
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={0}
                  height="100%"
                >
                  {Object.values(applications)[selectedIndex] === -1 ? (
                    <h1>
                      Du hast wahrscheinlich keinen Anspruch auf{" "}
                      {Object.keys(applications)[selectedIndex]}.
                    </h1>
                  ) : Object.values(applications)[selectedIndex] === 0 ? (
                    <h1>
                      Du hast eventuell Anspruch auf{" "}
                      {Object.keys(applications)[selectedIndex]}.
                    </h1>
                  ) : (
                    <h1>
                      Du hast wahrscheinlich Anspruch auf{" "}
                      {Object.keys(applications)[selectedIndex]}.
                    </h1>
                  )}
                  <p margin="5rem">{applicationDetails[selectedIndex]["Beschreibung"]}</p>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="stretch"
                  alignItems="flex-start"
                  spacing={0}
                >
                  <h1>Erfahr mehr unter:</h1>
                  <Stack
                    direction="row"
                    justifyContent="stretch"
                    alignItems="center"
                    spacing={10}
                    height="100%"
                    width="100%"
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-around"
                      alignItems="flex-start"
                      spacing={0}
                      height="100%"
                    >
                      <p>{applicationDetails[selectedIndex]["Name"]}</p>
                      <p>Adresse: {applicationDetails[selectedIndex]["Adresse"]}</p>
                      <p>
                        Tel.: {applicationDetails[selectedIndex]["Kontakt"]["Nummer"]}
                        <br />
                        Fax: {applicationDetails[selectedIndex]["Kontakt"]["Fax"]}
                        <br />
                        Email: {applicationDetails[selectedIndex]["Kontakt"]["Mail"]}
                      </p>
                    </Stack>
                    <Stack
                      direction="column"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={0}
                      height="100%"
                      width="40%"
                    >
                      <Box
                        height="100%"
                        alt=""
                        sx={{
                          height: 100,
                          width: 200,
                          justifyContent: "center",
                        }}
                      />
                      <Button
                        variant="contained"
                        href={applicationDetails[selectedIndex]["Link"]}
                        target="_blank"
                        size="large"
                      >
                        Zur Webseite
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Fade>
          </Box>
        </Stack>
      </Box>
      {/* html for print function */}
      <Box display="none">
        <Box ref={componentRef} height="90vh" margin="5%">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0}
            height="100%"
          >
            <Box height="15%" justifyContent="center" alignItems="center" display="flex">
              <Logo src = {logo}/>
              <Typography variant="h3" textAlign="center">
                Sozialkompass Befragungsergebnis
              </Typography>
            </Box>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={3}
              height="85%"
            >
              {applicationDetails.map((application, index) => (
                <Box
                  flexDirection="row"
                  display="flex"
                  height="15%"
                  alignItems="center"
                  justifyContent="space-between"
                  border={1}
                  padding="1em"
                  spacing={3}
                  borderRadius={1}
                >
                  <Box
                    flexDirection="row"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    width="20%"
                  >
                    {applications[application["Antrag"]] === 0 ? (
                      <HelpOutlineIcon fontSize="large" />
                    ) : applications[application["Antrag"]] === 1 ? (
                      <CheckCircleOutlineIcon fontSize="large" />
                    ) : (
                      <CancelOutlinedIcon fontSize="large" />
                    )}
                    <Typography variant="h6">{application["Antrag"]}</Typography>
                  </Box>
                  <Typography width="40%">{application["Name"]}</Typography>
                  <Box width="30%">
                    <Typography>
                      Tel.: {application["Kontakt"]["Nummer"]}
                    </Typography>
                    <Typography>
                      Fax: {application["Kontakt"]["Fax"]}
                    </Typography>
                    <Typography>
                      Email: {application["Kontakt"]["Mail"]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

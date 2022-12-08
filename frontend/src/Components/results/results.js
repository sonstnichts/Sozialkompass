import React from "react";
import "./results.css";
import {
  Stack,
  Box,
  Button,
  List,
  ListItemButton,
  Fade,
  colors,
  makeStyles,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import logo from "../../Assets/logo/Uni.png";

export function Results() {
  const applications = [
    "Bafög",
    "Bab",
    "Kindergeld",
    "Bafög",
    "Bab",
    "Kindergeld",
    "Bafög",
    "Bab",
    "Kindergeld",
    "Bafög",
    "Bab",
    "Kindergeld",
  ];

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [faded, setFaded] = useState(true);

  const data = [
    {
      Beschreibung:
        "Wohngled wird wirtschaftlichen Sicherung angemessen und familiengerechten Wochenenasdölfkajsöd kljasködlfjasdjfasdfjasödlfkjasd öflkjasdöfkjqasdfasdfasdfsadf",
      Name: "Amt für Wohnungswesen und Quartiersentwicklung",
      Adresse: "Bahnhofstraße 8-10 48149 Münster",
      Link: "https://www.stadt-muenster.de/wohnungsamt/startseite",
      Kontakt: {
        Telefon: "195519574",
        Fax: "321+6121655461",
        Email: "wohngeld@stadt-muenster.de",
      },
    },
    {
      Beschreibung:
        "Wohngled wird wirtschaftlichen Sicherung angemessen und familiengerechten Wochenenasdölfkajsöd kljasködlfjasdjfasdfjasödlfkjasd öflkjasdöfkjqasdfasdfasdfsadf",
      Name: "Amt für Kindergeld",
      Adresse: "Bahnhofstraße 8-10 48149 Münster",
      Link: "https://www.stadt-muenster.de/wohnungsamt/startseite",
      Kontakt: {
        Telefon: "195519574",
        Fax: "321+6121655461",
        Email: "wohngeld@stadt-muenster.de",
      },
    },
  ];

  const handleListItemClick = async (event, index) => {
    setFaded(false);
    await timeout(300);
    setSelectedIndex(index);
    setFaded(true);
  };

  return (
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
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                boxShadow: 3,
              }}
            >
              Ihr Ergebnis
            </Box>
            <List
              sx={{
                overflow: "auto",
                maxHeight: "100%",
                height: "80%",
              }}
            >
              {applications.map((application, index) => (
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
                  }}
                >
                  <CheckCircleOutlineIcon />
                  {application}
                  <ArrowForwardIosIcon />
                </ListItemButton>
              ))}
            </List>
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
                justifyContent="stretch"
                alignItems="flex-start"
                spacing={0}
                height="100%"
              >
                <h1>
                  Du könntest Anspruch auf {applications[selectedIndex]} haben!
                </h1>
                <p margin="5rem">{data[selectedIndex]["Beschreibung"]}</p>
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
                >
                  <Stack
                    direction="column"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    spacing={0}
                    height="100%"
                  >
                    <p>{data[selectedIndex]["Name"]}</p>
                    <p>Adresse: {data[selectedIndex]["Adresse"]}</p>
                    <p>
                      Tel.: {data[selectedIndex]["Kontakt"]["Telefon"]}
                      <br />
                      Fax: {data[selectedIndex]["Kontakt"]["Fax"]}
                      <br />
                      Email: {data[selectedIndex]["Kontakt"]["Email"]}
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
                      component="image"
                      alt=""
                      src={logo}
                      sx={{
                        height: 100,
                        width: 200,
                        justifyContent: "center",
                      }}
                    />
                    <Button
                      variant="contained"
                      href={data[selectedIndex]["Link"]}
                      target="_blank"
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
  );
}

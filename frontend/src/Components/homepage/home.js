import React from "react";
import "./home.css";
import {
  Button,
  Box,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import { Container} from "@mui/system";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import logoHome from "../../Assets/logo/mainLogo.png";
import antraege from "../../Assets/logo/antraege.png";
import resultExample from "../../Assets/logo/resultExample.png";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";


/**
 * We define our own color button
 */
const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(244, 91, 57, 0.71)",

  color: "#0E1C36",
  borderRadius: "25px",
  boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
  width: "405px",
  height: "60px",
  
}));




/**
 * This react element is the homepage 
 * Not the whole homepage, only the upper half
 */
export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();


  /**
   * navigate only works in a function outside of return...
   */
  function handleQuestionClick() {
    
    navigate("/questions");
  }
  function handleAntragClick() {
    navigate("/antraege");
  }

  // Structure of the home page
  // Box is used for setting up objects of home page
  // LogoBig represents the added "Sozialkompass" logo
  // Button adds the "Jetzt starten" button
  // Typography adds text to clarify the intention behind Sozialkompass
  return (
    <ThemeProvider theme={theme}>
      <Box height="80vh" display="flex" flexDirection="column">
        <Container flex={1}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
            sx={{ marginTop: 15, width: "90%" }}
            spacing={0}
          >
            <Grid item md={4}>
              <Box
                component="img"
                height="auto"
                width="353px"
                src={logoHome}
              ></Box>
            </Grid>
            <Grid item md={7}>
              <Box sx={{ marginLeft: 3 }}>
                <Typography
                  sx={{
                    fontSize: "4rem",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    color: "#0E1C36",
                  }}
                >
                  Sozialkompass
                </Typography>
                <Typography
                  align="left"
                  width="125%"
                  sx={{
                    fontSize: "2.875rem",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "2rem",
                    color: "#0E1C36",
                  }}
                >
                  Finde heraus,
                </Typography>
                <Typography
                  style={{ whiteSpace: "pre-line" }}
                  align="left"
                  width="155%"
                  sx={{
                    fontSize: "2.875rem",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    color: "#0E1C36",
                  }}
                >
                  welche Sozialleistungen dir zustehen!
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{ m: 10 }}
            isplay="flex-end"
            margin="auto"
            justifyContent="center"
            alignItems="justify-end"
            textAlign="center"
          >
            <ColorButton onClick={handleQuestionClick}>
              <Typography
                align="center"
                
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "38px",
                  lineHeight: "46px",
                  color: "#0E1C36",
                  textTransform: "none",
                }}
              >
                Start
              </Typography>{" "}
            </ColorButton>
          </Box>
        </Container>
        <Divider />
      </Box>

      <Box
        height="100vh"
        justifyContent="center"
        textAlign="center"
        display="flex"
        flexDirection="column"
      >
        <Container flex={1}>
          <Grid container spacing={45}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                height="auto"
                width="408px"
                src={resultExample}
                sx={{ filter: "blur(0.5px)" }}
              ></Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                align="center"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "3.75rem",
                  lineHeight: "4.3rem",
                  color: "#0E1C36",
                }}
              >
                Sozialkompass
              </Typography>
              <Typography
                align="left"
                width="400%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "2rem",
                  lineHeight: "2.75rem",
                  color: "rgba(14,28,54,0.8)",
                }}
              >
                Unsere Leistungen f??r Dich
              </Typography>
              <Typography
                marginTop="1.25rem"
                align="left"
                width="500%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.8rem",
                  color: "black",
                  fontStyle: "normal",
                }}
              >
                Durch geschickte Fragenwahl wird dir innerhalb weniger Antworten
                ein passendes Formularprofil gestellt
              </Typography>
              <Typography
                marginTop="1.25rem"
                align="left"
                width="500%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.8rem",
                  color: "black",
                  fontStyle: "normal",
                }}
              >
                Damit wei??t du direkt welche Antr??ge passend f??r dich infrage
                kommen.
              </Typography>
            
            <ColorButton
            sx={{marginTop: "50px"}}
            onClick={{}}>
              <Typography
                align="center"
                
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "38px",
                  lineHeight: "46px",
                  color: "#0E1C36",
                  textTransform: "none",
                }}
              >Informationen</Typography>
              
             </ColorButton>
            </Grid>
          </Grid>
          
          
        </Container>
      </Box>
      <Divider />
      <Box
        height="100vh"
        justifyContent="center"
        textAlign="center"
        display="flex"
        flexDirection="column"
      >
        <Container flex={1}>
          <Grid container spacing={45}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                height="auto"
                width="408px"
                src={antraege}
                sx={{ filter: "blur(0.5px)" }}
              ></Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                align="center"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "3.75rem",
                  lineHeight: "4.3rem",
                  color: "#0E1C36",
                }}
              >
                Antr??ge
              </Typography>
              <Typography
                align="left"
                width="400%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "2rem",
                  lineHeight: "2.75rem",
                  color: "rgba(14,28,54,0.8)",
                }}
              >
                Hier findest du alle Antr??ge
              </Typography>
              <Typography
                marginTop="1.25rem"
                align="left"
                width="420%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.8rem",
                  color: "black",
                  fontStyle: "normal",
                }}
              >
                In unserem Verzeichnis findest du Auskunft ??ber alle Antr??ge, die 
                in unserer Abfrage eingeschlossen sind.
              </Typography>
              <Typography
                marginTop="1.25rem"
                align="left"
                width="430%"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.8rem",
                  color: "black",
                  fontStyle: "normal",
                }}
              >
                Hierbei unterscheiden wir nach Wohnort und anderen Kriterien.
              </Typography>
              <ColorButton
            sx={{marginTop: "50px"}}
            onClick={handleAntragClick}>
              <Typography
                align="center"
                
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "38px",
                  lineHeight: "46px",
                  color: "#0E1C36",
                  textTransform: "none",
                }}
              >Antr??ge</Typography>
              
             </ColorButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

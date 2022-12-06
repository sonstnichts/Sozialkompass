import React from "react";
import "./home.css";
import { Grid, Paper, Button, Box, styled, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import logobig from "../../Assets/logo/logoOne.png";
import { Link } from 'react-router-dom'
import { useTheme, ThemeProvider } from "@mui/material/styles";
import people from "../../Assets/logo/People.png";


// Setting the size of the logo
const LogoBig = styled("img")(() => ({
  width: "60rem",
  minWidth: "15rem",
}));

// Homepage
 export function Home() {
  const theme = useTheme();
  // Structure of the home page
  // Box is used for setting up objects of home page
  // LogoBig represents the added "Sozialkompass" logo
  // Button adds the "Jetzt starten" button
  // Typography adds text to clarify the intention behind Sozialkompass
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ width: 300 }}>
          <Box
            sx={{ m: 0 }}
            display="flex-end"
            margin="auto"
            justifyContent="left"
            alignItems="justify-end"
            textAlign="left"
          >
            <LogoBig src={logobig} />
          </Box>
        </Box>

        <Box>
          {/* <Link to = "/question"/> */}
          <Typography align="center" variant="h3">
            Willkommen bei dem Sozialkompass. 
          </Typography>
          <Typography align="center" variant="h4">
            Wir wollen dir helfen Anträge zu finden auf die du Anspruch haben
            kannst, aber schwer zu finden sind. Zum starten klicke einfach auf
            den Knopf unter diesem Text.
          </Typography>
        </Box>
        <Box
          sx={{ m: 10 }}
          isplay="flex-end"
          margin="auto"
          justifyContent="center"
          alignItems="justify-end"
          textAlign="center"
        >
          <Link to="/question" style={{ textDecoration: 'none' }}>
          <Button
          style={{maxWidth: '150px', maxHeight: '150px', minWidth: '150px', minHeight: '150px'}}
            variant="contained"
            color="inherit"
            sx={{ color: 'black', backgroundColor: '#92D293',border: '40px', borderColor: 'black' }}
          >
            
            <Typography align="center" variant="h5">
           START
          </Typography> </Button>
          </Link>
          <Box
          sx={{ m: 11 }}
          display="flex-end"
          margin="auto"
          justifyContent="center"
          alignItems="justify-end"
          textAlign="center"
          
        >
         
          <div style={{ padding: 70 }}>
          <Grid container spacing={45}>
            <Grid item xs={12} sm={6} md={4}>
            
            <img style={{ width: 300, height: 300 }} src={people} alt="React Logo" />
    
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Typography align="center" variant="h2">
           Inhalt
          </Typography>
          <Typography align="center" variant="h4">
           Inhalt
          </Typography>
            </Grid>
            </Grid>
            </div>
            </Box>
            </Box>
            </div>
    </ThemeProvider>
  );
}


{
  /* <ul>
                <li>
                    <Link to ="/"> Home </Link>
                </li>
                <li>
                    <Link to ="/question">Starte hier</Link>
                    </li>
                </ul>
        </div> */
}

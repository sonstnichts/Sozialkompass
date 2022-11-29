import React from "react"; 
import "./home.css"; 
import { Grid, Paper, Button, Box, styled, Typography } from "@mui/material"; 
import logobig from "../Assets/logo/image 1 (1).png"
import {Link} from "react-router-dom"

// Setting the size of the logo
const LogoBig = styled('img')(() => ({
    width: '85rem',
    minWidth: '20rem',
})); 

// Homepage  
function Home(){

    // Structure of the home page 
    // Box is used for setting up objects of home page
    // LogoBig represents the added "Sozialkompass" logo
    // Button adds the "Jetzt starten" button
    // Typography adds text to clarify the intention behind Sozialkompass
    return (
        <div>
          <Box
            display = "flex-end"
            margin = "auto"
            justifyContent = "center"
            alignItems = "justify-end"
            textAlign = "center" >
        <LogoBig src={logobig}  /> 

        <Button href="Components/question" variant="contained" color ="inherit" sx={{ }}  > Jetzt starten </Button>
            {/* <Link to = "/question"/> */}
      
        </Box>
        <Typography variant="title" color="inherit" noWrap>
              &nbsp;
        </Typography>
        <Typography variant="title" color="inherit" noWrap>
              &nbsp;
        </Typography>
        <Typography variant="title" color="inherit" noWrap>
              &nbsp;
        </Typography>
        <Typography align="center" variant="h2">
            Dialog starten.
        </Typography>
        <Typography align="center" variant="h2">
            Ansprüche prüfen.  
        </Typography>
    </div>
        
    )
}

export default Home; 
            {/* <ul>
                <li>
                    <Link to ="/"> Home </Link>
                </li>
                <li>
                    <Link to ="/question">Starte hier</Link>
                    </li>
                </ul>
        </div> */}
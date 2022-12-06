import React from "react"; 
import "./home.css"; 
import { createTheme } from '@mui/material';
import { Grid, Paper, Button, Box, styled, Typography } from "@mui/material"; 
import {theme} from "../theme";


export function Contact(){

    return(
        <Box
        sx={{
          width: 'flex',
          height: '350px',
          backgroundColor: '#0E1C36 ',
          
        }}
    >
      <Box>
        <div style={{ padding: 70 }}>
          <Grid container spacing={45}>
            <Grid item xs={12} sm={6} md={4}>
            <Typography align="center" variant="h2">
            Kontakt
          </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Typography align="center" variant="h2">
           Inhalt
          </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <Typography align="center" variant="h2">
           *Logo
          </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  );
      }; 
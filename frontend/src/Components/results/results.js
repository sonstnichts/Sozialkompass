import React from "react";
import "./results.css";
import { Stack, Box, Divider,List, ListItemButton, ListItemIcon } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useState} from 'react'

export function Results() {
  const applications = ["Bafög", "Bab", "Kindergeld","Bafög", "Bab", "Kindergeld","Bafög", "Bab", "Kindergeld","Bafög", "Bab", "Kindergeld"];

  const[selectedIndex,setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) =>{
    setSelectedIndex(index)
  }

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
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontWeight:"bold",
                fontSize:20,
                boxShadow:3
                
              }}
            >
              Ihr Ergebnis
            </Box>
            <List
                                sx={{
                                    overflow:"auto",
                                    maxHeight:"100%",
                                    height:"100%"
                                  }}
            >
              {applications.map((application,index) => (
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick = {(event)=>handleListItemClick(event,index)}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height:"15%",
                    alignItems:"center",
                    backgroundColor:"rgba(14, 28, 54, 0.8)",
                    color:"white"
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
          Hallo
        </Box>
      </Stack>
    </Box>
  );
}

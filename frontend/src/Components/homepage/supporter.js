import React from "react";
import "./home.css";
import { Paper, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./supporter.css";

/**
 * 
 * This react element represents the supporters of the project
 */
export default function Supporter() {
  return (
    <Box
      sx={{
        width: "flex",
        height: "400px",
        backgroundColor: "#4E98DD ",
        padding: "70px",
      }}
    >
      <Box>
        <Typography
          textAlign={"center"}
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "60px",
            lineHeight: "72px",
          }}
        >
          Mitwirkende
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "44px",
          }}
        >
          Unsere Partner
        </Typography>
        <Container>
          <Box
          margin={"auto"}
          width={"632px"}
          paddingTop={"50px"}
          >
            <Box
              sx={{
                width: "148px",
                height: "148px",
                margin: "5px",
                backgroundColor: "rgba(4, 4, 4, 0.66)",
                display: "inline-block"
              }}
            >
              <Paper elevation={0}>
                
              </Paper>
            </Box>
          
          
            <Box
              sx={{
                width: "148px",
                height: "148px",
                margin: "5px",
                backgroundColor: "rgba(4, 4, 4, 0.66)",
                display: "inline-block"
              }}
            >
              <Paper elevation={0} />
            </Box>
          
            <Box
              sx={{
                width: "148px",
                height: "148px",
                margin: "5px",
                backgroundColor: "rgba(4, 4, 4, 0.66)",
                display: "inline-block"
              }}
            >
              <Paper elevation={0} />
            </Box>
          
            <Box
              sx={{
                width: "148px",
                height: "148px",
                margin: "5px",
                backgroundColor: "rgba(4, 4, 4, 0.66)",
                display: "inline-block"
              }}
            >
              <Paper elevation={0} />
            </Box>
            </Box>
            </Container>
          
      </Box>
    </Box>
  );
}

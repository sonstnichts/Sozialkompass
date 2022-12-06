import React from "react";
import "./home.css";
import { createTheme } from "@mui/material";
import { Grid, Paper, Button, Box, styled, Typography } from "@mui/material";
import { theme } from "../theme";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import wwu from "../../Assets/logo/Uni.png";

export function Supporter() {
  return (
    <Box
      sx={{
        width: "flex",
        height: "400px",
        backgroundColor: "#4E98DD ",
      }}
    >
      <Box>
        <div style={{ padding: 70 }}>
          <Grid container spacing={45}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "5%", maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={wwu}
                    alt="wwu logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Universität Münster
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      text
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "5%", maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image="" alt="text" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      text
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      text
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "5%", maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image="" alt="text" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      text
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      text
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  );
}

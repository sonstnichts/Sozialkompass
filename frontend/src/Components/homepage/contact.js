import React from "react";
import "./contact.css";
import { createTheme, Link, List, ListItem } from "@mui/material";
import { Paper, Button, Box, styled, Typography } from "@mui/material";
import { theme } from "../theme";
import { Container, padding, width } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import logoHome from "../../Assets/logo/mainLogo.png";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(244, 91, 57, 0.71)",

  color: "#0E1C36",
  borderRadius: "25px",
  boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
  width: "195px",
  height: "60px",
}));

export function Contact() {
  return (
    <Box
      sx={{
        width: "flex",
        height: "450px",
        backgroundColor: "#0E1C36 ",
        padding: "70px",
      }}
    >
      <Box marginLeft={"15%"}>
        <Grid container spacing={0.5}>
          <Grid xs={4}>
            <Typography
              align="left"
              sx={{
                color: "white",
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "60px",
                lineHeight: "73px",
              }}
            >
              Kontakt
            </Typography>
            <Typography
              align="left"
              sx={{
                color: "rgba(254, 252, 251, 0.66)",
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "36px",
                lineHeight: "44px",
              }}
            >
              Gib uns Feedback
            </Typography>
            <TextField
              id="filled-basic"
              required
              label="Vollständiger Name"
              variant="filled"
              sx={{
                backgroundColor: "white",
                marginTop: "15px",
                width: "300px",
              }}
            />
            <br />
            <TextField
              id="filled-basic"
              required
              label="Deine Email"
              variant="filled"
              sx={{
                backgroundColor: "white",
                marginTop: "15px",
                width: "300px",
              }}
            />
            <br />
            <TextField
              id="filled-multiline-static"
              required
              label="Deine Nachricht"
              multiline
              rows={4}
              variant="filled"
              sx={{
                backgroundColor: "white",
                marginTop: "15px",
                width: "405px",
              }}
            />
            <ColorButton sx={{ margin: "10px" }}>
              <Typography
              sx={{fontFamily: "Inter", fontWeight: 400, fontSize: "24px", color: "#0E1C36", textTransform: "none"}}
              >Senden</Typography>
              </ColorButton>
          </Grid>
          <Grid xs={4}>
            <Typography
              align="left"
              sx={{
                color: "white",
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "60px",
                lineHeight: "73px",
              }}
            >
              Inhalt
            </Typography>
            <Typography
              align="left"
              sx={{
                color: "rgba(254, 252, 251, 0.66)",
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "36px",
                lineHeight: "44px",
              }}
            >
              Alle unsere Seiten
            </Typography>
            <List>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Sozialkompass
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Q&A
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Das Team
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Unser Blog
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Kontakt
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Impressum
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    color: "white",
                    display: "list-item",
                    listStyleType: "disc",
                    pl: 4,
                  }}
                >
                  Datenschutz
                </Link>
              </ListItem>
            </List>
          </Grid>

          <Grid xs={4}>
            <Box component={"img"} src={logoHome} width="266px"></Box>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "23px",
                fontWeight: 400,
                lineHeight: "28px",
                color: "white",
              }}
            >
              <PhoneEnabledIcon
                fontSize="large"
                sx={{ color: "rgba(244, 91, 57, 0.71)" }}
              />{" "}
              +49 1800 00 00
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "23px",
                fontWeight: 400,
                lineHeight: "28px",
                color: "white",
              }}
            >
              <EmailIcon
                fontSize="large"
                sx={{ color: "rgba(244, 91, 57, 0.71)" }}
              />{" "}
              sozialkompass@ercis.uni-muenster.de
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  styled,
  Menu,
  MenuItem,
  ButtonBase,
} from "@mui/material";
import logo from "../Assets/logo/mainLogo.png";
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import LanguageIcon from "@mui/icons-material/Language";
import EasyLanguage from "../Assets/logo/Icon-Easy-Language (1) (1).png";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useEffect } from "react";
import "./NavbarInDialogue.css";

// Settings for size of Logo (Compass picture)
const Logo = styled("img")(() => ({
  width: "76px",
  minWidth: "2rem",
}));

/**
 * Define our own style for the buttons
 */
const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0E1C36",

  color: "white",
  borderRadius: "25px",
  width: "140px",
  height: "60px",
}));
/**
 * We also want an orange button so here it is
 */
const ColorOrangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(244, 91, 57, 0.71)",

  color: "#0E1C36",
  borderRadius: "25px",
  width: "140px",
  height: "60px",
}));


/**
 * React element for the standard navbar
 * We need a navbar on every page.
 * This is the navbar inside of the dialogue
 */
function NavbarInDialogue() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleHomeClick() {
    navigate("/");
  }
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // AppBar is used to create navigation bar (in combination with Typography)
  // Stack is used to include additional pages or menu settings on the right side of the page
  return (
    <AppBar position="sticky" color="default" margin="0px">
      <Container maxWidth="l">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-between",
            
          }}
        >
          <ButtonBase onClick={handleHomeClick}>
            <Logo src={logo} />
            <Typography variant="title" color="inherit" noWrap>
              &nbsp;
            </Typography>
            <Typography variant="title" color="inherit" noWrap>
              &nbsp;
            </Typography>
            <Typography
              component="div"
              spacing={2}
              sx={{
                flexGrow: 3,
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "28px",
                lineHeight: "34px",
                color: "#0E1C36",
              }}
            >
              Sozialkompass
            </Typography>
          </ButtonBase>
          <Stack direction="row" spacing={2}>
            <ColorButton
            onClick={handleHomeClick}
            >
            
              {" "}
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "27px",
                  textTransform: "none",
                }}
              >
                Startseite
              </Typography>
            </ColorButton>
            <ColorButton>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "27px",
                  textTransform: "none",
                }}
              >
                Antr??ge
              </Typography>
            </ColorButton>
            <ColorButton>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "27px",
                  textTransform: "none",
                }}
              >
                ??ber uns
              </Typography>
            </ColorButton>
          </Stack>
          <Stack direction="row" spacing={2}>
            
            <Button color="inherit" sx={{ width: "50px" }}>
              <SignLanguageIcon fontSize="large"/>
            </Button>
            <Button onClick={openMenu} sx={{ width: "50px" }} color="inherit">
              <LanguageIcon fontSize="large" />
            </Button>
            <Menu
              id="lame-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}> Deutsch</MenuItem>
              <MenuItem onClick={handleClose}> English</MenuItem>
              <MenuItem onClick={handleClose}> ????????????????????</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarInDialogue;

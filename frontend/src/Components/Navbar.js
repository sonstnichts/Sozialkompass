import React from "react"; 

import { AppBar, Toolbar, Typography, Button, Stack, styled, Menu, MenuItem } from "@mui/material"
import logo from "../Assets/logo/logo185x185 Kopie.png"
import LanguageIcon from '@mui/icons-material/Language'; 
import EasyLanguage from "../Assets/logo/Icon-Easy-Language (1) (1).png"; 


// Settings for size of Logo (Compass picture)
const Logo = styled('img')(() => ({
    width: '1rem',
    minWidth: '2rem',
})); 

// Settings for size of image "Easy Language"
const EL = styled('img')(() => ({
    width: '1rem',
    minWidth: '1.5rem',
    color: 'black',
})); 


export const MuiNavbar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null)

const handleClose = () => {
    setAnchorEl(null)
}

   const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
   }

   
  // AppBar is used to create navigation bar (in combination with Typography)
  // Stack is used to include additional pages or menu settings on the right side of the page
    return (
        <AppBar position='sticky' color="default"> 
            <Toolbar>
            <Logo src={logo} onClick="/home"  /> 
            <Typography variant="title" color="inherit" noWrap>
              &nbsp;
            </Typography>
            <Typography variant="title" color="inherit" noWrap>
              &nbsp;
            </Typography>
            <Typography variant='h5' component="div" spacing = {2} sx={{ flexGrow: 3}}>
              Sozialkompass
            </Typography>
            <Stack direction="row" spacing={2}></Stack>
                <Button color="inherit" variant = 'h6'> Antragsübersicht</Button>
                <Button color="inherit">
                    <EL src={EasyLanguage} />  </Button>
                <Button onClick={openMenu} color="inherit">
                    <LanguageIcon />  </Button>
                    <Menu 
                    id = "lame-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open = {Boolean(anchorEl)}
                    onClose = {handleClose} >
                        <MenuItem onClick={handleClose}> Deutsch</MenuItem>
                        <MenuItem onClick={handleClose}> English</MenuItem>
                        <MenuItem onClick={handleClose}> українська</MenuItem>
                    </Menu>
            </Toolbar>
        </AppBar>

    )
}
import { Home } from "./Components/homepage/home";
import { MuiNavbar } from "./Components/Navbar";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { Images } from "./Components/homepage/logohome"
import theme from "./Components/theme";
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import { Supporter } from "./Components/homepage/supporter";
import { Contact } from "./Components/homepage/contact";
import React from "react";
import { Question } from "./Components/question";
import { useState } from "react";



 
// Adding components into this main file 
function App() {
 

  //Addition of a applicationlist, that keeps track of the status of an application. It is passed down into the components.
  
  return (

    <div className="App">
       <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<><MuiNavbar/><Home/><Supporter/><Contact/></>}/>
          <Route path="/question" element={<><MuiNavbar/><Question/></>}/>
        </Routes>
      </ThemeProvider>
  
    </div>

  );
}

export default App;

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


export const ApplicationContext = React.createContext(0)
 
// Adding components into this main file 
function App() {
  const [applications,setApplications] = useState({
    Kindergeld:1,
    Bab:0,
    Bafög:-1
  })

  //Addition of a applicationlist, that keeps track of the status of an application. It is passed down into the components.
  
  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <ApplicationContext.Provider value={{applications, setApplications}}>
        <Routes>
          <Route path="/" element={<><MuiNavbar/><Home/><Supporter/><Contact/></>}/>
          <Route path="/questions" element={<><MuiNavbar/><Question/></>}/>
          {/* <Route path="/results" element={<><MuiNavbar/><Results applicationstatus={applications}/></>}/> */}
        </Routes>
        </ApplicationContext.Provider>
      </ThemeProvider>
    </div>

  );
}

export default App;

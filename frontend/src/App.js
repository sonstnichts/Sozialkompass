import Home from "./Components/home"; 
import Question from "./Components/question"
import { MuiNavbar } from "./Components/Navbar";
import { CssBaseline } from '@mui/material'; 
import {ThemeProvider} from "@mui/material/styles";
import { Images } from "./Components/logohome"
import theme from "./Components/theme"; 
import { Router, Routes, Route, Navigate} from "react-router-dom";


// Adding components into this main file 
function App() {
  return (

    <div className="App">
        <ThemeProvider theme={theme}>
        <CssBaseline/>
      </ThemeProvider>

<MuiNavbar /> 
<Home /> 

</div> 

   
  );
}

export default App;

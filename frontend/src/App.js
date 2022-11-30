import Home from "./Components/homepage/home"; 
import Question from "./Components/question"
import { MuiNavbar } from "./Components/Navbar";
import { CssBaseline } from '@mui/material'; 
import {ThemeProvider} from "@mui/material/styles";
import { Images } from "./Components/homepage/logohome"
import theme from "./Components/theme"; 
import { Router, Routes, Route, Navigate} from "react-router-dom";
import { Supporter } from "./Components/homepage/supporter";
import {Contact} from "./Components/homepage/contact";

// Adding components into this main file 
function App() {
  return (

    <div className="App">
        <ThemeProvider theme={theme}>
        <CssBaseline/>
      

<MuiNavbar /> 
<Home /> 
<Supporter />
<Contact/>
</ThemeProvider>


</div> 

   
  );
}

export default App;

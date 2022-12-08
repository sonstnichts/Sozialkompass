import { Home } from "./Components/homepage/home";
import { MuiNavbar } from "./Components/Navbar";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { Images } from "./Components/homepage/logohome"
import theme from "./Components/theme";
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import { Supporter } from "./Components/homepage/supporter";
import { Contact } from "./Components/homepage/contact";
import { Question } from "./Components/question";
import { Results } from "./Components/results/results"


// Adding components into this main file 
function App() {
  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<><MuiNavbar/><Home/><Supporter/><Contact/></>}/>
          <Route path="/questions" element={<><MuiNavbar/><Question/></>}/>
          <Route path="/results" element={<><MuiNavbar/><Results/></>}/>
        </Routes>
      </ThemeProvider>
    </div>


  );
}

export default App;

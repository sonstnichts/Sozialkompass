import { Home } from "./Components/homepage/home";
import Navbar  from "./Components/Navbar";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { Images } from "./Components/homepage/logohome"
import theme from "./Components/theme";
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import { Supporter } from "./Components/homepage/supporter";
import { Contact } from "./Components/homepage/contact";
import store from "./redux/store";
import { Results } from "./Components/results/results"
import {useState} from 'react'
import Question  from "./Components/question";
import { Provider } from 'react-redux'



 
// Adding components into this main file 
function App() {


  //Addition of a applicationlist, that keeps track of the status of an application. It is passed down into the components.
  const [add,setAdd] = useState({
    Kindergeld:1,
    BAB:0,
    BAfoeG:-1,
    Wohngeld:1,
    ALG2:0
  })

  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>

          <Route path="/" element={<><Navbar/><Home/><Supporter/><Contact/></>}/>
          <Route path="/questions" element={<><Navbar/><Question/></>}/>
          <Route path="/results" element={<><Navbar/><Results applicationstatus={add}/></>}/>

        </Routes>
      </ThemeProvider>
  
    </div>

  );
}

export default App;

import { Link, Route, Routes } from 'react-router-dom'
import './App.css';
import Results from './Components/results'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/navbar'; 
import Mainbody from './Components/main-body';
import MainbodyUKR from './Components/mainbodyUKR';
import Footers from './Components/fußzeile'; 
import Impressum from './Components/impressum';
import Wohngeld from './Components/Wohngeld'; 
import WohngeldUKR from './Components/WohngeldUKR'; 
import Home from './Components/home';
import HomeUKR from './Components/homeUKR';
import NavBarUKR from './Components/navbarUKR';



function App() {


  return (

    <>
      
      <Routes>
        <Route path ="/" element = {<><NavBar /><Home /></>} />
        <Route path ="/main-body" element = {<><NavBar /><Mainbody /></>} /> 
        <Route path ="/mainbodyUKR" element = {<><NavBar /><MainbodyUKR /></>} /> 
        <Route path ="/results" element = {<><NavBar /><Results/></>} />
        <Route path ="/impressum" element = {<><NavBar /><Impressum /></>} />
        <Route path ="/wohngeld" element = {<><NavBar /><Wohngeld /></>} />
        <Route path ="/wohngeldUKR" element = {<><NavBar /><WohngeldUKR /></>} />
        <Route path ="/ukr" element = {<><NavBarUKR/><WohngeldUKR/></>} /> 
        <Route path ="/homeukr" element = {<><NavBarUKR/><HomeUKR/></>} /> 
      </Routes>
    <Footers /> 
    </>

  );
}

export default App;

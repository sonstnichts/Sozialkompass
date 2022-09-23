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


function App() {


  return (
    <>
    <NavBar />
      <ul>
        <li>
          <Link to="/main-body">Mainbody</Link>
        </li>
        <li>
          <Link to="/mainbodyUKR">MainbodyUKR</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
        <li>
          <Link to="/impressum">Impressum</Link>
        </li>
        <li>
          <Link to="/wohngeld">Wohngeld</Link>
        </li>
      </ul>
      <Routes>
        <Route path ="/main-body" element = {<Mainbody />} /> 
        <Route path ="/mainbodyUKR" element = {<MainbodyUKR />} /> 
        <Route path ="/results" element = {<Results/>} />
        <Route path ="/impressum" element = {<Impressum />} />
        <Route path ="/wohngeld" element = {<Wohngeld />} />
      </Routes>
    <Footers /> 
    </>
  );
}

export default App;
import React from "react";
import logosmall from "../assets/logo/logo185x185.png";
import logobig from "../assets/logo/logo844x845.png";
import logomedium from "../assets/logo/logo354x354.png"


function Home() {
  return (
    <>
    <img
      srcset={`${logosmall} 185w,${logomedium} 354w, ${logobig} 845w`}
      sizes="(max-width: 600px) 186px,(max-width: 1500px) 354px, 600px"
      src={logobig}
      
      class="float-start"
      alt="Logo startseite"
    />
    <h1>Sozial</h1>
    <hr />
    <h1>Kompass</h1>
    </>
  );
}

export default Home;

import "./results.css"
import React from "react";
import Resultentry from "./resultentry";
import { useNavigate } from "react-router-dom";
function Results() {
  const results = require("../results.json");
  const navigate = useNavigate();


  return (
    <div className="row">
      <div className="results">
        {results.map((result) => (
          <Resultentry
            
            description={result.description}
            link={result.link}
            linkname={result.linkname}
            adresse={result.adresse}
            key={result.id}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Results;

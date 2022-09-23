import React from "react";
import Resultentry from "./resultentry";

function Results() {
  const results = require("../results.json");

  return (
    <div className="row">
      <div className="results">
        {results.map((result) => (
          <Resultentry
            title={result.title}
            description={result.description}
            link={result.link}
            linkname={result.linkname}
            key={result.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;

import React, { useState } from "react";

function Resultentry(props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    
      <div className="entry">
        <div className="overview">
          <div className="entrytitle">{props.title}</div>
          <button className="inform" onClick={toggle}>
            Jetzt informieren!
          </button>
        
        </div>
        {open && (
          <div className="content">
            <div className="entrydescription">{props.description}</div>
            <div className="entrylinks">
              <a href={props.link}>
                {props.linkname}
              </a>
            </div>
          </div>
        )}
      </div>
    
  );
}

export default Resultentry;

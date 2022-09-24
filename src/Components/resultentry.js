import "./resultentry.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Resultentry(props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  return (
    <div className="entry">
      <div className="overview accordion">
          <h3 className="accordion-header title">{props.description}</h3>
          <button className="inform accordion-button" aria-expanded="true" onClick={toggle}>
            Jetzt informieren!
          </button>
        {open && (
          <div className="content accordion-item">
            <Row>
              <Col>
                <p>Zuständige Stelle</p>
                <div className="adress">{props.adresse}</div>
              </Col>
            </Row>
            <div className="entrylinks">
              <div className="btn-group-vertical" role="group">
                <button
                  className="btn btn-primary"
                  href="https://google.de/maps"
                >
                  Karte
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(props.link)}
                >
                  {props.linkname}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="btn-group-vertical" role="group">
        <button
          className="btn btn-primary weitere"
          onClick={() => navigate("/wohngeld")}
        >
          Weitere Informationen
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Neue Anspruchsprüfung
        </button>
      </div>
    </div>
  );
}

export default Resultentry;

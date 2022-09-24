import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Footers() {
  const navigate = useNavigate();
  return (
   

    <MDBFooter
      className="text-center text-white fixed-bottom"

      bgColor="light"
    >
      <MDBContainer className="pt-4">
        <section className="mb-4">
          <Button variant="outline-secondary">Stadt Münster</Button>{" "}
          <Button variant="outline-secondary">Über</Button>{" "}
          <Button variant="outline-secondary">Datenschutz</Button>{" "}
          <Button variant="outline-secondary" 
          onClick={
              () => navigate("/impressum")}>Impressum</Button>

          
        </section>
      </MDBContainer>

      <div
        className="text-center text-dark p-3"
        bgColor="light"
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="https://www.prof-becker.de">
          sozialkompass.de
        </a>
      </div>
    </MDBFooter>
    //
  );
}

export default Footers;

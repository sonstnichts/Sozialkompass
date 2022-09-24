import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logobig from "../assets/logo/logo844x845.png";
import "./home.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeUKR() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid h-75 d-flex align-items-center justify-content-center">
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row>
            <Col xs={4} className="align-self-center">
              <img
                class="logoImage"
                src={logobig}
                alt="Logo Sozialkompass"
                width="845"
                height="845"
              ></img>
            </Col>
            <Col xs={8} lassName="logoContainer">
              <Container>
                <h1 className="logoFont sozialFont">соціальний</h1>
                <hr className="border border-dark border-2 opacity-100" />
                <h1 className="align-top logoFont kompassFont">компас</h1>
              </Container>
            </Col>
          </Row>
        </Col>
        <Col xs={3}></Col>
        <Row className="startButton">
          <Col></Col>
          <Col className="text-center">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                class="btn btn-secondary btn-lg"
                type="button"
                onClick={() => navigate("/mainbodyUKR")}
              >
                розпочати зараз
              </button>{" "}
            </div>
          </Col>

          <Col></Col>
        </Row>
      </Row>
    </div>
  );
}

export default HomeUKR;

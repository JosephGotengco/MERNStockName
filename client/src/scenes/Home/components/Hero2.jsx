import React, { Component } from "react";
import {
  Row,
  Col
} from "reactstrap";
import heroImageSrc from "../images/heroImage.svg"

import { heroText, heroInfoText, heroImage } from "../styles.module.css"

class Hero extends Component {
  state = {};
  render() {
    return (
      <Row style={{ minHeight: "600px", padding: "0 5rem" }}>
        <Col xl={6} className="d-flex justify-content-center align-items-center mb-3" style={{ flexDirection: "column", textAlign: "center" }}>
          <b className={heroText}>
            Helping you invest your money,
              commission-free.
          </b>
          <p className={heroInfoText}>
            Whether it's cryptocurrencies or stocks, we are here to help.
          </p>

        </Col>
        <Col xl={6} className="d-flex justify-content-center align-items-center">
          <img src={heroImageSrc} alt="Guy with crossed arms leaning" className={heroImage} />
        </Col>
      </Row>
    );
  }
}

export default Hero;

import React, { Component } from "react";
import {
  Row,
  Col
} from "reactstrap";
import heroImageSrc from "../images/heroImage.svg"

import { heroText, heroInfoText, heroImage, waveContainer, wave, wave1 } from "../styles.module.css"

class Hero extends Component {
  state = {};
  render() {
    return (
      <Row className={waveContainer + " px-0 mx-0"}>
        <Col xl={6} className="d-flex justify-content-center align-items-center">
          <img src={heroImageSrc} alt="Guy with crossed arms leaning" className={heroImage} />
        </Col>
        <Col xl={6} className="d-flex justify-content-center align-items-center flex-column">
          <b className={heroText}>
            Helping you invest your money,
              commission-free.
          </b>
          <p className={heroInfoText}>
            Whether it's cryptocurrencies or stocks, we are here to help.
          </p>
        </Col>
        <div className={wave}></div>
        <div className={wave1}></div>
      </Row>
    );
  }
}

export default Hero;

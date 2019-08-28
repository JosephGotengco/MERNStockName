import React, { Component } from "react";

import { heroContainer, overlayTint, heroText } from "../styles.module.css";

class Hero extends Component {
  state = {};
  render() {
    return (
      <div className={heroContainer}>
        <div className={heroText}>Welcome To Stock Name</div>
        <div className={overlayTint} />
      </div>
    );
  }
}

export default Hero;

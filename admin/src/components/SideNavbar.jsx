import React, { Component } from "react";

import {
  wrapper,
  expand,
  shrink,
  sandwhichWrapper,
  iconWrapper,
  link,
  linkText
} from "./sideNavbar.module.css";

import Dehaze from "@material-ui/icons/Dehaze";
import Dashboard from "@material-ui/icons/Dashboard";

class SideNavbar extends Component {
  state = {
    sidenav: false,
    hidden: false
  };

  toggle = () => {
    if (this.state.hidden) {
      this.setState({
        sidenav: false,
        hidden: false
      });
    } else {
      this.setState({
        sidenav: !this.state.sidenav,
        hidden: !this.state.hidden
      });
    }
  };

  handleMouseEnter = () => {
    if (this.state.hidden) {
      this.setState({
        sidenav: false
      });
    }
  };

  handleMouseLeave = () => {
    if (this.state.hidden && !this.state.sidenav) {
      this.setState({
        sidenav: true
      });
    }
  };

  render() {
    const { sidenav } = this.state;
    return (
      <div
        className={sidenav ? shrink + " " + wrapper : expand + " " + wrapper}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={link}>
          <div className={sandwhichWrapper + " d-inline"} onClick={this.toggle}>
            <Dehaze style={{ fontSize: "24px" }} />
          </div>
        </div>
        <div>
          <a className={link} href="/">
            <div className={iconWrapper}>
              <Dashboard className="d-inline" />
            </div>
            <div className={linkText}>Dashboard</div>
          </a>
        </div>
      </div>
    );
  }
}

export default SideNavbar;

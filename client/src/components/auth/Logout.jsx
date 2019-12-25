import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

import { link } from "../../css/navbar.module.css";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <React.Fragment>
        <NavLink onClick={this.props.logout} href="#" className={link}>
          Logout
        </NavLink>

      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);

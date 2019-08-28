import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadUser } from "../../actions/authActions";

class Error404 extends Component {
  state = {};
  static propTypes = {
    loadUser: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Error404?</h1>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { loadUser }
)(Error404);

import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";

class Admin extends Component {
  state = {};

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return <div>Admin Dashboard</div>;
  }
}

export default connect(
  null,
  { loadUser }
)(Admin);

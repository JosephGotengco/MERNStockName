import React, { Component } from "react";
import Overview from "./components/Overview";
import GraphControls from "./components/GraphControls";
import LineGraph from "./components/LineGraph";
import Trade from "./components/Trade";
import Sell from "./components/Sell";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/authActions";


class TradePage extends Component {
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
        <Container fluid style={{ backgroundColor: "#303952", minHeight: "100vh", padding: "10px 20px" }}>
          <Row>
            <Col xl="7" className="p-3">
              <div style={{ backgroundColor: "#273C75", padding: "30px", height: "100%" }}>
                <Overview />
                <GraphControls />
                <LineGraph />
              </div>
            </Col>
            <Col xl="5" className="p-3 m-0">
              <div style={{ backgroundColor: "#273C75", paddingBottom: "1rem" }}>
                <Trade />
              </div>
              <div style={{ backgroundColor: "#273C75", marginTop: "2rem", paddingBottom: "1rem"}}>
                <Sell />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { loadUser }
)(TradePage);

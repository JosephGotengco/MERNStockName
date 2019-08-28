import React, { Component } from "react";

import ExpandMore from "@material-ui/icons/ExpandMore";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeGraphType,
  changeGraphPeriod,
  getGraphData
} from "../../../actions/tradingActions";

import { Container, Row, Col } from "reactstrap";

import {
  tradeField,
  noAppearance,
  rightIcon,
  tradeFieldWrapper
} from "../styles.module.css";

class GraphControls extends Component {
  timeOptions = ["1m", "3m", "6m", "1y", "2y", "5y", "max"];
  graphTypeOptions = [
    { type: "Line Chart", val: "line" },
    { type: "Bar Chart", val: "bar" }
    // {type: 'Point and Figure Chart', val: 'pF'},
    // {type: 'Candlestick Chart', val: 'Cs'},
    // {type: 'OHLC Chart', val: 'ohlc'}
  ];

  state = {};

  static propTypes = {
    ticker: PropTypes.string,
    getGraphData: PropTypes.func.isRequired,
    graphPeriod: PropTypes.string.isRequired,
    changeGraphPeriod: PropTypes.func.isRequired,
    graphType: PropTypes.string.isRequired,
    changeGraphType: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { graphPeriod, ticker } = this.props;
    if (graphPeriod !== prevProps.graphPeriod && ticker === prevProps.ticker) {
      this.props.getGraphData(ticker, graphPeriod);
    }
  }

  handleGraphType = e => {
    if (e.target.value) {
      this.props.changeGraphType(e.target.value);
    }
  };

  handleGraphPeriod = e => {
    if (e.target.value) {
      this.props.changeGraphPeriod(e.target.value);
    }
  };

  render() {
    return (
      <Container fluid>
        <Row className="d-flex justify-content-end">
          <Col xl="2" className="p-0 mx-3 d-flex justify-content-center align-items-center"  style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <div
              className={
                noAppearance +
                " " +
                tradeFieldWrapper +
                " position-relative d-inline mx-3 tradeFieldWrapper"
              }
            >
              <select
                className={tradeField}
                id="orderType"
                name="orderType"
                onChange={this.handleGraphPeriod}
                required
              >
                <option key="" value="" disabled hidden />
                {this.timeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label className="position-absolute" htmlFor="orderType">
                Order Type
              </label>
              <ExpandMore className={rightIcon + " position-absolute"} />
            </div>
          </Col>
          <Col xl="2" className="p-0 mx-3 d-flex justify-content-center align-items-center"  style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <div
              className={
                noAppearance +
                " " +
                tradeFieldWrapper +
                " position-relative d-inline mx-3 tradeFieldWrapper"
              }
            >
              <select
                className={tradeField}
                id="orderType"
                name="orderType"
                onChange={this.handleGraphType}
                required
              >
                {this.graphTypeOptions.map(option => (
                  <option key={option.val} value={option.val}>
                    {option.type}
                  </option>
                ))}
              </select>
              <label className="position-absolute" htmlFor="orderType">
                Order Type
              </label>
              <ExpandMore className={rightIcon + " position-absolute"} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  ticker: state.trading.ticker,
  graphPeriod: state.trading.graphPeriod,
  graphType: state.trading.graphType
});

export default connect(
  mapStateToProps,
  { changeGraphType, changeGraphPeriod, getGraphData }
)(GraphControls);

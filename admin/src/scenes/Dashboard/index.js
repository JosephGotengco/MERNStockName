import React, { Component } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";

import {
  wrapper,
  headerWrapper,
  redBG,
  greenBG,
  blueBG,
  graphContainer,
  card,
  scrollingWrapper
} from "./styles.module.css";

import { Container, Row, Col } from "reactstrap";

import OverviewCard from "./components/OverviewCard";
import LineGraph from "./components/LineGraph";

class Dashboard extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className={wrapper}>
        <Container fluid>
          <Row>
            <Col lg="12" className="px-0">
              <div className={headerWrapper}>
                DASHBOARD
                <DashboardIcon />
              </div>
            </Col>
          </Row>
          <Row className="p-3">
            <Col lg="12">
              <div className={scrollingWrapper}>
                <OverviewCard title="Total Users" data="4" className={card} />
                <OverviewCard title="Total Users" data="4" className={card} />
                <OverviewCard title="Total Users" data="4" className={card} />
                <OverviewCard title="Total Users" data="4" className={card} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl="8">
              <div className={graphContainer}>
                <LineGraph />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;

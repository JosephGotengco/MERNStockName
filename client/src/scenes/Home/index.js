import React, { Component } from "react";
import AppNavbar from "./../../components/AppNavbar";

import Hero from "./components/Hero2";

import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";
import FastIcon from "@material-ui/icons/CloudUploadOutlined";
import FlexibleIcon from "@material-ui/icons/DevicesOtherOutlined";
import SupportIcon from "@material-ui/icons/HeadsetMicOutlined";

// testimony images
import tImg1 from "./images/44.jpg";
import tImg2 from "./images/43.jpg";

// social media svgs
import { ReactComponent as TwitterSvg } from './images/twitter.svg'
import { ReactComponent as FacebookSvg } from './images/facebook.svg'

import {
  keyFeaturesTitle,
  testimonialTitle,
  overviewText,
  overviewTitle,
  cardTitle,
  cardBodyText,
  overviewExtraLines,
  overviewExtraLines1,
  overviewExtraLines2,
  overviewExtraLines3,
  testimony,
  testimonyName,
  activeOption,
  testimonyOption,
  testimonyImg,
  footer
} from "./styles.module.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <AppNavbar currentLink={window.location.pathname} />
        <Container fluid style={{ padding: "10px 20px" }}>
          <Hero />
          <Row style={{ marginTop: "30px" }}>
            <Col xl={{ size: 12 }} className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
              <h2 className={overviewTitle}>
                About Stock Name
                <div className={overviewExtraLines} />
                <div className={overviewExtraLines1} />
              </h2>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col xl={{ size: 12 }} className="d-flex justify-content-center">
              <div className={overviewText}>
                <div>
                  Stock Name is a stock trading platform for entrepneurs, stock
                  market enthusiasts! <br />
                  It's a free and easy way to invest your money into the stock
                  market.
                </div>
                <p className="text-danger font-weight-bold">
                  (Warning: This is a paper trading stock trading web
                  <br />
                  application developed as a personal project and
                  <br />
                  by no means accepts or use real money in anyway.)
                </p>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col xl={{ size: 12 }} className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
              <h2 className={keyFeaturesTitle}>
                Key Features
                <div className={overviewExtraLines2} />
                <div className={overviewExtraLines3} />
              </h2>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center position-relative"
            style={{ marginTop: "30px" }}
          >
            {/* <div className={backgroundBox}></div> */}
            <Col xl={{ size: 3 }}>
              <Card
                className="shadow rounded"
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  textAlign: "center"
                }}
              >
                <FastIcon
                  style={{
                    fontSize: "48px",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "20px"
                  }}
                />
                <h3 className={cardTitle}>Fast</h3>
                <p className={cardBodyText}>
                  In addition to our modern hardware, we use load balancers to
                  distribute traffic among our servers so you can always get the
                  lighting fast speeds from our product.
                </p>
              </Card>
            </Col>
            <Col xl={{ size: 3 }}>
              <Card
                className="shadow rounded"
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  textAlign: "center"
                }}
              >
                <FlexibleIcon
                  style={{
                    fontSize: "48px",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "20px"
                  }}
                />
                <h3 className={cardTitle}>Flexible</h3>
                <p className={cardBodyText}>
                  Our responsive web design means you can take Stock Name
                  wherever you go! Or you can download the Stock Name app on the
                  play store or ios store.
                </p>
              </Card>
            </Col>
            <Col xl={{ size: 3 }}>
              <Card
                className="shadow rounded"
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  textAlign: "center"
                }}
              >
                <SupportIcon
                  style={{
                    fontSize: "48px",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "20px"
                  }}
                />
                <h3 className={cardTitle}>24/7 Support</h3>
                <p className={cardBodyText}>
                  We have support agents ready to help when you need them! Our
                  agents are also fellow users of Stock Name so asking them is
                  just like asking your friend.
                </p>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col xl={{ size: 12 }} className="d-flex justify-content-center" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <h2 className={testimonialTitle}>Testimonials</h2>
            </Col>
          </Row>
          <Row className="d-flex">
            <div className="mx-auto">
              <TabContent
                activeTab={this.state.activeTab}
                className="d-flex justify-content-center flex-column text-center"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col xl="12" style={{ padding: "1rem" }}>
                      <div className={testimony}>
                        Stock Name was the best choice I have made in a long
                        time.
                        <br />
                        It's intuitive design and easy to use and quick trading
                        platform allowed me to make decisions
                        <br />
                        on where to invest my money compared to other platforms
                        I've used in the past.
                        <br />I would never go back.
                      </div>
                      <div className="d-flex justify-content-center w-100">
                        <img
                          src={tImg1}
                          alt="Sarah Mitchel"
                          className={testimonyImg}
                        ></img>
                      </div>
                      <div className={testimonyName}>Sarah Mitchel</div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col xl="12" style={{ padding: "1rem" }}>
                      <div className={testimony}>
                        When I investing in stocks, I have fun doing it.
                        <br />
                        Stock Name's aesthetics really are amazing and I really
                        appreciate the effort that was put into it.
                        <br />
                        It's not often you find a financial website with this
                        level of design, UI, and UX.
                        <br />
                        I can even describe it in three words - I love it!
                      </div>
                      <div className="d-flex justify-content-center w-100">
                        <img
                          src={tImg2}
                          alt="Danny Dovito"
                          className={testimonyImg}
                        ></img>
                      </div>
                      <div className={testimonyName}>Danny Dovito</div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
              <Nav className="justify-content-center">
                <div
                  className={
                    this.state.activeTab === "1"
                      ? testimonyOption + " " + activeOption
                      : testimonyOption
                  }
                  onClick={() => {
                    this.toggle("1");
                  }}
                />
                <div
                  className={
                    this.state.activeTab === "2"
                      ? testimonyOption + " " + activeOption
                      : testimonyOption
                  }
                  onClick={() => {
                    this.toggle("2");
                  }}
                />
              </Nav>
            </div>
          </Row>
        </Container>
        <Row
          className={footer + " d-flex justify-content-center mt-5 mx-0 p-0"}
        >
          <Col xl="3" className="d-flex justify-content-center align-items-center text-center my-2">
            3700 Willingdon Avenue
            <br></br>
            Burnaby
            <br></br>
            V5G 4J3
          </Col>
          <Col
            xl="3"
            className="d-flex justify-content-center text-center align-items-center my-2"
          >
            <TwitterSvg className="mx-3" />
            <FacebookSvg className="mx-3" />
          </Col>
          <Col xl="3" className="d-flex justify-content-center align-items-center text-center my-2">
            contact@stockname.com
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Home;

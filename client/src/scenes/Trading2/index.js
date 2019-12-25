import React, { Component } from "react";
import AppSidebar from "./../../components/AppSidebar";
import MobileMenu from "../../components/MobileMenu";
import Searchbar from "./components/Searchbar";
import Header from "../../components/Header";
import LineGraph from "./components/LineGraph";
import GraphTypeControl from "./components/GraphTypeControl";
import GraphPeriodControl from "./components/GraphPeriodControl";
import StocksTable from "./components/StocksTable";
import Watchlist from "./components/Watchlist";
import TradeForm from "./components/Trade";
import { Redirect } from 'react-router-dom'
import { loadUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Container,
    Row,
    Col
} from "reactstrap";
import {
    container,
    pageContent,
    graphSection,
    tableSection,
    tradeSection
} from "./trading.module.css";



class Trading extends Component {
    state = {
        sidebar: false
    };

    componentDidMount() {
        this.props.loadUser();
    }


    static propTypes = {
        close: PropTypes.number
    };

    toggleSidebar = () => {
        this.setState({
            sidebar: !this.state.sidebar
        });
    };

    onSidebarOnHover = () => {
        this.setState({ sidebar: !this.state.sidebar });
    };

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/trading" />)
        }
        return (
            <div className="d-flex justify-content-center">
                <MobileMenu />

                <AppSidebar />

                <Container fluid className={container}>
                    <Header />
                    <Row>
                        <Col xl={10} className={pageContent} style={{ backgroundColor: "#E9E6FF" }}>
                            <Row>
                                <Col xl={12}>
                                    <div style={{ marginTop: 10, backgroundColor: "#FDFDFD", display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, borderRadius: '5px' }}>
                                        <Searchbar className="justify-content-center" />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={9} style={{ marginTop: 15 }}>
                                    <div className={graphSection}>
                                        <Row>
                                            <Col xs={12} md={5} lg={4} xl={3}>
                                                <GraphTypeControl />
                                            </Col>
                                            <Col xs={12} md={5} lg={4} xl={3}>
                                                <GraphPeriodControl />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <LineGraph />
                                        </Row>
                                    </div>
                                </Col>
                                <Col xl={3} style={{ marginTop: 15 }}>
                                    <div className={tradeSection}>
                                        <TradeForm />
                                    </div>

                                </Col>
                            </Row>
                            <Row style={{ marginTop: 15 }}>
                                <Col xl={12}>
                                    <div className={tableSection}>
                                        <StocksTable />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    close: state.trading.close,
    // isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { loadUser }
)(Trading);

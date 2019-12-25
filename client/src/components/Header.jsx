import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import "./header.css";
import MenuButton from "./MenuButton";

class Header extends Component {
    state = {}
    render() {
        return (
            <Row style={{ zIndex: 2 }}>
                <Col xl={12} className="wrapper">
                    <MenuButton />
                    <div className="pageTitle">Trade</div>
                </Col>
            </Row>
        );
    }
}

export default Header;
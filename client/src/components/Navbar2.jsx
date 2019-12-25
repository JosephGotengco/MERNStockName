import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';

import { title, titleHighlight, navWrapper } from '../css/navbar.module.css';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    state = {
        isOpen: false
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {


        return (
            <Navbar className={navWrapper} light expand="md">
                <a href="/" className={title}>
                    <div className={titleHighlight}>STOCK</div>
                    NAME
                    </a>
                <NavbarToggler onClick={this.toggle}>
                </NavbarToggler>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className='mr-5'>
                            <RegisterModal />
                        </NavItem>
                        <NavItem className='mr-5'>
                            <LoginModal />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(AppNavbar);
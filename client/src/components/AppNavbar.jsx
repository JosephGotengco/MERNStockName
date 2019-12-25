import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

import { title, bgPurple } from '../css/navbar.module.css';

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

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <React.Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/dashboard" style={(this.props.currentLink === "/dashboard") ? {color: 'black'} : null}>
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/trading" style={(this.props.currentLink === "/trading") ? {color: 'black'} : null}>
                        Trading
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </React.Fragment>
        );

        const guestLinks = (
            <React.Fragment>
                <NavItem className='mr-5'>
                    <RegisterModal />
                </NavItem>
                <NavItem className='mr-5'>
                    <LoginModal />
                </NavItem>
            </React.Fragment>
        )

        return (
            <Navbar className={bgPurple} light expand="md">
                    <a href="/" className={title}>
                        STOCK NAME
                    </a>
                    <NavbarToggler onClick={this.toggle}>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto mr-5" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
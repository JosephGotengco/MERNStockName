import React, { Component } from 'react';
import Trade from "@material-ui/icons/Repeat";
import { connect } from 'react-redux';
import { logout } from "./../actions/authActions";
import logo from "./images/logo.png";
import {
    Col
} from 'reactstrap';
import {
    sidebarWrapper,
    sidenavLink,
    sidenavLinkWrapper,
    linkIcon,
    linkText,
    title
} from "./AppSidebar.module.css";
class AppSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    render() {
        let { toggled } = this.props;
        let { width } = this.state;
        let maxWidth = toggled ? '12em' : '5em';
        maxWidth = width < 1200 ? '0em' : maxWidth;
        let display = width < 1200 ? 'none' : 'block';
        let logoDisplay = toggled ? 'none' : 'block';

        return (
            <Col xl={2} className={sidebarWrapper} style={{ maxWidth, minWidth: maxWidth, display }}>
                <div className={sidenavLinkWrapper}>
                    <a href="/trading" className={sidenavLink}>
                        <img src={logo} alt="Logo" style={{width: '2em', display: logoDisplay}} />
                        <div className={title}>Stock Name</div>
                    </a>
                </div>
                <div className={sidenavLinkWrapper}>
                    <a href="/trading" className={sidenavLink}>
                        <Trade className={linkIcon} style={{fontSize: "28px"}} />
                        <div className={linkText}>Trade</div>
                    </a>
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => ({
    toggled: state.sidebar.toggled
});

export default connect(mapStateToProps, { logout })(AppSidebar)
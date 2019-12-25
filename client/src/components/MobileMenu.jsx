import React, { Component } from 'react';
import './MobileMenu.css';
import { connect } from "react-redux";
import { toggleSidebar } from "../actions/sidebarActions";
import Close from "@material-ui/icons/Close";

class MobileMenu extends Component {
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
        let { width } = this.state;
        let { toggled } = this.props;
        let display = width > 1200 ? 'none' : 'inline-block';
        let right = toggled ? '0%' : '150%';
        return (
            <div className="mobile-menu-wrapper" style={{ display, width: '100%', height: '100%', right }}>
                <div className="headerRow">
                    <div className="companyName">STOCK NAME</div>
                    <Close onClick={this.props.toggleSidebar} style={{ fontSize: '36px' }}
                        className="closeButton"
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    toggled: state.sidebar.toggled
});
export default connect(
    mapStateToProps,
    { toggleSidebar }
)(MobileMenu);
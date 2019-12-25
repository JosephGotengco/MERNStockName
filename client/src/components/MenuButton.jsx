import React, { Component } from 'react';
import Menu from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { toggleSidebar } from "../actions/sidebarActions";

class MenuButton extends Component {
    state = {}
    render() {
        return (
            <Menu onClick={this.props.toggleSidebar} style={{ cursor: 'pointer', fontSize: '36px' }} />
        );
    }
}

export default connect(
    null,
    { toggleSidebar }
)(MenuButton);
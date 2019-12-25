import React, { Component } from "react";
import Navbar from "./../../components/Navbar2";
import { heroTitle, subText, pageWrapper, signUpWrapper, bgImg } from './home.module.css';
import lightBulb from "./07.png";
import { connect } from 'react-redux';

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

 

    render() {

        return (
            <div className={pageWrapper}>
                <Navbar currentLink={window.location.pathname} />
                <div className={heroTitle}>
                    The Stock Market, <br /> Simplified.
                </div>
                <div className={subText}>
                    Our team is dedicated to helping you invest your
                    money in the Stock Market by providing the tools
                    necessary to do so.
                </div>
                <div className={signUpWrapper}>
                    Sign Up Now
                </div>
                <img src={lightBulb} alt="lightBulb" className={bgImg} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Home);

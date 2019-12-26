import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    NavLink,
    Alert,
    Col,
    Row,
    Container,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { ReactComponent as RegisterImage } from './RegisterImage.svg';
import { ReactComponent as LoginBG } from './LoginBG.svg';

import { link } from '../../css/navbar.module.css';
import {
    companyName, loginImageCol, closeButtonWrapper, loginImage, loginImageWrapper,
    loginTitle, inputLabel, registerInputWrapper, companyNameWrapper,
    registerInput, logInButtonWrapper, logInButton, logInButtonContainer, loginBG, errMsg, errMsgHidden,
    // signUpText, signUpLink,
} from './LoginModal.module.css';
import Close from "@material-ui/icons/Close";


class RegisterModal extends Component {
    state = {
        modal: false,
        username: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            console.log(error)
            // Check for login error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                let { username, password } = this.state;
                this.toggle();
                this.props.login({ username, password });
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password } = this.state;
        const user = {
            username,
            email,
            password
        }
        this.props.register(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#" className={link}>
                    Sign Up
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="modal-xl"
                >
                    <ModalBody className="p-0">
                        <Container fluid={true} className="p-0">
                            <Row noGutters={true}>
                                <Col xs={6} className={loginImageCol}>
                                    <LoginBG className={loginBG} />
                                    <div className={companyNameWrapper}>
                                        <div className={companyName}>
                                            STOCK NAME
                                        </div>
                                    </div>
                                    <div className={loginImageWrapper}>
                                        <RegisterImage className={loginImage} />
                                    </div>
                                </Col>
                                <Col xs={12} xl={6}>
                                    <div className={closeButtonWrapper}>
                                        <Close onClick={this.toggle} style={{ fontSize: 36 }} />
                                    </div>
                                    <div className={loginTitle}>Sign up for an account</div>
                                    {/* <div className={signUpText}>Already have an account?<div className={signUpLink}>Log In</div></div> */}
                                    <form>
                                        <div className={registerInputWrapper}>
                                            <div className={inputLabel}>USERNAME</div>
                                            <input className={registerInput} placeholder={"Enter your username"}
                                                name={"username"} type={"username"} onChange={this.onChange} />
                                        </div>
                                        <div className={registerInputWrapper}>
                                            <div className={inputLabel}>EMAIL ADDRESS</div>
                                            <input className={registerInput} placeholder={"Enter your email"}
                                                name={"email"} type={"email"} onChange={this.onChange} />
                                        </div>
                                        <div className={registerInputWrapper}>
                                            <div className={inputLabel}>PASSWORD</div>
                                            <input className={registerInput} placeholder={"Enter your password  "}
                                                name={"password"} type={"password"} onChange={this.onChange}
                                                autoComplete="off" />
                                        </div>
                                        <div className={registerInputWrapper}>
                                            <div className={inputLabel}>CONFIRM PASSWORD</div>
                                            <input className={registerInput} placeholder={"Enter your password again "}
                                                name={"confirmPassword"} type={"confirmPassword"} onChange={this.onChange}
                                                autoComplete="off" />
                                        </div>
                                    </form>
                                    {this.state.msg ? <Alert color="danger" className={errMsg}>{this.state.msg}</Alert> : <Alert color="danger" className={errMsgHidden}>Nothing Here!</Alert>}
                                    <div className={logInButtonContainer}>
                                        <div className={logInButtonWrapper} onClick={this.onSubmit}>
                                            <div className={logInButton}>
                                                Sign Up
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors, login })(RegisterModal);
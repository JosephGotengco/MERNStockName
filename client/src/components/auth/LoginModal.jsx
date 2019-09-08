import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    Col,
    Row
} from 'reactstrap';
import Close from "@material-ui/icons/CloseRounded";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { link } from '../../css/navbar.module.css';
import { wrapper, loginImage } from "./LoginModal.module.css";


class LoginModal extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
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

        const { username, password } = this.state;

        const user = {
            username,
            password
        }

        this.props.login(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#" className={link}>
                    Login
                </NavLink>

                <Modal
                    size="xl"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={wrapper}
                >
                    <ModalBody style={{ borderRadius: "15px", padding: "0" }}>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Row className="p-0 m-0">
                            <Col xl={6} className={loginImage}>
                                <div>Login to Stock Name</div>
                            </Col>
                            <Col xl={6} style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Close onClick={this.toggle} />
                                </div>
                            </Col>
                        </Row>
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
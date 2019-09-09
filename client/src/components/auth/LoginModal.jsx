import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    NavLink,
    Alert,
    Col,
    Row,
    Container,
} from 'reactstrap';
import loginImageSrc from "../images/loginImage.svg";
import { modalForm } from '../../css/modal-bg.module.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { link } from '../../css/navbar.module.css';
import { inputField } from '../../css/input.module.css';


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
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="modal-xl"
                >
                    <ModalBody className="p-0">
                        <Container fluid={true} className="p-0">
                            <Row noGutters={true}>
                                <Col lg="8">
                                    <img className="w-100 img-fluid" src={loginImageSrc} alt="STONKS"></img>
                                </Col>
                                <Col lg="4" className={modalForm + " px-3"}>
                                    <ModalHeader toggle={this.toggle} className={modalForm}>Login</ModalHeader>

                                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup className="p-3">
                                            <Label for="username" style={{ marginTop: '1rem' }}>Username</Label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                placeholder="AmazingUsername"
                                                onChange={this.onChange}
                                                className={inputField + " w-100"}
                                            />
                                            <Label for="password" style={{ marginTop: '1rem' }}>Password</Label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Secret Password"
                                                onChange={this.onChange}
                                                className={inputField + " w-100"}
                                            />
                                            <Button
                                                color="dark"
                                                style={{ marginTop: '2rem' }}
                                                block
                                            >Login</Button>
                                        </FormGroup>
                                    </Form>
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
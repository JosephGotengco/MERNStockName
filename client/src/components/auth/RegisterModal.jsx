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
    Container,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import welcomeImg from '../images/welcomeBG2.jpg';

import { inputField } from '../../css/input.module.css';
import { modalForm } from '../../css/modal-bg.module.css';
import { link } from '../../css/navbar.module.css'

class RegisterModal extends Component {
    state = {
        modal: false,
        username: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
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

        const { username, email, password } = this.state;

        const newUser = {
            username,
            email,
            password
        }
        this.props.register(newUser);
    }

    render() {
        return (<div>
            <NavLink onClick={this.toggle} href="#" className={link}>
                Register
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
                                <img className="w-100 img-fluid" src={welcomeImg} alt="STONKS"></img>
                            </Col>
                            <Col lg="4" className={modalForm + " px-3"}>
                                <ModalHeader toggle={this.toggle} className={modalForm}>Register</ModalHeader>

                                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup className="p-3">
                                        <Label for="username" style={{ marginTop: '1rem' }}>Username</Label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Give a username"
                                            onChange={this.onChange}
                                            className={inputField + " w-100"}
                                        />
                                        <Label for="email" style={{ marginTop: '1rem' }}>Email</Label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="Give a email"
                                            onChange={this.onChange}
                                            className={inputField + " w-100"}
                                        />
                                        <Label for="password" style={{ marginTop: '1rem' }}>Password</Label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Give a password"
                                            onChange={this.onChange}
                                            className={inputField + " w-100"}
                                        />
                                        <Button
                                            color="dark"
                                            style={{ marginTop: '2rem' }}
                                            block
                                        >Register</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>

                </ModalBody>
            </Modal>
        </div>);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);

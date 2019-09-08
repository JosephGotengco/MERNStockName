import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import "../sellmodal.css"

class SellModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.toggle}
        >
          Sell
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sell</ModalHeader>
          <ModalBody>

          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SellModal;

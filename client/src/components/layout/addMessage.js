import React, { Component } from "react";
// import { Card, Button, CardTitle, CardText, FormGroup, Label, Form, Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, Card, CardTitle, CardText, FormGroup, Label, Form, Input } from "reactstrap";

import "./addMessage.css";

class addMessage extends Component {
  state = {
    modal: false,
    keyword: "",
    message: "",
  };

  toggle() {
    let value = this.state.modal;
    this.setState({ modal: !value });
  }

  formSubmitted = (e) => {
    e.preventDefault();
    let value = this.state.modal;
    this.setState({ modal: !value });
    console.log(this.state);
  };

  valueChanged = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle.bind(this)}>Add Message</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)} style={{ background: "black" }}>
            Modal title
          </ModalHeader>
          <ModalBody style={{ background: "black" }}>
            <Card body style={{ background: "black" }}>
              <CardTitle>Welcome to ShareView</CardTitle>
              <CardText>Leave a message with your location</CardText>
              <Form onSubmit={this.formSubmitted}>
                <FormGroup>
                  <Label for="keyword">Keyword</Label>
                  <Input onChange={this.valueChanged} type="text" name="keyword" id="keyword" placeholder="Keyword"></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    onChange={this.valueChanged}
                    type="textarea"
                    name="message"
                    id="message"
                    placeholder="Enter your message"></Input>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle.bind(this)}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle.bind(this)}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default addMessage;

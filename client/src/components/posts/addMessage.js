import React, { Component } from "react";
// import { Card, Button, CardTitle, CardText, FormGroup, Label, Form, Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Form, CardBody } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost } from "../../actions/postAction";
import TextFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/isEmpty";

import "./addMessage.css";

class addMessage extends Component {
  state = {
    modal: false,
    keyword: "",
    message: "",
    latitude: 0,
    longitude: 0,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      () => {
        alert("Please allow us to know your location.");
      }
    );
  }

  toggle() {
    let value = this.state.modal;
    this.setState({ modal: !value });
  }

  formSubmitted = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      name: user.name,
      text: this.state.message,
      keyword: this.state.keyword,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    if (isEmpty(this.state.message) || isEmpty(this.state.keyword)) {
      alert("Keyword and Text Feild cannot be empty");
    }

    this.props.addPost(newPost);
    let value = this.state.modal;
    this.setState({ modal: !value });
    this.setState({ message: "", keyword: "" });
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
          <ModalBody>
            <CardBody style={{ background: "black" }}>
              <CardTitle>Welcome to ShareView</CardTitle>
              <CardText>Leave a message with your location</CardText>
              <Form onSubmit={this.formSubmitted}>
                <TextFieldGroup
                  placeholder="Keyword"
                  name="keyword"
                  type="text"
                  value={this.state.keyword}
                  onChange={this.valueChanged}
                />
                <TextFieldGroup
                  placeholder="Message"
                  name="message"
                  type="text"
                  value={this.state.message}
                  onChange={this.valueChanged}
                />
                <Button>Submit</Button>
              </Form>
            </CardBody>
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

addMessage.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(addMessage);

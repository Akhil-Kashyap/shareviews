import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Form, CardBody } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost } from "../../actions/postAction";
import { getLocation } from "../../actions/locationAction";

import TextFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/isEmpty";
import Spinner from "../common/Spinner";
import { getGeoLocation } from "../../utils/getGeoLocation";

import "./addMessage.css";

class addMessage extends Component {
  state = {
    modal: false,
    keyword: "",
    message: "",
    latitude: 0,
    longitude: 0,
    submitted: false,
    sendingMessage: true,
  };

  componentDidMount() {
    getGeoLocation().then((location) => {
      this.setState({ latitude: location.lat, longitude: location.lng });
    });
  }

  toggle() {
    let value = this.state.modal;
    this.setState({ modal: !value });

    if (!this.state.submitted) {
      let v = this.state.submitted;
      this.setState({ submitted: !v });
    }

    if (!this.state.sendingMessage) {
      let v = this.state.sendingMessage;
      this.setState({ sendingMessage: !v });
    }
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

    this.props.getLocation();

    let value = this.state.submitted;
    this.setState({ submitted: !value });
    this.setState({ message: "", keyword: "" });

    setTimeout(() => {
      this.setState({
        sendingMessage: false,
      });
    }, 3000);
  };

  valueChanged = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const submitLink = (
      <CardBody style={{ background: "black" }}>
        <CardTitle>Welcome to ShareView</CardTitle>
        <CardText>Leave a message with your location</CardText>
        <Form onSubmit={this.formSubmitted}>
          <TextFieldGroup
            placeholder="<HEAD> Write the header </HEAD>"
            name="keyword"
            type="text"
            value={this.state.keyword}
            onChange={this.valueChanged}
          />
          <TextFieldGroup
            placeholder="<BODY> Write the body </BODY>"
            name="message"
            type="text"
            value={this.state.message}
            onChange={this.valueChanged}
          />
          <Button>Submit</Button>
        </Form>
      </CardBody>
    );

    const submittedLink = this.state.sendingMessage ? (
      <Spinner></Spinner>
    ) : (
      <CardBody style={{ background: "black" }}>
        <CardTitle>Thank You for Sharing</CardTitle>

        <CardText>Your Message has been recorded</CardText>
      </CardBody>
    );

    return (
      <div>
        <Button onClick={this.toggle.bind(this)}>Add Message</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)} style={{ background: "black" }}>
            Add message...
          </ModalHeader>
          <ModalBody>{this.state.submitted ? submitLink : submittedLink}</ModalBody>
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
  getLocation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost, getLocation })(addMessage);

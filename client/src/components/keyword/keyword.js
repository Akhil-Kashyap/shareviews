import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setKeyword } from "../../actions/keywordActions";

import "./keyword.css";

class keyword extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ keyword: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.props.auth.isAuthenticated) {
      let key = "";
      if (this.state.keyword !== "") {
        key = this.state.keyword.toLowerCase();
      }

      this.props.setKeyword(key);
      this.setState({ keyword: "" });
    }
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <input
          className="search-bar"
          value={this.state.keyword}
          onChange={this.onChange}
          type="text"
          placeholder="Enter Your Keyword"
        />
        <button className="search-button" type="submit">
          <i className="fa fa-search" />
        </button>
      </form>
    );
  }
}

keyword.propTypes = {
  setKeyword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setKeyword })(keyword);

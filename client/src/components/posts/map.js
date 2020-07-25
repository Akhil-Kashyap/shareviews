import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPosts } from "../../actions/postAction";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/isEmpty";

import userIcon from "./userIcon.png";
import otherIcon from "./otherIcon.png";

var userMessageIcon = L.icon({
  iconUrl: userIcon,
  iconSize: [35, 40],
  iconAnchor: [17.5, 40],
  popupAnchor: [0, -35],
});

var otherMessageIcon = L.icon({
  iconUrl: otherIcon,
  iconSize: [35, 40],
  iconAnchor: [17.5, 40],
  popupAnchor: [0, -35],
});

class map extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 2,
  };

  componentDidMount() {
    this.props.getPosts(this.props.keyword.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.location.location)) {
      this.setState({
        lat: nextProps.location.location[0],
        lng: nextProps.location.location[1],
        zoom: nextProps.location.zoom,
      });
    }

    if (nextProps.location.zoom !== this.state.zoom) {
      this.setState({
        lat: 0,
        lng: 0,
        zoom: nextProps.location.zoom,
      });
    }

    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { posts, loading } = this.props.post;
    const { user } = this.props.auth;

    let postContent;
    const position = [this.state.lat, this.state.lng];

    if (posts === null || loading) {
      postContent = <Spinner></Spinner>;
    } else {
      postContent = (
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {posts.map((item, index) => {
            let pos = [item.latitude, item.longitude];

            let icon;
            if (item.user === user.id) {
              icon = userMessageIcon;
            } else {
              icon = otherMessageIcon;
            }

            return (
              <Marker position={pos} icon={icon} key={index}>
                <Popup>
                  <span style={{ fontWeight: "bold" }}>{item.name}: </span> <br />
                  {item.text}
                </Popup>
              </Marker>
            );
          })}
        </Map>
      );
    }

    return <div>{postContent}</div>;
  }
}

map.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  keyword: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  location: state.location,
  auth: state.auth,
  keyword: state.keyword,
});

export default connect(mapStateToProps, { getPosts })(map);

import React, { Component } from "react";

const URL =
  window.location.origin === "localhost"
    ? "http://localhost:3001"
    : "https://currentconditions-api.herokuapp.com/Spots";

class SelectSpots extends Component {
  constructor() {
    super();
    this.state = {
      spots: [],
      currentIndex: 0
    };
  }
  componentDidMount() {
    fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ players: res });
      });
  }
  render() {
    return <div />;
  }
}

export default SelectSpots;

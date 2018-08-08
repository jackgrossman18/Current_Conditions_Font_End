import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
// import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.3/mapbox-gl-directions.css";
import FavoriteSpots from "./components/FavoriteSpots/FavoiteSpots";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import SelectSpots from "./components/SelectSpots/SelectSpots";
import SpotsMap from "./components/SpotsMap/SpotsMap";
import Map from "./components/SpotsMap/SpotGenerator";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSignUp(e) {
    e.preventDefault();
    axios
      .post("https://current-conditions-app.herokuapp.com/SignUp", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.token = res.data.token;
        this.setState({ isLoggedIn: true });
      })
      .catch(err => console.log(err));
  }

  handleLogIn(e) {
    e.preventDefault();
    axios
      .post("https://current-conditions-app.herokuapp.com/Login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.token.res.data.token;
        this.setState({ isLoggedIn: true });
      })
      .catch(err => console.log(err));
  }

  handleLogOut(e) {
    e.preventDefault();
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    });
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <nav className="navcontainer">
          <Link to={"/SpotsMap"}>Spots Map</Link>
          <Link to={"/SpotsGenerator"}>Spots Generator</Link>
          <Link to={"/"}>Home</Link>
          <Link to={"/SignUp"}>Sign Up</Link>
          <Link to={"/Login"}>Login</Link>
          <Link to={"/SelectSpots"}>Select Spots</Link>
          <Link to={"FavoriteSpots"}>Favorite Spots</Link>
        </nav>
        <Route path="/" exact />
        <Route path="/SpotsMap" exact component={SpotsMap} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/Login" exact component={Login} />
        <Route path="/SelectSpots" exact component={SelectSpots} />
        <Route path="FavoriteSpots" exact component={FavoriteSpots} />
        <div className="backgroundimage">
          <p className="slider-text">
            All your favorite spots<img className="slider" />
          </p>
        </div>
        <div className="second-slider">
          <p className="slider-text">
            All your favorite spots<img className="slider" />
          </p>
        </div>
      </div>
    );
  }
}

export default App;

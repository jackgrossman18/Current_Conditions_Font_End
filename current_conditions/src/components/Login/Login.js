import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      redirect: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <div>
        <div className="form-container">
          <h1 className="welcome">Welcome Back to Current Conditions</h1>
          <form className="formfont">
            <label>Email: </label>
            <input type="text" name="email" onChange={this.props.handleInput} />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              onChange={this.props.handleInput}
            />
            <button className="mybutton">
              {this.renderRedirect()}
              <input
                value="Submit"
                type="submit"
                onClick={this.props.handleLogin}
              />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

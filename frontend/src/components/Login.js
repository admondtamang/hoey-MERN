import React, { Component } from "react";
import { Field, Control, Input, Button } from "bloomer";
import { Container } from "bloomer/lib/layout/Container";
// import { Box } from 'bloomer/lib/elements/Box';
import Logo from "../icons/logo.png";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Card } from "bloomer/lib/components/Card/Card";
// import '../debug.css';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { isCenter } from "bloomer/lib/bulma";
import { Image } from "bloomer/lib/elements/Image";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      picture: ""
    };
  }

  responseFacebook = res => {
    // this.setState = {
    //   isLoggedIn: true,
    //   username: res.name,
    //   email: res.email,
    //   picture: res.picture.data.url
    // };
    // console.log(res);
    // Axios.post("http://localhost:3001/users/signup", this.state).then(res => {
    //   console.log(res);
    // });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/users/login", this.state).then(
      response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        if (response.data.admin) {
          this.props.history.push("/admin");
        }
        this.setState({
          username: "",
          password: "",
          isLoggedIn: true
        });
      }
    );
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container className="is-flex containerBox">
        <div className="formBox">
          <Image
            src={Logo}
            style={{
              display: "block",
              margin: "auto",
              width: "150px",
              height: "100px"
            }}
          />
          {/* <p className="title has-text-weight-bold has-text-centered">Login</p> */}

          <Field>
            <Control hasIcons>
              <Input
                type="text"
                name="username"
                placeholder="Enter Name"
                value={this.state.userName}
                onChange={this.handleChange}
                className="input is-rounded"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </Control>
          </Field>

          <Field>
            <Control hasIcons>
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                className="input is-rounded"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </Control>
          </Field>

          <Button
            isOutlined
            className="button is-rounded has-text-weight-semibold"
            isColor="info is-fullwidth"
            onClick={this.handleClick}
          >
            Login
          </Button>
          <p
            className="is-size-6 has-text-weight-semibold is-centered is-italic"
            style={{ margin: "15px auto", textAlign: "center" }}
          >
            OR
          </p>
          <FacebookLogin
            appId="508548479866376"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            render={renderProps => (
              <Button
                isColor="info is-fullwidth"
                className="button is-rounded "
                onClick={renderProps.onClick}
              >
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span>
                <span>
                  Login with
                  <span className="has-text-weight-bold"> Facebook</span>
                </span>
              </Button>
            )}
          ></FacebookLogin>

          <p className="m-t-m has-text-centered" style={{ fontSize: "15px" }}>
            Not a user?
            <Link to="/signup" className="is-itallic is-primary">
              Register here!
            </Link>{" "}
          </p>
        </div>
      </Container>
    );
  }
}

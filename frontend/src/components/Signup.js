import React, { Component } from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Box } from "bloomer/lib/elements/Box";
import { Field } from "bloomer";
import { Input } from "bloomer/lib/elements/Form/Input";
// import { Radio } from 'bloomer/lib/elements/Form/Radio'
import { Button } from "bloomer/lib/elements/Button";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      isRegistered: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/users/signup", this.state)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        this.setState({
          username: "",
          email: "",
          password: "",
          isRegistered: true
        });
        alert("signup sucess");
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.isRegistered === true) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="containerBox isFlex">
        <Box className="formBox">
          <p className="title has-text-weight-bold">Signup</p>

          <Field>
            <Label>User Name</Label>
            <Control>
              <Input
                type="text"
                name="username"
                placeholder="User Name"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <Field>
            <Label>Email</Label>
            <Control>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <Field>
            <Label>Password</Label>
            <Control>
              <Input
                type="text"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <p className="m-t-m m-b-m is-italic" style={{ fontSize: "12px" }}>
            By click Singup button you will be agree privicy and policy of{" "}
            <b>Hoey</b>
          </p>
          <Button isColor="isDanger" onClick={this.handleClick}>
            Signup
          </Button>
        </Box>
      </Container>
    );
  }
}

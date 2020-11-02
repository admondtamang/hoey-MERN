import React, { Component } from "react";
import { Columns, Column, Hero, HeroBody, Container, Title } from "bloomer";
import AdminNav from "./AdminNav";
import { Table } from "bloomer/lib/elements/Table";
import Axios from "axios";
export default class UserAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    // For users
    Axios.get("http://localhost:3001/users/", config)
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div>
        <Columns className="p-m">
          <Column isSize="1/3">
            <AdminNav />
          </Column>
          <Column>
            <Hero isColor="info" isSize="small" className="m-b-m">
              <HeroBody>
                <Container hasTextAlign="centered">
                  <Title>Users</Title>
                </Container>
              </HeroBody>
            </Hero>
            <Table isBordered isStriped>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user => {
                  return (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Column>
        </Columns>
      </div>
    );
  }
}

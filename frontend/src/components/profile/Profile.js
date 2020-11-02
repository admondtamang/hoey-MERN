import React, { Component } from "react";
import { Columns, Column, Button } from "bloomer";
import Axios from "axios";
import TopNavbar from "../Dashboard/TopNavbar";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      selectedFile: null,
      uploadedImage: "",
      defaultImage: "default.png"
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/users/me", this.state.config).then(
      response => {
        this.setState({
          user: response.data
        });
      }
    );
  }

  render() {
    return (
      <div>
        <TopNavbar />
        <section className="hero is-medium is-bold">
          <div className="hero-body is-primary m-l p-l-l p-r-l notification">
            <Columns>
              <Column>
                <div className="container is-flex">
                  <figure className="image is-128x128 m-r-l">
                    <img
                      width="100"
                      height="100"
                      className="is-rounded"
                      src={`http://localhost:3001/uploads/${
                        this.state.user.image
                          ? this.state.user.image
                          : this.state.defaultImage
                      }`}
                      alt="profile"
                    />
                  </figure>
                  <div>
                    <h1 className="title is-centered">
                      {this.state.user.username}
                    </h1>
                    <p className="subtitle">{this.state.user.email}</p>
                  </div>
                </div>
              </Column>
              <Column>
                <Link to="/editProfile" value="Edit Profile">
                  <Button isColor="info">
                    <i className="fas fa-edit"></i>
                    Edit Profile
                  </Button>
                </Link>
              </Column>
            </Columns>
          </div>
        </section>
      </div>
    );
  }
}

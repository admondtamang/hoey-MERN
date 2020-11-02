import React, { Component } from "react";
import Axios from "axios";
import TopNavbar from "../Dashboard/TopNavbar";
import {
  Field,
  Control,
  Label,
  Input,
  Button,
  Hero,
  HeroBody,
  Container,
  Title,
  Column,
  Notification,
  Delete
} from "bloomer";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      defaultImage: "default.png",
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      selectedFile: null
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

  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  uploadFile = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("imageFile", this.state.selectedFile);
    console.log(data);
    Axios.post("http://localhost:3001/upload", data, this.state.config)
      .then(response => {
        console.log(data);
        this.setState({
          user: { ...this.state.user, image: response.data.filename }
        });
      })
      .catch(err => console.log(err.response));
  };

  updateUser = e => {
    e.preventDefault();
    Axios.put(
      "http://localhost:3001/users/me",
      this.state.user,
      this.state.config
    )
      .then(response => console.log(response.data))
      .catch(err => console.log(err.response));
    this.props.history.push("/dashboard");
  };

  handleChange(e) {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  }
  render() {
    if (this.state.user === null) {
      return <h3>Loading ...</h3>;
    } else {
      return (
        <div>
          <TopNavbar />
          <Hero isColor="info" isSize="small" className="m-b-m m-t-m">
            <HeroBody>
              <Container hasTextAlign="centered">
                <Title>Edit Profile</Title>
              </Container>
            </HeroBody>
          </Hero>

          <Field>
            <Label>First Name</Label>
            <Control>
              <Input
                type="text"
                name="username"
                placeholder="User Name"
                value={this.state.user.username}
                onChange={e => this.handleChange(e)}
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
                value={this.state.user.email}
                onChange={e => this.handleChange(e)}
              />
            </Control>
          </Field>

          <div className="container">
            <div className="field">
              <div className="file is-left is-info">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    onChange={this.handleFileSelect}
                    name="uploadedImage"
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Upload</span>
                  </span>
                  <span className="file-name">Profile picture</span>
                </label>
              </div>
            </div>
            <div className={{ display: "flex", alignItems: "center" }}>
              <img
                className="is-rounded"
                style={{ width: "100px", height: "100px" }}
                src={`http://localhost:3001/uploads/${
                  this.state.user.image
                    ? this.state.user.image
                    : this.state.defaultImage
                }`}
                alt="profile"
              />

              <Button isOutlined onClick={this.uploadFile}>
                Upload picture
              </Button>
            </div>
            <div>
              <Button isColor="success" onClick={this.updateUser}>
                Update Profile
              </Button>
            </div>
          </div>

          {/* <div>
            <Input
              type="file"
              id="profilePic"
              onChange={this.handleFileSelect}
            />
            {this.state.selectedFile ? (
              <div>
                {" "}
                <img
                  className="img-thumbnail"
                  width="400"
                  src={`http://localhost:3001/uploads/${this.state.user.image}`}
                  alt="profile"
                />
                <Button onClick={this.uploadFile}>upload picture</Button>
              </div>
            ) : null}
          </div>
          <Button isOutlined onClick={this.updateUser}>
            Submit
          </Button> */}
        </div>
      );
    }
  }
}

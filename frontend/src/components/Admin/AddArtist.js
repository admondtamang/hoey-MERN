import React, { Component } from "react";
import Axios from "axios";
import {
  Column,
  Field,
  Control,
  Label,
  Input,
  Button,
  Hero,
  HeroBody,
  Container,
  Columns,
  Title,
  Notification,
  Delete
} from "bloomer";
import AdminNav from "./AdminNav";
export default class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      artist: {},
      defaultImage: "default.png",
      selectedFile: null,
      success: false
    };
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
        console.log(response.data.filename);
        this.setState({
          artist: { ...this.state.artist, artistImage: response.data.filename }
        });
      })
      .catch(err => console.log(err.response));
  };

  AddArtist = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin/artists", this.state.artist).then(
      res => {
        console.log(res);
        this.setState({
          success: true
        });
      }
    );
  };
  handleDeleteNotification() {
    this.setState({
      success: !this.state.success
    });
  }

  handleChange(e) {
    this.setState({
      artist: { ...this.state.artist, [e.target.name]: e.target.value }
    });
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
                  <Title>Artist</Title>
                </Container>
              </HeroBody>
            </Hero>
            {/* Artitst */}
            {this.state.success && (
              <Notification isColor="primary">
                <Delete onClick={this.handleDeleteNotification} />
                Added Sucessfully!
              </Notification>
            )}
            <Field>
              <Label>Artitst Info</Label>
              <Control>
                <Input
                  type="text"
                  name="artistName"
                  placeholder="Artist Name"
                  value={this.state.artistName}
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
                    <span className="file-name">Add Cover image</span>
                  </label>
                </div>
              </div>
              <img
                className="is-rounded"
                style={{ width: "100px", height: "100px" }}
                src={`http://localhost:3001/uploads/${
                  this.state.artist.artistImage
                    ? this.state.artist.artistImage
                    : this.state.defaultImage
                }`}
                alt="profile"
              />
            </div>
            <Button isOutlined onClick={this.uploadFile}>
              Upload picture
            </Button>
            <br></br>
            <Button isColor="info" className="m-t-m" onClick={this.AddArtist}>
              SUBMIT
            </Button>
          </Column>
        </Columns>
      </div>
    );
  }
}

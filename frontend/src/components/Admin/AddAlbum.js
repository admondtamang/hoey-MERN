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
  Select,
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
      album: {},
      artists: [],
      defaultImage: "default.png",
      selectedFile: null,
      selectedOption: null,
      success: false
    };
  }

  componentDidMount() {
    // For artist
    Axios.get("http://localhost:3001/admin/artists", this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          artists: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleMultiChange = selectedOption => {
    console.log(selectedOption.target.value);
    this.setState({
      album: { ...this.state.album, artist: selectedOption.target.value }
    });
    console.log(this.state.album);
  };

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
        this.setState({
          album: { ...this.state.album, albumCover: response.data.filename }
        });
        console.log(this.state.album);
      })
      .catch(err => console.log(err.response));
  };

  AddAlbum = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin/albums", this.state.album).then(
      res => {
        console.log(res);
        this.setState({
          success: true
        });
      }
    );
  };

  handleChange(e) {
    this.setState({
      album: { ...this.state.album, [e.target.name]: e.target.value }
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
                  <Title>album</Title>
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
              <Label>Album Info</Label>
              <Control>
                <Input
                  type="text"
                  name="albumTitle"
                  placeholder="Album Title"
                  onChange={e => this.handleChange(e)}
                />
              </Control>
            </Field>

            <Field>
              <Label>Artitst :</Label>
              <Control>
                <Select name="artist" onChange={this.handleMultiChange}>
                  <option>Select Artitst</option>

                  {this.state.artists.map(artist => {
                    return (
                      <option key={artist._id} value={artist._id}>
                        {artist.artistName}
                      </option>
                    );
                  })}
                </Select>
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
                  this.state.album.albumCover
                    ? this.state.album.albumCover
                    : this.state.defaultImage
                }`}
                alt="profile"
              />
            </div>
            <Button isOutlined onClick={this.uploadFile}>
              Upload picture
            </Button>
            <Button onClick={this.AddAlbum}>SUBMIT</Button>
          </Column>
        </Columns>
      </div>
    );
  }
}

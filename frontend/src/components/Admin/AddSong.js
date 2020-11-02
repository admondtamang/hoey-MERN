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
import { useToasts, addToast } from "react-toast-notifications";
import AdminNav from "./AdminNav";
export default class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      song: {},
      albums: [],
      defaultImage: "default.png",
      selectedFile: null,
      selectedOption: null,
      success: false
    };
  }

  componentDidMount() {
    // For artist
    Axios.get("http://localhost:3001/admin/albums", this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          albums: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleMultiChange = selectedOption => {
    console.log(this.state.song);
    this.setState({
      song: { ...this.state.song, album: selectedOption.target.value }
    });
    console.log(this.state.song);
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
          song: { ...this.state.song, link: response.data.filename }
        });
        console.log(this.state.song);
      })
      .catch(err => console.log(err.response));
  };

  AddSong = e => {
    e.preventDefault();
    console.log("Add song");
    console.log(this.state.song);
    Axios.post("http://localhost:3001/songs", this.state.song).then(res => {
      console.log(res);
      this.setState({
        success: true
      });
    });
  };

  handleChange(e) {
    this.setState({
      song: { ...this.state.song, [e.target.name]: e.target.value }
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
                  <Title>Song</Title>
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
              <Label>Song Info</Label>
              <Control>
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={e => this.handleChange(e)}
                />
              </Control>
            </Field>
            <Field>
              <Label></Label>
              <Control>
                <Input
                  type="number"
                  name="year"
                  placeholder="Year"
                  onChange={e => this.handleChange(e)}
                />
              </Control>
            </Field>
            <Field>
              <Label></Label>
              <Control>
                <Input
                  type="number"
                  name="duration"
                  placeholder="Duration (in Seconds)"
                  onChange={e => this.handleChange(e)}
                />
              </Control>
            </Field>

            <Field>
              <Label>Album :</Label>
              <Control>
                <Select name="album" onChange={this.handleMultiChange}>
                  <option>Select Album</option>
                  {this.state.albums.map(album => {
                    return (
                      <option key={album._id} value={album._id}>
                        {album.albumTitle}
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
                    <span className="file-name">Add Song</span>
                  </label>
                </div>
              </div>
            </div>
            <Button isOutlined onClick={this.uploadFile}>
              Upload Song
            </Button>
            <Button onClick={this.AddSong}>SUBMIT</Button>
          </Column>
        </Columns>
      </div>
    );
  }
}

import React, { Component } from "react";
import AdminNav from "./AdminNav";
import { Columns } from "bloomer/lib/grid/Columns";
import {
  Column,
  Hero,
  HeroBody,
  Container,
  Title,
  Label,
  Modal,
  ModalBackground,
  ModalContent,
  ModalClose,
  ModalCard,
  ModalCardHeader,
  ModalCardFooter,
  ModalCardTitle,
  Notification,
  Field,
  Control,
  Input,
  Delete,
  ModalCardBody
} from "bloomer";
import Axios from "axios";
import { Table } from "bloomer/lib/elements/Table";
import { Button } from "bloomer/lib/elements/Button";
import { Link } from "react-router-dom";

export default class ArtistAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      artist: {},
      isActive: false,
      defaultImage: "default.png",
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      selectedFile: null
    };
  }
  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  toggleModel = e => {
    this.setState({
      isActive: !this.state.isActive
    });
    console.log(e);

    // Get one artist
    Axios.get(`http://localhost:3001/admin/artists/${e}`, this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          artist: response.data
        });
      })
      .catch(err => console.log(err.response));
  };

  componentDidMount() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    // For artist
    Axios.get("http://localhost:3001/admin/artists", config)
      .then(response => {
        console.log(response);
        this.setState({
          artists: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleDelete = e => {
    if (window.confirm("Are you sure you want to delete?")) {
      Axios.delete(
        `http://localhost:3001/admin/artists/${e}`,
        this.state.config
      ).then(res => {
        const filteredArtist = this.state.artists.filter(artist => {
          return artist._id !== e;
        });
        this.setState({
          artists: filteredArtist
        });
      });
    }
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
        console.log(this.state.artist);
      })
      .catch(err => console.log(err.response));
  };

  updateArtist = e => {
    e.preventDefault();

    // const updatedArtists = this.state.artists.map(artist => {
    //   if (artist._id === updatedArtists._id) {
    //     artist = updatedArtists;
    //   }
    //   return artist;
    // });

    // this.setState({
    //   artists: updatedArtists
    // });

    console.log(this.state.artist);
    Axios.put(
      `http://localhost:3001/admin/artists/${this.state.artist._id}`,
      this.state.artist,
      this.state.config
    )
      .then(response => {
        console.log(response.data);
        alert("updated sucessfully");
      })
      .catch(err => console.log(err.response));
    this.props.history.push("/admin/artist");
  };

  handleChange(e) {
    this.setState({
      artist: { ...this.state.artist, [e.target.name]: e.target.value }
    });
  }
  handleDeleteNotification(e) {
    this.setState({
      isActive: !this.state.isActive
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
                  <Title>Artist - {this.state.artists.length}</Title>
                </Container>
              </HeroBody>
            </Hero>
            <Container>
              <Label>Add new Artist</Label>
              <Button className="m-b-m">
                <Link to="/admin/addArtist">Add Artist</Link>
              </Button>
            </Container>
            <Table isBordered isStriped>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Image</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.artists.map(artist => {
                  return (
                    <tr key={artist._id}>
                      <td>{artist.artistName}</td>
                      <td>
                        <img
                          className="is-rounded"
                          src={`http://localhost:3001/uploads/${artist.artistImage}`}
                          alt="profile"
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>
                        <Button
                          onClick={this.toggleModel.bind(this, artist._id)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-pen-square has-text-info"></i>
                          </span>
                          <label>Edit</label>
                        </Button>

                        <Button
                          onClick={this.handleDelete.bind(this, artist._id)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-trash has-text-danger "></i>
                          </span>
                          <label>Delete</label>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Column>
        </Columns>

        <Modal isActive={this.state.isActive}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              <ModalCardTitle>Edit Artitst</ModalCardTitle>
              <Delete onClick={this.toggleModel.bind(this)} />
            </ModalCardHeader>
            <ModalCardBody>
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
                    value={this.state.artist.artistName}
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
            </ModalCardBody>
            <ModalCardFooter>
              <Button isColor="success" onClick={this.updateArtist}>
                Save
              </Button>
              <Button isColor="warning" onClick={this.toggleModel.bind(this)}>
                Cancel
              </Button>
            </ModalCardFooter>
          </ModalCard>
        </Modal>
      </div>
    );
  }
}

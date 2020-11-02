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
      songs: [],
      song: {},
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
    Axios.get(`http://localhost:3001/songs/${e}`, this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          song: response.data
        });
      })
      .catch(err => console.log(err.response));
  };

  componentDidMount() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    // For artist
    Axios.get("http://localhost:3001/songs", config)
      .then(response => {
        console.log(response);
        this.setState({
          songs: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleDelete = e => {
    if (window.confirm("Are you sure you want to delete?")) {
      Axios.delete(`http://localhost:3001/songs/${e}`, this.state.config).then(
        res => {
          const filteredSong = this.state.songs.filter(song => {
            return song._id !== e;
          });
          this.setState({
            songs: filteredSong
          });
        }
      );
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
          song: { ...this.state.song, artistImage: response.data.filename }
        });
        console.log(this.state.song);
      })
      .catch(err => console.log(err.response));
  };

  // Left
  updateSong = e => {
    e.preventDefault();

    // const updatedArtists = this.state.artists.map(artist => {
    //   if (artist._id === updatedArtists._id) {
    //     artist = updatedArtists;
    //   }
    //   return artist;
    // });

    // this.setState({
    //   songs: updatedArtists
    // });

    console.log(this.state.song);
    Axios.put(
      `http://localhost:3001/songs/${this.state.song._id}`,
      this.state.artist,
      this.state.config
    )
      .then(response => console.log(response.data))
      .catch(err => console.log(err.response));
    this.props.history.push("/admin/artist");
  };

  handleChange(e) {
    this.setState({
      song: { ...this.state.song, [e.target.name]: e.target.value }
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
                  <Title>Song - {this.state.songs.length}</Title>
                </Container>
              </HeroBody>
            </Hero>
            <Container>
              <Label>Add new Artist</Label>
              <Button className="m-b-m">
                <Link to="/admin/addSong">Add Song</Link>
              </Button>
            </Container>
            <Table isBordered isStriped>
              <thead>
                <tr>
                  <th>Song Name</th>
                  <th>Song Artist</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.songs.map(song => {
                  return (
                    <tr key={song._id}>
                      <td>{song.title}</td>
                      <td>
                        <img
                          className="is-rounded"
                          style={{ width: "50px", height: "50px" }}
                          src={`http://localhost:3001/uploads/${
                            song.album.albumCover
                              ? song.album.albumCover
                              : this.state.defaultImage
                          }`}
                          alt="profile"
                        />
                      </td>
                      <td>
                        <Button onClick={this.toggleModel.bind(this, song._id)}>
                          <span className="icon is-small">
                            <i className="fas fa-pen-square has-text-info"></i>
                          </span>
                          <label>Edit</label>
                        </Button>

                        <Button
                          onClick={this.handleDelete.bind(this, song._id)}
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
                    name="title"
                    placeholder="Song Name"
                    value={this.state.song.title}
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
                      <span className="file-name">Update Song image</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button isOutlined onClick={this.uploadFile}>
                Upload Song
              </Button>
            </ModalCardBody>
            <ModalCardFooter>
              <Button isColor="success" onClick={this.updateSong}>
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

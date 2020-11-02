import React, { Component } from "react";
import AdminNav from "./AdminNav";
import Axios from "axios";
import { Button } from "bloomer/lib/elements/Button";
import ZingChart from "zingchart-react";
import { Label } from "bloomer";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      songs: [],
      artists: [],
      albums: [],
      search: "",
      defaultImage: "default.png",
      chart: {
        type: "line",
        series: [
          {
            values: [4, 5, 3, 11, 12]
          }
        ],
        scaleX: {
          // set scale label
          label: {
            text: "Days"
          },
          // convert text on scale indices
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        scaleY: {
          // scale label with unicode character
          label: {
            text: "No. of Hits"
          }
        }
      }
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

    // For songs
    Axios.get("http://localhost:3001/songs/", config)
      .then(response => {
        console.log(response);
        this.setState({
          songs: response.data
        });
      })
      .catch(err => console.log(err.response));
    // For Artists
    Axios.get("http://localhost:3001/admin/artists", config)
      .then(response => {
        console.log(response);
        this.setState({
          artists: response.data
        });
      })
      .catch(err => console.log(err.response));
    // For albums
    Axios.get("http://localhost:3001/admin/albums", config)
      .then(response => {
        console.log(response);
        this.setState({
          albums: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleRevoke = e => {
    console.log(e);

    if (window.confirm("Are you sure you want to delete?")) {
      Axios.delete(`http://localhost:3001/users/${e}`, this.state.config).then(
        userR => {
          let updatedUsers = this.state.users.map(user => {
            if (user._id === userR._id) {
              user = updatedUsers;
            }
            return user;
          });

          this.setState({
            users: updatedUsers
          });
        }
      );
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let filteredUser = this.state.users.filter(song => {
      return (
        song.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (
      <div className="p-m">
        <div className="columns">
          <div className="column is-3 ">
            <AdminNav />
          </div>
          <div className="column is-9">
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Hello, Admin.</h1>
                  <h2 className="subtitle">
                    I hope you are having a great day!
                  </h2>
                </div>
              </div>
            </section>
            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{this.state.users.length}</p>
                    <p className="subtitle">Users</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{this.state.songs.length}</p>
                    <p className="subtitle">Songs</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{this.state.albums.length}</p>
                    <p className="subtitle">Albums</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{this.state.artists.length}</p>
                    <p className="subtitle">Artists</p>
                  </article>
                </div>
              </div>
            </section>

            <div className="columns">
              <div className="column is-6">
                <div className="card events-card">
                  <header className="card-header">
                    <p className="card-header-title">Statics</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </header>
                  <div className="card-table">
                    <div className="content">
                      <ZingChart data={this.state.chart} />
                      <Label className="m-l-xl">
                        <b>Chart: </b>Song hits
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-6">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">User Search</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <div className="control has-icons-left has-icons-right">
                        <input
                          className="input is-large"
                          type="text"
                          onChange={this.handleChange.bind(this)}
                          name="search"
                          placeholder="Search User"
                        />
                        <span className="icon is-medium is-left">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                      <table className="table is-fullwidth is-striped">
                        <tbody>
                          {filteredUser.map(user => {
                            return (
                              <tr>
                                <td width="5%">
                                  <img
                                    className="is-rounded"
                                    style={{ width: "40px", height: "40px" }}
                                    src={`http://localhost:3001/uploads/${
                                      user.image
                                        ? user.image
                                        : this.state.defaultImage
                                    }`}
                                  />
                                </td>
                                <td>{user.username}</td>
                                <td className="level-right">
                                  <Button
                                    isColor="danger"
                                    onClick={this.handleRevoke.bind(
                                      this,
                                      user._id
                                    )}
                                  >
                                    Revoke
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

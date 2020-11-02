import React, { Component } from "react";
import { Container, Title } from "bloomer";
import Axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      search: "",
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    };
  }
  componentDidMount() {
    //All Songs
    Axios.get("http://localhost:3001/songs/").then(response => {
      this.setState({
        songs: response.data
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    let filteredSongs = this.state.songs.filter(song => {
      return (
        song.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div>
        <Container className="p-t-xxl">
          <Title>Search</Title>
          <div className="control has-icons-left has-icons-right p-r-m p-t-s">
            <input
              className="input is-rounded is-bold"
              name="search"
              //   value={currentTodo}
              // onChange={(e) => handleCurrentTodoChange(e.target.value)} />
              onChange={this.handleChange.bind(this)}
              type="email"
              placeholder="Search for songs, artists, albums  and stations."
            />
            <span className="icon is-small is-left p-t-m">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </Container>

        <Container style={{ padding: "40px" }}>
          {filteredSongs.map(song => {
            return (
              <div className="is-flex m-b-s">
                <figure className="image is-48x48">
                  <img
                    className="is-rounded"
                    src={`http://localhost:3001/uploads/icons/music.png`}
                    alt="profile"
                  />
                </figure>
                <div className="p-l-s">
                  <p
                    className="has-text-weight-bold"
                    style={{ fontSize: "15px" }}
                  >
                    {song.title}
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    {song.album.artist.artistName}
                  </p>
                </div>
                <div className="has-text-right container">
                  <i className="fas fa-heart" title="favourite"></i>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

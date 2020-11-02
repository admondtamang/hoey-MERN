import React, { Component } from "react";
import Axios from "axios";
import TopNavbar from "./Dashboard/TopNavbar";
import SideMenu from "./Dashboard/SideMenu";
import { Columns, Column, Title, Button } from "bloomer";
import Player from "./Dashboard/Player";
import ArtistsComp from "./Dashboard/ArtistsComp";
import { useToasts } from "react-toast-notifications";
const music = [
  {
    url: "http://localhost:3001/uploads/imageFile-1582402560776.mp3",
    cover: "http://localhost:3001/uploads/imageFile-1582399060074.jpg",
    artist: {
      name: "Justin Bieber",
      song: "No Pressure"
    }
  },
  {
    url: "http://localhost:3001/uploads/imageFile-1582475050860.mp3",
    cover: "http://localhost:3001/uploads/imageFile-1582398974860.jpg",
    artist: {
      name: "tere Liye",
      song: "Adelde"
    }
  },
  {
    url: "http://localhost:3001/uploads/imageFile-1582518663647.mp3",
    cover: "http://localhost:3001/uploads/imageFile-1582398974860.jpg",
    artist: {
      name: "Hello",
      song: "Adelde"
    }
  }
];
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      songs: [],
      playSongs: [],
      artists: [],
      love: false,
      defaultImage: "icons/music.png",
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    };
  }

  //Add to favourite
  favourite = params => {
    let song = {
      songId: params
    };

    Axios.post(
      `http://localhost:3001/users/favourite/`,
      song,
      this.state.config
    )
      .then(response => {
        console.log(response);
        alert("sucessfully added to favourite");
      })
      .catch(err => console.log(err.response));
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/users/me", this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err.response));

    // Top Songs
    Axios.get("http://localhost:3001/songs/top").then(response => {
      // console.log(response.data);
      this.setState({
        songs: response.data
      });
    });

    //All Songs
    Axios.get("http://localhost:3001/songs/").then(response => {
      this.setState({
        playSongs: response.data
      });
      // console.log(this.state.playSongs);
    });

    // Artists
    Axios.get("http://localhost:3001/admin/artists/", this.state.config).then(
      response => {
        console.log("artist" + response.data);
        this.setState({
          artists: response.data
        });
      }
    );
  }

  handlePlay = () => {
    console.log(this.state.songs);
  };
  render() {
    return (
      <div>
        <TopNavbar />
        <Columns>
          <Column isSize="1/4" style={{ padding: "40px" }}>
            <SideMenu />
          </Column>
          <Column>
            <Columns>
              <Column style={{ padding: "40px" }}>
                {/* Songs */}
                <Title style={{ fontSize: "20px" }}>Top 3 Songs</Title>

                {this.state.songs.map(song => {
                  return (
                    <div
                      className="is-flex m-b-s"
                      onClick={this.handlePlay}
                      key={song._id}
                    >
                      <figure className="image is-48x48">
                        <img
                          className="is-rounded"
                          style={{ width: "50px", height: "50px" }}
                          src={`http://localhost:3001/uploads/${
                            song.album.albumCover
                              ? song.album.albumCover
                              : this.state.defaultImage
                          }`}
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
                        <i
                          className="fas fa-heart"
                          title="favourite"
                          onClick={this.favourite.bind(this, song._id)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </Column>

              {/* Artists */}
              <Column isSize="1/3" style={{ padding: "40px" }}>
                <Title style={{ fontSize: "20px" }}>Top Artists</Title>
                <ArtistsComp {...this.state} />
              </Column>
            </Columns>
          </Column>
        </Columns>
        <Player songs={music} />
      </div>
    );
  }
}

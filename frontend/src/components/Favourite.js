import React, { Component } from "react";
import TopNavbar from "./Dashboard/TopNavbar";
import { Columns, Column, Title } from "bloomer";
import SideMenu from "./Dashboard/SideMenu";
import Axios from "axios";
import SongItem from "./Dashboard/SongItem";

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    };
  }
  componentDidMount() {
    //Artists
    Axios.get("http://localhost:3001/users/favourite", this.state.config).then(
      response => {
        this.setState({
          songs: response.data.songs
        });
      }
    );
  }
  render() {
    return (
      <div>
        <TopNavbar />
        <Columns>
          <Column isSize="1/4" style={{ padding: "40px" }}>
            <SideMenu />
          </Column>
          <Column style={{ padding: "40px" }}>
            <Title style={{ fontSize: "20px" }}>Favourite Songs</Title>

            {this.state.songs.map(song => {
              return (
                <SongItem
                  title={song.title}
                  artist={song.album.artist.artistName}
                  image={song.album.albumCover}
                />
              );
            })}
          </Column>
        </Columns>
      </div>
    );
  }
}

import React, { Component } from "react";
import TopNavbar from "./Dashboard/TopNavbar";
import { Columns, Column, Title } from "bloomer";
import SideMenu from "./Dashboard/SideMenu";
import Axios from "axios";

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }
  componentDidMount() {
    // Albums
    Axios.get("http://localhost:3001/admin/albums").then(response => {
      console.log(response.data);
      this.setState({
        albums: response.data
      });
    });
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
            <Title style={{ fontSize: "20px" }}>All Albums</Title>

            {this.state.albums.map(album => {
              return (
                <div className="is-flex m-b-s" key={album._id}>
                  <figure className="image is-48x48">
                    <img
                      src={`http://localhost:3001/uploads/${album.albumCover}`}
                      alt="profile"
                      width="100"
                      height="100"
                    />
                  </figure>
                  <div className="p-l-m">
                    <p className="has-text-weight-bold">{album.albumTitle}</p>
                    <p>{album.artist.artistName}</p>
                  </div>
                </div>
              );
            })}
          </Column>
        </Columns>
      </div>
    );
  }
}

import React, { Component } from "react";
import TopNavbar from "./Dashboard/TopNavbar";
import { Columns, Column, Title } from "bloomer";
import SideMenu from "./Dashboard/SideMenu";
import Axios from "axios";

export default class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
  }
  componentDidMount() {
    //Artists
    Axios.get("http://localhost:3001/admin/artists").then(response => {
      console.log(response.data);
      this.setState({
        defaultImage: "default.png",
        artists: response.data
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
            <Title style={{ fontSize: "20px" }}>All Artists</Title>

            {this.state.artists.map(artist => {
              return (
                <div className="is-flex m-b-s">
                  <figure className="image is-48x48">
                    <img
                      className="is-rounded"
                      style={{ width: "50px", height: "50px" }}
                      src={`http://localhost:3001/uploads/${
                        artist.artistImage
                          ? artist.artistImage
                          : this.state.defaultImage
                      }`}
                    />
                  </figure>
                  <div className="p-l-m">
                    <p className="has-text-weight-bold">
                      {artist.artistName ? artist.artistName : "Unknown Artist"}
                    </p>
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

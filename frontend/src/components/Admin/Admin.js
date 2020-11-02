import React, { Component } from "react";
import { Route } from "react-router-dom";
import SongAdmin from "./SongAdmin";
import AdminDashboard from "./AdminDashboard";
import UserAdmin from "./UserAdmin";
import AlbumAdmin from "./AlbumAdmin";
import ArtistAdmin from "./ArtistAdmin";
import AddArtist from "./AddArtist";
import AddAlbum from "./AddAlbum";
import AddSong from "./AddSong";

export default class Admin extends Component {
  render() {
    return (
      <div className="m-t-m">
        <Route exact path={this.props.match.path} component={AdminDashboard} />
        <Route path={`${this.props.match.path}/user`} component={UserAdmin} />
        <Route path={`${this.props.match.path}/song`} component={SongAdmin} />
        <Route path={`${this.props.match.path}/album`} component={AlbumAdmin} />
        <Route
          path={`${this.props.match.path}/artist`}
          component={ArtistAdmin}
        />
        <Route
          path={`${this.props.match.path}/addArtist`}
          component={AddArtist}
        />
        <Route
          path={`${this.props.match.path}/addAlbum`}
          component={AddAlbum}
        />
        <Route path={`${this.props.match.path}/addSong`} component={AddSong} />
      </div>
    );
  }
}

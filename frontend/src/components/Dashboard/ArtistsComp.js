import React, { Component } from "react";

export default class ArtistsComp extends Component {
  render() {
    return (
      <div>
        {this.props.artists.map(artist => {
          return (
            <div className="is-flex m-b-m" key={artist._id}>
              <figure className="image is-48x48">
                <img
                  className="is-rounded"
                  style={{ width: "48px", height: "48px" }}
                  src={`http://localhost:3001/uploads/${artist.artistImage}`}
                  alt="profile"
                />
              </figure>
              <div className="p-l-m">
                <p className="has-text-weight-bold">{artist.artistName}</p>
                <p>don</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

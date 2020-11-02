import React, { Component } from "react";

export default class SongItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultImage: "default.png"
    };
  }

  render() {
    let { image, artist, title } = this.props;
    return (
      <div className="is-flex m-b-m">
        <figure className="image is-48x48">
          <img
            className="is-rounded"
            style={{ width: "50px", height: "50px" }}
            src={`http://localhost:3001/uploads/${
              image ? image : this.state.defaultImage
            }`}
          />
        </figure>
        <div className="p-l-s">
          <p className="has-text-weight-bold" style={{ fontSize: "15px" }}>
            {title}
          </p>
          <p style={{ fontSize: "13px" }}>{artist}</p>
        </div>
      </div>
    );
  }
}

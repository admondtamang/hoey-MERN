import React, { Component } from "react";
import AdminNav from "./AdminNav";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column, Hero, HeroBody, Container, Title, Label } from "bloomer";
import Axios from "axios";
import { Table } from "bloomer/lib/elements/Table";
import { Button } from "bloomer/lib/elements/Button";
import { Link } from "react-router-dom";

export default class AlbumAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    // For users
    Axios.get("http://localhost:3001/admin/albums", config)
      .then(response => {
        console.log(response);
        this.setState({
          albums: response.data
        });
      })
      .catch(err => console.log(err.response));
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
                  <Title>Albums</Title>
                </Container>
              </HeroBody>
            </Hero>
            <Container>
              <Label>Add new Album</Label>
              <Button className="m-b-m">
                <Link to="/admin/addAlbum">Add Album</Link>
              </Button>
            </Container>
            <Table isBordered isStriped>
              <thead>
                <tr>
                  <th>Album</th>
                  <th>Image</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.albums.map(album => {
                  return (
                    <tr key={album._id}>
                      <td>{album.albumTitle}</td>
                      <td>
                        <img
                          className="is-rounded"
                          src={`http://localhost:3001/uploads/${album.albumCover}`}
                          alt="profile"
                          width="80"
                          height="80"
                        />
                      </td>
                      <td>
                        <Button>
                          <span className="icon is-small">
                            <i className="fas fa-pen-square has-text-info"></i>
                          </span>
                          <label>Edit</label>
                        </Button>

                        <Button isLight>
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
      </div>
    );
  }
}

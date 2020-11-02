import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  NavbarBrand,
  Icon,
  NavbarStart,
  NavbarItem,
  NavbarLink,
  NavbarDropdown,
  Navbar
} from "bloomer";

import logo from "../../icons/logo.png";
import Axios from "axios";
import { NavbarBurger } from "bloomer/lib/components/Navbar/NavbarBurger";
import { NavbarMenu } from "bloomer/lib/components/Navbar/NavbarMenu";
import { NavbarEnd } from "bloomer/lib/components/Navbar/NavbarEnd";
class TopNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      },
      defaultImage: "default.png",
      user: {}
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/users/me", this.state.config)
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err.response));
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  handleProfile = e => {
    e.preventDefault();
    this.props.history.push("/profile");
  };

  render() {
    return (
      <Navbar style={{ marginTop: "15px" }}>
        <NavbarBrand>
          <NavbarItem>
            <Link to="/dashboard">
              <img src={logo} style={{ marginRight: "5px" }} alt="logo" />
            </Link>
          </NavbarItem>
          <NavbarBurger
            isActive={this.state.isActive}
            onClick={this.onClickNav}
          />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
          <div className="control has-icons-left container has-icons-right p-r-m p-t-s">
            <Link to="/search">
              <input
                className="input is-rounded is-bold"
                name="search"
                type="email"
                placeholder="Search for songs, artists, albums  and stations."
              />
              <span className="icon is-small is-left p-t-m">
                <i className="fas fa-search"></i>
              </span>
            </Link>
          </div>
          <NavbarEnd>
            <NavbarItem>
              <NavbarStart>
                <Icon
                  isSize="medium"
                  className="fa fa-bell fa-2x is-pulled-right m-r-m"
                />
                <figure className="image is-32x32">
                  <img
                    className="is-rounded"
                    style={{ width: "40px", height: "40px" }}
                    src={`http://localhost:3001/uploads/${
                      this.state.user.image
                        ? this.state.user.image
                        : this.state.defaultImage
                    }`}
                    alt="profile"
                  />
                </figure>
                <NavbarItem hasDropdown isHoverable style={{ padding: 0 }}>
                  <NavbarLink href="#" className="p-b-l"></NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem href="#/" onClick={this.handleProfile}>
                      <Icon className="fa fa-user" />
                      <span>Change Profile</span>
                    </NavbarItem>
                    <NavbarItem href="#/" onClick={this.handleLogout}>
                      <Icon className="fa fa-sign-out-alt" />
                      <span>Logout</span>
                    </NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              </NavbarStart>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>

      // <Container style={{ paddingTop: "20px" }}>
      //   <Columns>
      //     <Column>
      //       <Link to="/dashboard">
      //         <img src={logo} style={{ marginRight: "5px" }} alt="logo" />
      //       </Link>
      //     </Column>
      //     <Column isSize="2/3">
      //       <div className="control has-icons-left has-icons-right">
      //         <input
      //           className="input is-rounded is-bold"
      //           name="search"
      //           type="email"
      //           placeholder="Search for songs, artists, albums  and stations."
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-search"></i>
      //         </span>
      //       </div>
      //     </Column>
      //     <Column className="is-pulled-right is-flex">
      //       <NavbarStart>
      //         <Icon
      //           isSize="medium"
      //           className="fa fa-bell fa-2x is-pulled-right m-r-m"
      //         />
      //         <figure className="image is-32x32">
      //           <img
      //             className="is-rounded"
      //             src={`http://localhost:3001/uploads/profile/${
      //               this.state.user.image
      //                 ? this.state.user.image
      //                 : this.state.defaultImage
      //             }`}
      //             alt="profile"
      //           />
      //         </figure>
      //         <NavbarItem hasDropdown isHoverable style={{ padding: 0 }}>
      //           <NavbarLink
      //             href="#/documentation"
      //             className="p-b-l"
      //           ></NavbarLink>
      //           <NavbarDropdown>
      //             <NavbarItem href="#/" onClick={this.handleProfile}>
      //               <Icon className="fa fa-user" />
      //               <span>Change Profile</span>
      //             </NavbarItem>
      //             <NavbarItem href="#/" onClick={this.handleLogout}>
      //               <Icon className="fa fa-sign-out-alt" />
      //               <span>Logout</span>
      //             </NavbarItem>
      //           </NavbarDropdown>
      //         </NavbarItem>
      //       </NavbarStart>
      //     </Column>
      //   </Columns>
      // </Container>
    );
  }
}

export default withRouter(TopNavbar);

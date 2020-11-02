import React, { Component } from "react";
import { Menu, MenuLabel, MenuList, MenuLink, Icon } from "bloomer";
import { Link } from "react-router-dom";

export default class SideMenu extends Component {
  render() {
    return (
      <div>
        <Menu>
          <MenuLabel className="has-text-weight-bold">
            <b>Music</b>
          </MenuLabel>
          <MenuList>
            <li>
              <MenuLink isActive href="/dashboard">
                <Icon className="fa fa-home" style={{ marginRight: "10px" }} />
                Dashboard
              </MenuLink>
            </li>
            <li>
              <MenuLink href="/artists">
                <Icon className="fa fa-user" style={{ marginRight: "10px" }} />
                Artists
              </MenuLink>
            </li>
            <li>
              <MenuLink href="/albums">
                <Icon
                  className="fa fa-compact-disc"
                  style={{ marginRight: "10px" }}
                />
                Albums
              </MenuLink>
            </li>
          </MenuList>
          <MenuLabel className="has-text-weight-bold">Playlist</MenuLabel>
          <MenuList>
            <li>
              <MenuLink href="/favourite">
                <Icon
                  className="fa fa-list-ul"
                  style={{ marginRight: "10px" }}
                />
                Favourite
              </MenuLink>
            </li>
            <li>
              <MenuLink>
                <Icon
                  className="fa fa-list-ul"
                  style={{ marginRight: "10px" }}
                />
                Custom
              </MenuLink>
            </li>
            <li>
              <MenuLink>
                <Icon
                  className="fa fa-list-ul"
                  style={{ marginRight: "10px" }}
                />
                Random
              </MenuLink>
            </li>
          </MenuList>
        </Menu>
      </div>
    );
  }
}

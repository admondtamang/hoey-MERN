import React from "react";
import { Link } from "react-router-dom";
import logo from "../../icons/logo.png";

export default function AdminNav() {
  return (
    <div>
      <nav className="navbar is-white m-b-m">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/admin/" className="navbar-item brand-text">
              <img src={logo} style={{ marginRight: "5px" }} alt="logo" />
            </Link>

            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
      <aside className="menu is-hidden-mobile">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <Link className="navbar-item" to="/admin/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/admin/song">
              Song
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/admin/album">
              Album
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/admin/artist">
              Artist
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

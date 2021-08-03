import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export default class Menu extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="MainMenu">
            <img
              src="https://careers.nashtechglobal.com/wp-content/themes/nashtech/library/img/logo.svg"
              className="MenuImage"
            />
            <h3 className="MenuTitles">Online Asset Management</h3>
            <div className="MenuList">
              <ul className="MenuColumn">
                <li>
                  <Link to="/home" className="MenuItems">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/manage_user" className="MenuItems">
                    Manage User
                  </Link>
                </li>
                <li>
                  <Link to="/manage_asset" className="MenuItems">
                    Manage Asset
                  </Link>
                </li>
                <li>
                  <Link to="/manage_assignment" className="MenuItems">
                    Manage Assignment
                  </Link>
                </li>
                <li>
                  <Link to="/request_returning" className="MenuItems">
                    Request for Returning
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="MenuItems">
                    Report
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

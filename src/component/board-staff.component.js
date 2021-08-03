import React, { Component } from "react";
import {Link} from 'react-router-dom'
import UserService from "../services/user.service";
import "./boardstaff.css";

import EventBus from '../common/EventBus'

export default class BoardStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getStaffBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-3">
            <div className="StaffMenu">
              <img
                src="https://careers.nashtechglobal.com/wp-content/themes/nashtech/library/img/logo.svg"
                className="StaffMenuImage"
              />
              <h3 className="MenuTitles">Online Asset Management</h3>
              <div className="StaffMenuList">
                <ul className="StaffMenuColumn">
                  <li>
                    <Link to="/home" className="StaffMenuItems">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 col-lg-9">
          <h3 className="ContentTitles">My Assignment</h3>
          <p>Content here</p>
          </div>
        </div>
      </div>
    );
  }
}

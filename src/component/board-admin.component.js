import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/user.service";

import EventBus from '../common/EventBus'

//Import Menu cua Admin heree
import Menu from "./Menu";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({ content: response.data });
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
    return(
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 col-md-3 col-lg-3'>
                <div className='AdminMenu'>
                <Menu />
                </div>
            </div>
            <div className='col-12 col-md-9 col-lg-9'>
                <div className='AdminContent'>
                    <p>{this.state.content}</p>
                    <Switch>
                        <Route></Route>
                    </Switch>
                </div>
            </div>
        </div>
    </div>
    ) ;
  }
}

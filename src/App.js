import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Import Component and Service
import Footer from "./component/Footer";
import AuthService from "./services/auth.service";
import Login from "./component/login.component";
import Home from "./component/home.component";
import BoardStaff from "./component/board-staff.component";
import BoardAdmin from "./component/board-admin.component";

import EventBus from "./common/EventBus";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("Admin"),
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div className="App">
        <nav className="navbar navbar-expand">
          <div className=" container">
            <Link to="/" className="navbrand-item">
              Home
            </Link>
            {/* Admin boarddd  */}
            {showAdminBoard && (
              <li>
                <Link to={"/admin"} className="nav-item">
                  Admin Board
                </Link>
              </li>
            )}
            {/* Staff Board here */}
            {currentUser && (
              <Link to={"/staff"} className="nav-item">
                Staff Board
              </Link>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <a href="/login" className="nav-item" onClick={this.logOut}>
                LogOut
              </a>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <Link to={"/login"} className="nav-item">
                Login
              </Link>

              {/* <Link to={"/register"} className="nav-item">
                Sign Up
              </Link> */}
            </div>
          )}
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-12">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route path="/staff" component={BoardStaff} />
                <Route path="/admin" component={BoardAdmin} />
              </Switch>
            </div>
          </div>
        </div>
        {/* <div className="footer">
          <Footer />
        </div> */}
      </div>
    );
  }
}

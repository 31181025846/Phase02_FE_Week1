import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import './login.css';
import AuthService from "../services/auth.service";

//Validation username Blank
const usernameRequire = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        User name can not be blank!
      </div>
    );
  }
};

//Validation password Blank
const passwordRequire = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Password can not be blank!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          //Quay tro ve Trang Home
          this.props.history.push("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
          });
        }
      );
    }
  }

  //Validation Login Button
  getInitialState() {
    return {
      invalidData: true,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.username && nextState.password);
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="login form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[usernameRequire]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="login form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[passwordRequire]}
              />
            </div>

            <div className="form-group">
              <button
                className="btnlogin btn btn-primary btn-block"
                disabled={this.state.invalidData}
              >
                <span>Login</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

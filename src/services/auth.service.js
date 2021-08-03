import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";

class AuthService {
  //login here//
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response);
        return response.data;
      });
  }

  //logout here//
  logout() {
    localStorage.removeItem("user");
  }

  //register////
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

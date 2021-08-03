import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8082/api/v1/";

class UserService{
    getPublicContent() {
        return axios.get(API_URL + 'public');
      }

      ///Staff board here
      getStaffBoard() {
        return axios.get(API_URL + 'staff', { headers: authHeader() });
      }

      ///Admin board here

      getAdminBoard() {
          return axios.get(API_URL + 'admin', { headers: authHeader() });
      }
}

export default new UserService();
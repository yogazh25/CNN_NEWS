/**
 * Authenticate a user. Save a token string in Local Storage
 * To provide some static functions:
 * @param {string} token
 * @param {string} email
 */

class Auth {
  static authenticateUser(token, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }
//check if a token is saved in Local Storage
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getEmail() {
    return localStorage.getItem('email');
  }
}

export default Auth;

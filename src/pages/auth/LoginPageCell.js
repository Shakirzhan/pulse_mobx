import React, { Component } from 'react';
import axios from 'axios';
import { observable } from 'mobx';
import LoginPage from './LoginPage';

const storeLogin = observable({
  username: '',
  password: '',

  change(name, value) {
    this[name] = value;
  },

  submit() {
    const post = axios.post(`http://localhost:4000/users/authenticate`,
      {
        "username": this.username,
        "password": this.password
      });
    return post.then(res => { if (res && res.data.token) { this.setCookie('token', res.data.token); } return res; });
  },

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=*";
  },

  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
});

class LoginPageCell extends Component {
  render() {
    return <LoginPage store={storeLogin} />;
  }
}

export default LoginPageCell;
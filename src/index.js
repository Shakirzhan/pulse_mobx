import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginPageCell from './pages/auth/LoginPageCell';

class App extends Component {
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  render() {
    const isAuthenticated = this.getCookie('token');
    
    return (
      <Router>
        <Switch>
          <Route path="/auth">
            <LoginPageCell />
          </Route>
          <Route exact path="/">
            <p>Load...</p>
          </Route>
        </Switch>
        {!isAuthenticated && <Redirect to={{ pathname: "/auth" }} />}
      </Router>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

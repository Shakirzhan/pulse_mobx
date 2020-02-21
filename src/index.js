import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const store = observable({
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
    return post.then(res => res);
  }
});

@observer
class Counter extends Component {
  onChange(name, value) {
    this.props.store.change(name, value);
  }

  onSubmit() {
    this.props.store.submit().then(res => {console.log(res)});
  }

  render() {
    const { store: {
      username,
      password
    } } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        <DevTools />
        <div className="level_1">
          <div className="level_2">
            <span className="child_1">Login</span>
            <div className="child_2">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={username}
                onChange={(e) => this.onChange(e.target.name, e.target.value)} />
            </div>
            <div className="child_2">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={password}
                type="password"
                onChange={(e) => this.onChange(e.target.name, e.target.value)} />
            </div>
            <div className="child_3">
              <Button variant="contained" onClick={() => this.onSubmit()}>Login</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={store} />, document.getElementById('root'));

serviceWorker.unregister();

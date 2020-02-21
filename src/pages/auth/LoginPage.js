import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DevTools from 'mobx-react-devtools';
import { withRouter } from 'react-router';

@observer
class LoginPage extends Component {
  onChange(name, value) {
    this.props.store.change(name, value);
  }

  onSubmit = async () => {
    const isSubmit = await this.props.store.submit();
    const isAuthenticated = await this.props.store.getCookie('token');
    if(!!isAuthenticated && !!isSubmit) {
      this.props.history.push('/');
    }
  }

  render() {
    const { store: {
      username,
      password
    } } = this.props;
    
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

export default withRouter(LoginPage);
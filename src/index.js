import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const nickName = observable({
  firstName: 'Yauhen',
  age: 30,

  get nickName() {
    console.log('Generate nickName!');
    return `${this.firstName}${this.age}`;
  },

  increment() {
    this.age++;
  },

  decrement() {
    this.age--;
  }
});

const todos = observable([{ text: 'Learn React' }, { text: 'Learn MobX' }]);

@observer
class Counter extends Component {
  handleIncrement = () => {
    this.props.store.increment();
  };
  handleDecrement = () => {
    this.props.store.decrement();
  };

  render() {
    return (
      <div className="App">
        <DevTools />
        <div class="level_1">
          <div class="level_2">
            <span class="child_1">Login</span>
            <div class="child_2">
              <TextField label="Username" variant="outlined" fullWidth name="username" />
            </div>
            <div class="child_2">
              <TextField label="Password" variant="outlined" fullWidth name="password" />
            </div>
            <div class="child_3">
              <Button variant="contained">Login</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={todos} />, document.getElementById('root'));

todos.push({ text: 'Learn Redux' });

serviceWorker.unregister();

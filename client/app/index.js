import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Editor from './components/Editor/Editor';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/editor" component={Editor}/>
        <Route exact path="/signup" component={Signup}/>
        {/* <Route component={NotFound}/> */}
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

import React, { Component } from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Onboard from './components/Onboard'
import App from './components/App'
import Dashboard from './components/dashboard'
import Create from './components/create'
import Adduser from './components/adduser'
import Chat from './components/chat'
export const routes = (
  <Route>
    <Route path="/" component={ Home } />
    <Route path="/login" component={ Login } />
    <Route path="/onboard" component={ Onboard } />
    <Route component={ App } >
      <Route path="/dashboard" component={ Dashboard } />
      <Route path="/create" component={ Create }/>
      <Route path="/adduser" component={Adduser}/>
      <Route path="/chat" component={Chat}/>
    </Route>
  </Route>
);
/*class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}*/
const Root = () => (
  <Router history={ browserHistory } routes={ routes } />
)

export default Root;

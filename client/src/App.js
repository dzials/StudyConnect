import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'
import Selection from './Selection/Selection'
import Calendar from './Calendar/Calendar'
import Login from './Login/Login'
import GroupSelection from './GroupSelection/GroupSelection'
import SCNavbar from './common/SCNavbar'
import './App.css';

export default class App extends Component {
  render() {
    return (
     //Create routing for StudyConnect webpage as it is an SPA and traditional url routing must be emulated
     <HashRouter>
        <div>
          <SCNavbar />
          <div>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/selection" component={Selection}/>
            <Route exact path="/calendar" component={Calendar}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/groupselection" component={GroupSelection}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

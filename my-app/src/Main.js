import React, { Component } from "react";

import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Home from "./Home";
  import Scheduling from "./Scheduling";
  import Calendar from "./Calendar";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <h1>StudyConnect (Alpha?)</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/scheduling">Scheduling</NavLink></li>
            <li><NavLink to="/calendar">Calendar</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/scheduling" component={Scheduling}/>
            <Route path="/calendar" component={Calendar}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;
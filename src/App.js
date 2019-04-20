import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Home from './Home/Home.js';
import SignupSuccess from './SignupSuccess/SignupSuccess.js'
import UserView from './UserView/UserView.js'
import UserSettings from './UserSettings/UserSettings.js'

import './App.css';

library.add(faArrowLeft)

class App extends Component {

  constructor(props) {
    super(props)
    
  }

  handleLogout() {
    localStorage.removeItem('jwtToken')
  }

  render() {

    return (

        <Router>
          <div className="app">
            <div className="portfolioBar">
              <div className="arrowContainer">
                <a href="https://jake-guss.herokuapp.com/portfolio"><FontAwesomeIcon icon="arrow-left" color="white" size="3x" /></a>
              </div>
            </div>
            <Route exact path="/" render={(props) => 
              <Home {...props} />
            }/>
            <Route path="/signupsuccess" component={SignupSuccess} />
            <Route exact path="/inner" render={(props) => 
              <UserView  handleLogout={this.handleLogout} {...props} />
            }/>
            <Route exact path="/inner/settings" render={(props) => 
              <UserSettings handleLogout={this.handleLogout} {...props} />
            }/>
          </div> 
        </Router>

    );
  }
}

export default App;

import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home/Home.js';
import UserView from './UserView/UserView.js'
import UserSettings from './UserSettings/UserSettings.js'
import SignupSuccess from './SignupSuccess/SignupSuccess.js'

//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
//import MyColorTheme from './MyColorTheme';

import './App.css';

library.add(faArrowLeft)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleLogout() {
    localStorage.removeItem('jwtToken')
  }

  render() {
    return (
      
      // <MuiThemeProvider theme={MyColorTheme}>
        <Router>          
          <div className="app">
            <div className="portfolioBar">
              <div className="arrowContainer">
                <a href="#"><FontAwesomeIcon icon="arrow-left" color="black" size="3x" /></a>
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
      // </MuiThemeProvider>
      

    );
  }
}

export default App;

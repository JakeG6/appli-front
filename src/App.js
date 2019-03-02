import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home/Home.js';
import UserView from './UserView/UserView.js'
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
    
  this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  


  componentDidMount() {
  }

  render() {
    return (
      
      // <MuiThemeProvider theme={MyColorTheme}>
        <Router>          
          <div className="App">
            <div className="portfolioBar">
              <div className="arrowContainer">
                <a href="#"><FontAwesomeIcon icon="arrow-left" color="black" size="3x" /></a>
              </div>
            </div>
            <Route exact path="/" render={(props) => 
              <Home authorizeUser={this.authorizeUser} setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser}  {...props} />
            }/>
            <Route path="/signupsuccess" component={SignupSuccess} />
            <Route exact path="/inner" render={(props) => 
              <UserView currentUser={this.state.currentUser} currentUserId={this.state.currentUserId} handleLogout={this.handleLogout} {...props} />
            }/>
          </div>        
        </Router>
      // </MuiThemeProvider>
      

    );
  }
}

export default App;

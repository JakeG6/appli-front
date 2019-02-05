import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home/Home.js';
import UserView from './UserView/UserView.js'
import SignupSuccess from './SignupSuccess/SignupSuccess.js'
import './App.css';

library.add(faArrowLeft)


class App extends Component {

  constructor(props) {

    super(props)
    this.state = {
      authorized: false,
      currentUser: '',
      currentUserId: 0
    }
    
    this.authorizeUser = this.authorizeUser.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
    this.rememberAuthorization = this.rememberAuthorization.bind(this);  
    this.setCurrentUser = this.setCurrentUser.bind(this)
  
  }

  

  rememberAuthorization() {
    
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty("authorized")) {
      // get the key's value from localStorage
      let value = localStorage.getItem("authorized");

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        this.setState({ authorized: value });
      } catch (e) {
        // handle empty string
        this.setState({ authorized: value });
      }
    }
  
  }

  setCurrentUser(user) {
    this.setState({currentUser: user.data.username, currentUserId: user.data.user_id}, () => {
      //console.log(`the current user is ${this.state.currentUser}. the user id is ${this.state.currentUserId}`)
      localStorage.setItem("authorized", "true")
      localStorage.setItem("currentUser", this.state.currentUser)
      localStorage.setItem("currentUserId", this.state.currentUserId.toString())
    })
  }

  authorizeUser() {
      console.log(this.state.authorized)
      this.setState({ authorized: true, attemptMessage:'' }, () =>  {
        //console.log(this.state.authorized)
        localStorage.setItem("authorized", "true")

      })
  }

  handleLogout() {
      localStorage.setItem("authorized", "false")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("currentUserId")
  }

  componentDidMount() {
    this.rememberAuthorization();
  }

  render() {
    return (
      
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
    );
  }
}

export default App;

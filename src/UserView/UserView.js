import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';


class UserView extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    
    let loggedIn = localStorage.getItem("authorized");

    if (loggedIn === "true") {
      return (
        <div className="App">
          <h1>Hello {this.props.currentUser}. You are logged into the user view.</h1>
          <h1>Your user id is {this.props.currentUserId}</h1>
          <Button variant="contained" color="primary" className="white-text" onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
       </div>
      );
    }

    else { return (<Redirect to="/" />) }

  }
}

export default UserView;
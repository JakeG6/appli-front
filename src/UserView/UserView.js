import React, { Component } from 'react';
import NewTrackerDialog from './NewTrackerDialog.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import lightGreen from '@material-ui/core/colors/lightGreen';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



class UserView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false

    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClickOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }


  render() {
    const primary = lightGreen.A400;
    
    let loggedIn = localStorage.getItem("authorized")
    let currentUser = localStorage.getItem("currentUser")
    let currentUserId = localStorage.getItem("currentUserId")
    if (loggedIn === "true") {
      return (
        <div className="App">
        <AppBar position="static">
          <Toolbar  color={primary}>
          <Button className="white-text" onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>

          <p>Hello {currentUser}. You are logged into the user view.</p>
          <p>Your user id is {currentUserId}.</p>
          </Toolbar>
        </AppBar>         
        <p>This is where your tickets will go.</p>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <NewTrackerDialog />
        </Dialog>
        <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
       </div>
      );
    }

    else { 
      return (<Redirect to="/" />) }

  }
}

export default UserView;
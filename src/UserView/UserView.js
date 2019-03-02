import React, { Component } from 'react';
import NewTrackerDialog from './NewTrackerDialog.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



class UserView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currentUser: this.props.currentUser
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

  componentDidMount() {
    //
    //console.log(this.state.currentUser)
  }

  // rememberAuthorization() {
    
  //   // if the key exists in localStorage
  //   if (localStorage.hasOwnProperty("authorized")) {
  //     // get the key's value from localStorage
  //     let value = localStorage.getItem("authorized");

  //     // parse the localStorage string and setState
  //     try {
  //       value = JSON.parse(value);
  //       this.setState({ authorized: value });
  //     } catch (e) {
  //       // handle empty string
  //       this.setState({ authorized: value });
  //     }
  //   }
  
  // }


  render() {
    const primary = lightGreen.A400;
      return (
        <div className="App">
        <AppBar position="static">
          <Toolbar  color={primary}>
          <Button className="white-text" onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
          <p>Hello FILL IN THE NAME. You are logged into the user view.</p>
          <p>Your user id is FILL IN THE ID.</p>
          </Toolbar>
        </AppBar>         
        <p>This is where your tickets will go.</p>
        <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
          <NewTrackerDialog  cancel={this.handleClose} />
        </Dialog>
        <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
       </div>
      );
    
    //else { 
    //  return (<Redirect to="/" />) }
  }
}

export default UserView;
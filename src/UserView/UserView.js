import React, { Component } from 'react';
import NewTrackerDialog from './NewTrackerDialog.js';
import TicketDialog from './TicketDialog.js';
import Ticket from './Ticket.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import lightGreen from '@material-ui/core/colors/lightGreen';
import jwt_decode from 'jwt-decode';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

class UserView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openTicket: false,
      currentUsername: '',
      userTickets: [],
      ticketDetails: ''
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleTicketOpen = this.handleTicketOpen.bind(this)

    this.handleClose = this.handleClose.bind(this)
    this.handleTicketClose = this.handleTicketClose.bind(this)

  }

  handleClickOpen() {
    this.setState({open: true})
  }

  handleTicketOpen(ticket) {
    this.setState({ticketDetails: ticket, openTicket: true}, () => {
      console.log(this.state.ticketDetails)
    })
  }

  handleClose() {
    this.setState({open: false})
  }
  handleTicketClose() {
    this.setState({openTicket: false})
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      let decoded = jwt_decode(localStorage.getItem('jwtToken'))
      console.log(decoded)
      this.setState({currentUsername: decoded.name})
      axios.get('/retrievetickets', {headers: { "Authorization": "Bearer " + localStorage.getItem('jwtToken') }}).then((tickets)=>{
        console.log('data coming', tickets);
        this.setState({userTickets: tickets.data})
        //dispatch(getUsersData(data));
      }).catch((error)=>{
        console.log('error ', error);
        this.props.history.push('/')
      });
    }
    else {
      this.props.history.push('/')
    }
    
  }


  render() {

    const primary = lightGreen.A400;
    const fabStyle = {
      color: 'white',
      backgroundColor: '#36c136'
    }
       
    //decode the jwt's payload.
    let decoded = jwt_decode(localStorage.getItem('jwtToken'))
    //get the current time
    let currentTime = Math.floor(Date.now() / 1000)

    //if the current time on rendering is earlier than the expiration date, show the page.
    if (currentTime < decoded.exp || localStorage.getItem('jwtToken') === false) { 
      return (
        <div className="App">
          <AppBar position="static" >
            <Toolbar color={primary} className="green">
              <Button className="white-text" onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
              <p>Hello {this.state.currentUsername}</p>           
            </Toolbar>
          </AppBar>    

          <div style={{ padding: 8 }}>
            {(this.state.userTickets) ?
              <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                {this.state.userTickets.map((ticket, index) =>

                  <Grid className="ticket" key={index.toString()} item xs={6} sm={3} md={2} onClick={()=>this.handleTicketOpen(ticket)}>
                    <Ticket  ticket={ticket}  />
                  </Grid>  
                )}
              </Grid>
              :
              <p> You haven't made any job tickets yet.</p>
            }
          </div>

          {/* new ticket Form */}
          <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
            <NewTrackerDialog currentUsername={'yes'} cancel={this.handleClose} />
          </Dialog>

          {/* view ticket details */}
          <Dialog open={this.state.openTicket} onClose={this.handleTicketClose} >
            <TicketDialog close={this.handleTicketClose} ticket={this.state.ticketDetails} />
          </Dialog>

          <Fab onClick={this.handleClickOpen} style={fabStyle} >
            <AddIcon className={'green'}/>
          </Fab>
       </div>
      );
    }
    //otherwise, send the user to the login page.
    else { 
      return (<Redirect to="/" />) 
    }

  }
}

export default UserView;
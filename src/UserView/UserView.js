import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import NewTrackerDialog from './NewTrackerDialog.js';
import TicketDialog from './TicketDialog/TicketDialog.js';
import Ticket from './Ticket.js';
import lightGreen from '@material-ui/core/colors/lightGreen';

import Switch from '@material-ui/core/Switch';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
      showArchived: false,
      currentUsername: '',
      userTickets: [],
      activeTicket: -1,
      ticketDetails: ''
    }

    //this.addMostUpdatedTicket = this.addMostUpdatedTicket.bind(this)
    this.retrieveTickets = this.retrieveTickets.bind(this)

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleTicketOpen = this.handleTicketOpen.bind(this)

    this.handleClose = this.handleClose.bind(this)
    this.handleTicketClose = this.handleTicketClose.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.getUpdatedTicketDetails = this.getUpdatedTicketDetails.bind(this)
  }



  handleClickOpen() {
    this.setState({open: true})
  }

  handleTicketOpen(ticket, index) {
    this.setState({ticketDetails: ticket, activeTicket: index, openTicket: true}, () => {
    })
  }

  handleClose() {
    this.setState({open: false})
  }

  handleTicketClose() {
    this.setState({openTicket: false})
  }

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      console.log(this.state.showArchived)
      this.retrieveTickets();
    });
  };

  retrieveTickets = () => {

    let apiEndpoint = ''
    this.state.showArchived ? apiEndpoint = '/retrievetickets/showarchived' : apiEndpoint = '/retrievetickets/notarchived'
  
    return axios.get(apiEndpoint, {headers: { "Authorization": "Bearer " + localStorage.getItem('jwtToken') }}).then((tickets)=>{
      //console.log(tickets.data)
      let unsortedTickets = []

      // tickets.data.forEach(ticket => {
      //   if (!ticket.archived)
      // });
      
      let ticketsNewestToOldest = tickets.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      console.log(ticketsNewestToOldest)

      this.setState({userTickets: ticketsNewestToOldest})
      //dispatch(getUsersData(data));
    }).catch((error)=>{
      console.log('error ', error);
      localStorage.removeItem('jwtToken')
      this.props.history.push('/')
    });
  }

  ///get updated ticket details immediately after updating the db and retrieving tickets (aaaaaargh!)
  getUpdatedTicketDetails = () => {
    return this.setState({ticketDetails: this.state.userTickets[this.state.activeTicket]  })
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      let decoded = jwt_decode(localStorage.getItem('jwtToken'))
      this.setState({currentUsername: decoded.name})
      this.retrieveTickets()    
    }
    else {
      localStorage.removeItem('jwtToken')
      this.props.history.push('/')
    }
    
  }

  render() {

    const primary = lightGreen.A400;
    const fabStyle = {
      color: 'white',
      backgroundColor: 'rgb(54, 193, 54)',
      position: 'fixed',
      display: 'block',
      bottom: '20px',
      right: '20px'
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
              <FormControlLabel control={
                <Switch checked={this.state.showArchived} onChange={this.handleSwitch('showArchived')} value="showArchived" />                   
              }
              label="Show Archived Tickets"
              />
              <h1 className="green userview-logo">APPLi</h1>         
            </Toolbar>
          </AppBar>   

          <div className="ticket-tray" style={{ padding: 8 }}>
            {(this.state.userTickets.length > 1) ?
              <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                {this.state.userTickets.map((ticket, index) =>

                  <Grid  key={index.toString()} item xs={6} sm={3} md={2} onClick={()=>this.handleTicketOpen(ticket, index)}>
                    <Ticket ticket={ticket}  />
                  </Grid>  
                )}
              </Grid>
              :
              <p> You haven't made any job tickets yet.</p>
            }
            <Fab  onClick={this.handleClickOpen} style={fabStyle} >
              <AddIcon className={'green'}/>
            </Fab>
          </div>

          {/* new ticket Form */}
          <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
            <NewTrackerDialog currentUsername={'yes'} cancel={this.handleClose} 
            handleClose={this.handleClose} retrieveTickets={this.retrieveTickets}/>
          </Dialog>

          {/* view ticket details */}
          <Dialog open={this.state.openTicket} onClose={this.handleTicketClose} >
            <TicketDialog close={this.handleTicketClose} handleTicketClose={this.handleTicketClose}
              ticket={this.state.ticketDetails} retrieveTickets={this.retrieveTickets}
              getUpdatedTicketDetails = {this.getUpdatedTicketDetails}  />
          </Dialog>

          
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
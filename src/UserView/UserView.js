import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import UserAppBar from './UserAppBar.js'
import LoadingSpinner from './LoadingSpinner.js'
import NewTrackerDialog from './NewTrackerDialog.js';
import Ticket from './Ticket.js';
import TicketDialog from './TicketDialog/TicketDialog.js';


import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

class UserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTicket: -1,
      currentUsername: '',
      sortOrder: 'newToOld',
      loading: false,
      open: false,
      openTicket: false,     
      showArchived: false,
      ticketDetails: '',
      userTickets: []
  
    }
    //this.sortMenuClose = this.sortMenuClose.bind(this)
    //this.sortMenuOpen = this.sortMenuOpen.bind(this)
    this.changeSortOrder = this.changeSortOrder.bind(this)
    this.retrieveTickets = this.retrieveTickets.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleTicketOpen = this.handleTicketOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleTicketClose = this.handleTicketClose.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.getUpdatedTicketDetails = this.getUpdatedTicketDetails.bind(this)
  }

  changeSortOrder = newSortOrder => {
    this.setState({sortOrder: newSortOrder}, () => {
      this.retrieveTickets()
    })
  }

  handleClickOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleTicketOpen(ticket, index) {
    this.setState({ticketDetails: ticket, activeTicket: index, openTicket: true}, () => {
      console.log(this.state.activeTicket)
    })
  }

  handleTicketClose() {
    this.setState({openTicket: false})
  }

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      
      this.retrieveTickets();
    });
  };

  retrieveTickets = () => {
    this.setState({loading: true}, () => {
      let apiEndpoint = ''     
      this.state.showArchived ? apiEndpoint = '/retrievetickets/showarchived' 
        : apiEndpoint = '/retrievetickets/notarchived'
        axios.get(apiEndpoint, {headers: { "Authorization": "Bearer " + localStorage.getItem('jwtToken') }})
        .then((tickets)=>{
          let ticketOrder = []

          this.state.sortOrder === 'newToOld' ?
            //sort tickets from newest to oldest
            ticketOrder = tickets.data.sort((a, b) => {
              return new Date(b.creation_date) - new Date(a.creation_date)
            })
          :
            //sort tickets oldest to newest
            ticketOrder = tickets.data.sort((a, b) => {
              return new Date(a.creation_date) - new Date(b.creation_date)
            })
          
        this.setState({loading: false, userTickets: ticketOrder}, () => {
          //console.log('userview reloaded')
        })
        this.getUpdatedTicketDetails()
      }).catch((error)=>{
        console.log('error ', error);
        localStorage.removeItem('jwtToken')
        this.props.history.push('/')
      });
    })
  }

  ///get updated ticket details immediately after updating the db and retrieving tickets (aaaaaargh!)
  getUpdatedTicketDetails = () => {
    return this.setState({ticketDetails: this.state.userTickets[this.state.activeTicket]}, () => {
      //console.log(this.state.ticketDetails)
     })
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

    
    const styles = {
      fabStyle: {
        color: 'white',
        
        position: 'fixed',
        display: 'block',
        bottom: '20px',
        right: '20px'
      },
      username: {
        marginLeft: '1em'
      },
      grow: {
        flexGrow: 1
      },
      grow2: {
        flexGrow: 2
      },
      displayOption:{
        marginLeft: '1em',
        marginRight: '1em'
      }
    }
       
    //decode the jwt's payload.
    let decoded = jwt_decode(localStorage.getItem('jwtToken'))
    //get the current time
    let currentTime = Math.floor(Date.now() / 1000)

    //if the current time on rendering is earlier than the expiration date, show the page.
    if (currentTime < decoded.exp || localStorage.getItem('jwtToken') === false) {       
      
      return (
        <div className="App">   
          <UserAppBar
            changeSortOrder={this.changeSortOrder}
            handleLogout={this.props.handleLogout}
            currentUsername={this.state.currentUsername}
            retrieveTickets={this.retrieveTickets}
            showArchived={this.state.showArchived}
            sortOrder={this.state.sortOrder}
            handleSwitch={this.handleSwitch}  
          /> 
          <div className="ticket-tray" style={{ padding: 8 }}>
            {
              this.state.loading ? LoadingSpinner()
              :             
              (this.state.userTickets.length > 1) ?
              <Fade in={this.state.userTickets}>
                <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                  {this.state.userTickets.map((ticket, index) =>
                    <Grid  key={index.toString()} item xs={6} sm={3} md={2} onClick={()=>this.handleTicketOpen(ticket, index)}>
                      <Ticket ticket={ticket}  />
                    </Grid>  
                  )}
                </Grid>
              </Fade>
              :
              <Fade in={this.state.userTickets}>
              <p> You haven't made any job tickets yet.</p>
              </Fade>
            }
            <Fab color="primary" onClick={this.handleClickOpen} style={styles.fabStyle} >
              <AddIcon  />
            </Fab>
          </div>

          {/* new ticket Form */}
          <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
            <NewTrackerDialog currentUsername={'yes'} cancel={this.handleClose} 
            handleClose={this.handleClose} retrieveTickets={this.retrieveTickets}
            />
          </Dialog>

          {/* view ticket details */}
          <Dialog open={this.state.openTicket} onClose={this.handleTicketClose} >
            <TicketDialog close={this.handleTicketClose} handleTicketClose={this.handleTicketClose}
              ticket={this.state.ticketDetails} retrieveTickets={this.retrieveTickets}
              getUpdatedTicketDetails = {this.getUpdatedTicketDetails} showArchived={this.state.showArchived} />
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
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


import LoadingSpinner from './LoadingSpinner.js'
import NewTrackerDialog from './NewTrackerDialog.js';
import Ticket from './Ticket.js';
import TicketDialog from './TicketDialog/TicketDialog.js';


import lightGreen from '@material-ui/core/colors/lightGreen';


import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';



class UserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTicket: -1,
      anchorEl: null,
      currentUsername: '',
      sortOrder: 'newToOld',
      loading: false,
      open: false,
      openTicket: false,     
      showArchived: false,
      sortMenu: false,
      ticketDetails: '',
      userTickets: []
  
    }
    this.sortMenuClose = this.sortMenuClose.bind(this)
    this.sortMenuOpen = this.sortMenuOpen.bind(this)
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

  handleClose() {
    this.setState({open: false})
  }

  sortMenuClose(sortOrder) {
  
    if (sortOrder === 'newToOld' || sortOrder === 'oldToNew') {
      sortOrder === this.state.sortOrder ? this.setState({anchorEl: null})
      :
    this.setState({anchorEl: null, sortOrder: sortOrder}, () => {
      this.retrieveTickets()
      })
    }
    else { 
      this.setState({anchorEl: null})
    }
    
  }

  sortMenuOpen = (event) => {
    this.setState({anchorEl: event.currentTarget})
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
          console.log('userview reloaded')
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
      console.log(this.state.ticketDetails)
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

    const primary = lightGreen.A400;
    const styles = {
      fabStyle: {
        color: 'white',
        backgroundColor: 'rgb(54, 193, 54)',
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
    
    const { anchorEl } = this.state;
          
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
              <Button  onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
              <p style={styles.username}>Hello {this.state.currentUsername}</p>
              <div style={styles.grow}/>     
              <FormControlLabel control={
                <Switch checked={this.state.showArchived} onChange={this.handleSwitch('showArchived')} value="showArchived" />                   
              }
              labelPlacement="start"
              label="Show Archived Tickets"
              style={styles.displayOption}
              />
              
              <Button
                style={styles.displayOption}
                                
                aria-owns={anchorEl ? "sort-form" : null}
                aria-haspopup="true"
                onClick={this.sortMenuOpen}
              >
                Sort By
              </Button>
              <Menu 
                id="sort-form" 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.sortMenuClose}
              >
                <MenuItem >Sort By</MenuItem>
                <MenuItem onClick={() => this.sortMenuClose("newToOld")}>Newest to Oldest</MenuItem>
                <MenuItem onClick={() => this.sortMenuClose("oldToNew")}>Oldest to Newest</MenuItem>                               
              </Menu>             
              <div style={styles.grow}/>             
              <h1 className="green userview-logo">APPLi</h1>         
            </Toolbar>
          </AppBar>   
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
            <Fab  onClick={this.handleClickOpen} style={styles.fabStyle} >
              <AddIcon className={'green'}/>
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
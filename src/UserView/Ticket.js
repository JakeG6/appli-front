import React, { Component } from 'react';
import  "./applicationProgress";

//import { withStyles } from '@material-ui/core/styles';

import NewTrackerDialog from './NewTrackerDialog.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import lightGreen from '@material-ui/core/colors/lightGreen';
import jwt_decode from 'jwt-decode';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'


import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import { applicationProgress } from './applicationProgress.js';

library.add(faHandshake, faCopy, faTimes, faDoorOpen, faPhone, faDoorClosed)


class Ticket extends Component {

    constructor(props) {
      super(props)
      this.state = {
        //open: false,
      }
  
      //this.handleClickOpen = this.handleClickOpen.bind(this)
      //this.handleClose = this.handleClose.bind(this)
      
    }

    render() {
      const styles = {
          //maxWidth: '300px',
          height: '300px'
          
          
      }

      return (
        <Card style={styles}>
          <CardHeader
            title={this.props.ticket.company}
            subheader={this.props.ticket.position}
          />
          <CardContent>

            {applicationProgress(this.props.ticket)}
            {/* <FontAwesomeIcon icon="handshake" color="black" size="7x" />
            <p>JOB ACCEPTED!</p>          */}
          </CardContent>
        </Card>
      )
    }
}

export default Ticket;

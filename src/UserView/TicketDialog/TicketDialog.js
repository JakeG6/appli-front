import React, { Component } from 'react'
import TicketDetails from './TicketDetails'
import EditTicket from './EditTicket'
import axios from 'axios'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';

import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Clear';

import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';



class TicketDialog extends Component {

    constructor(props) {
      super(props)
      this.state = {

        showEditForm: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSwitch = this.handleSwitch.bind(this)
      this.toggleEditDisplay = this.toggleEditDisplay.bind(this)
    }

    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    handleSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    toggleEditDisplay() {
        this.state.showEditForm ? this.setState({showEditForm: false}) : this.setState({showEditForm: true})

    }

    render() {
      
        return (
            <div className="App" style={{ padding: 12 }}>

                {!this.state.showEditForm ?
                <TicketDetails ticket={this.props.ticket} toggleEditDisplay={this.toggleEditDisplay} 
                retrieveTickets={this.props.retrieveTickets} handleTicketClose={this.props.handleTicketClose}/>
                :
                <EditTicket ticket={this.props.ticket} toggleEditDisplay={this.toggleEditDisplay} 
                retrieveTickets={this.props.retrieveTickets}/>
                }                                      
            </div>
        );
    }
}
  
export default TicketDialog;
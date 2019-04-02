import React, { Component } from 'react';
import { applicationProgress } from  "../applicationProgress";

import axios from 'axios';

//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';

import Dialog from '@material-ui/core/Dialog';
//import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DeleteIcon from '@material-ui/icons/Delete';

// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import CloseIcon from '@material-ui/icons/Clear';

import Grid from '@material-ui/core/Grid';
//import FormControl from '@material-ui/core/FormControl';
//import Switch from '@material-ui/core/Switch';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(faCopy, faTimes)


class TicketDetails extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            showDeleteWarning: false
        }
        this.handleWarningDisplay = this.handleWarningDisplay.bind(this)
        this.deleteTicket = this.deleteTicket.bind(this)
    }

    handleWarningDisplay = () => {
        (this.state.showDeleteWarning) ? 
        this.setState({showDeleteWarning: false}) : this.setState({showDeleteWarning: true})
    }

    deleteTicket = () => {
        axios.delete(`/deleteticket/${this.props.ticket.ticket_id}`, {headers: { "Authorization": "Bearer " + localStorage.getItem('jwtToken') }})
            .then(response => {
                return this.props.retrieveTickets()

            })
            .then(response => {
                this.props.handleTicketClose()
            })
            .catch(error => {
                console.log(error);
                
            }
        );
    }

    render() {

        const linkStyle = {
            color: 'blue'
        }
        
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <h3>Company</h3>
                        <p>{this.props.ticket.company}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Position</h3>
                        <p>{this.props.ticket.position}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Resume Used</h3>
                        {this.props.ticket.resume_link ?
                            <div>
                                <a href={this.props.ticket.resume_link} style={linkStyle}>Link</a>
                            </div>
                        :
                            <div>
                                <p>You didn't provide a link to your resume.</p>
                            </div>
                        }                      
                        
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Status</h2>
                        {applicationProgress(this.props.ticket)}
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Cover Letter</h2>
                        {this.props.ticket.includes_cover_letter  ?
                            <div>
                                <FontAwesomeIcon icon="copy" color="black" size="7x" />
                                <h3>Yes</h3>
                            </div>
                            :
                            <div>
                                <FontAwesomeIcon icon="times" color="red" size="7x" />
                                <h3>No</h3>
                            </div>
                        }                       
                    </Grid>
                    <Grid item xs={12}>
                        <p>{(this.props.ticket.application_notes) ? this.props.ticket.application_notes :
                        "You didn't provide any notes."}</p>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.toggleEditDisplay}>
                        Edit 
                        <BuildIcon  />
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.handleWarningDisplay}>
                        Delete 
                        <DeleteIcon />
                    </Button>  
                </DialogActions>
                <Dialog
                open={this.state.showDeleteWarning}
                onClose={this.handleWarningDisplay}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this application ticket?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleWarningDisplay} color='primary'>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.deleteTicket}>
                            Yes 
                        </Button>
                    </DialogActions>
                </Dialog> 
            </div>
        )
    }
}

export default TicketDetails
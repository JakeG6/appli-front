import React, { Component } from 'react';
import axios from 'axios';

import { applicationProgress } from  "../applicationProgress";

import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DeleteIcon from '@material-ui/icons/Delete';

import Grid from '@material-ui/core/Grid';

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
        axios.delete(`https://appli-api.herokuapp.com/deleteticket/${this.props.ticket.ticket_id}`, {headers: { "Authorization": "Bearer " + localStorage.getItem('jwtToken') }})
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
        const brandGreen = '#36c136'
        const styles ={
            buttonIcon: {
                marginLeft: '.5em'
            },
            dangerRed: {
                backgroundColor: 'red',
                color: 'white'
            },
           
        }
        
        return (
            <div>
                <DialogTitle>Ticket Details</DialogTitle>
                <Grid container spacing={24} align="center">
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
                                <a href={this.props.ticket.resume_link} style={linkStyle}>LINK</a>
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
                                <FontAwesomeIcon icon="copy" color={brandGreen} size="7x" />
                                <p>Yes</p>
                            </div>
                            :
                            <div>
                                <FontAwesomeIcon icon="times" color="red" size="7x" />
                                <p>No</p>
                            </div>
                        }                       
                    </Grid>
                    <Grid item xs={12}>
                        <p>{(this.props.ticket.application_notes) ? this.props.ticket.application_notes :
                        "You didn't provide any notes."}</p>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.props.toggleEditDisplay}>
                        Edit 
                        <BuildIcon  style={styles.buttonIcon}/>
                    </Button>
                    <Button variant="contained" style={styles.dangerRed} onClick={this.handleWarningDisplay}>
                        Delete 
                        <DeleteIcon  style={styles.buttonIcon}/>
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
                        <Button variant="contained" color='secondary' onClick={this.handleWarningDisplay} >
                            Cancel
                        </Button>
                        <Button variant="contained" style={styles.dangerRed} onClick={this.deleteTicket}>
                            Delete 
                        </Button>
                    </DialogActions>
                </Dialog> 
            </div>
        )
    }
}

export default TicketDetails
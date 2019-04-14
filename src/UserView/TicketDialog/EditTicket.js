import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import DialogActions from '@material-ui/core/DialogActions';


import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class EditTicket extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ticketId: this.props.ticket.ticket_id,
            companyName: this.props.ticket.company,
            position: this.props.ticket.position,
            resumeLink: this.props.ticket.resume_link,
            includesCoverLetter: this.props.ticket.includes_cover_letter,
            applicationNotes: this.props.ticket.application_notes,
            calledForInterview: this.props.ticket.called_for_interview,
            jobOffered: this.props.ticket.job_offered,
            acceptedOffer: this.props.ticket.accepted_offer,
            archived: this.props.ticket.archived,

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.updateTicket = this.updateTicket.bind(this)
    }

    handleChange = prop => event => {
        
        this.setState({ [prop]: event.target.value });
        
    }

    handleSwitch = name => event => {
        if (name === 'jobOffered') {
            this.setState({acceptedOffer: false})
          }
        this.setState({ [name]: event.target.checked }, () => {
            console.log('this.state.archived: ', this.state.archived)
        });
    }

    updateTicket = async (event) => {
        event.preventDefault();
        await axios({
            method: 'put',
            url: `http://localhost:4242/updateticket/${this.state.ticketId}`,
            data: {
                ticketId: this.state.ticketId,
                companyName: this.state.companyName,
                position: this.state.position,
                resumeLink: this.state.resumeLink,
                includesCoverLetter: this.state.includesCoverLetter,
                applicationNotes: this.state.applicationNotes,
                calledForInterview: this.state.calledForInterview,
                jobOffered: this.state.jobOffered,
                acceptedOffer: this.state.acceptedOffer,
                archived: this.state.archived
            },
            headers: {                
                "Authorization": "Bearer " + localStorage.getItem('jwtToken')                 
            }            
        })
            
        .then(async response => {
            console.log('retrieving tickets')
            await this.props.retrieveTickets()
        })
        .then(response => {
            console.log('getting updated ticketdetails')
            // return this.props.getUpdatedTicketDetails()
        })
        .catch(error => {
            console.log(error)
        });
        
        this.props.handleTicketClose()
    }

    render() {

        return (
            <div>
                <DialogTitle id="form-dialog-title">Edit Ticket</DialogTitle>
                <form onSubmit={this.updateTicket}>
                    <Grid container spacing={24} align="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Company"
                                value={this.state.companyName}
                                placeholder="The Company Name"
                                onChange={this.handleChange('companyName')}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Position"
                                value={this.state.position}
                                placeholder="The Job Title"
                                onChange={this.handleChange('position')}
                                margin="normal"
                                variant="filled"
                            />                    
                        </Grid>                   
                        <Grid container spacing={0} >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Resume"
                                    value={this.state.resumeLink}
                                    placeholder="A Link to Your Resume"
                                    onChange={this.handleChange('resumeLink')}
                                    variant="filled"
                                />     
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.includesCoverLetter}
                                        onChange={this.handleSwitch('includesCoverLetter')}
                                        value="includesCoverLetter"
                                        color="primary"
                                    />
                                    }
                                    label="Includes a Cover Letter?"
                                    labelPlacement="start"
                                />
                            </Grid>
                              
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="filled-textarea"
                                value={this.state.applicationNotes}
                                onChange={this.handleChange('applicationNotes')}
                                label="Notes"
                                placeholder="Other Important Details"
                                multiline
                                variant="filled"
                                
                            />
                        </Grid>
                        <Grid item xs={12}>                       
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.calledForInterview}
                                    onChange={this.handleSwitch('calledForInterview')}
                                    value="calledForInterview"
                                    color="primary"
                                />
                                }
                                label="Have They Requested an Interview?"
                                labelPlacement="start"
                            />
                        </Grid>
                        {this.state.calledForInterview ?
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.jobOffered}
                                        onChange={this.handleSwitch('jobOffered')}
                                        value="jobOffered"
                                        color="primary"
                                    />
                                    }
                                    label="Have I Been Offered the Position?"
                                    labelPlacement="start"
                                />
                            </Grid>
                        : null }         
                        {this.state.jobOffered && this.state.calledForInterview ?
                            <Grid item xs={12}>
                                <FormControlLabel
                                control={
                                    <Switch
                                    checked={this.state.acceptedOffer}
                                    onChange={this.handleSwitch('acceptedOffer')}
                                    value="acceptedOffer"
                                    color="primary"
                                    />
                                }
                                label="Have I Accepted the Position?"
                                labelPlacement="start"
                                />
                            </Grid>
                        : null}
                        <Grid item xs={12}>
                            <Grid container spacing = {24}>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.archived}
                                        onChange={this.handleSwitch('archived')}
                                        value="archived"
                                        color="primary"
                                    />
                                    }
                                    label="Archive this ticket?"
                                    labelPlacement="start"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DialogActions>
                                        <Button variant="contained" onClick={this.props.toggleEditDisplay}>
                                            Cancel
                                        </Button>                               
                                        <Button variant="contained" color="primary" label="submit" type="Submit">
                                            Save 
                                        </Button>
                                    </DialogActions>
                                </Grid>
                            </Grid>                                                       
                        </Grid>
                    </Grid>                               
                </form>
             </div>
        )
    }

}

export default EditTicket
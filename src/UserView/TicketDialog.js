import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Clear';

import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(faHandshake, faCopy, faTimes, faDoorOpen, faPhone, faDoorClosed)

class TicketDialog extends Component {

    constructor(props) {
      super(props)
      this.state = {
        userId: this.props.currentUserId,
        companyName: '',
        positionTitle: '',
        resumeLink: '',
        includesCoverLetter: false,
        applicationNotes: '',
        calledForInterview: false,
        jobOffered: false,
        acceptedOffer: false,
        
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSwitch = this.handleSwitch.bind(this)
      this.postTicket = this.postTicket.bind(this)
    }

    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    handleSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    postTicket = event => {
      event.preventDefault();

      axios({
        method: 'post',
        url: 'http://localhost:4242/createticket',
        data: {
          userId: this.state.userId,
          company: this.state.companyName,
          position: this.state.position,
          resumeLink: this.state.resumeLink,
          includesCoverLetter: this.state.includesCoverLetter,
          applicationNotes: this.state.applicationNotes,
          calledForInterview: this.state.calledForInterview,
          jobOffered: this.state.jobOffered,
          acceptedOffer: this.state.acceptedOffer,
        }
      }).then(function (response) {
        console.log("the call worked. it's working")
        console.log(response);
      })
      .catch(function (error) {
        console.log("it's not working")
        console.log(error);
      });
    }



    render() {

        const linkStyle = {
            color: 'blue'
        }

        let applicationProgress = () => {
            if (this.props.ticket.accepted_offer) {
                return (
                    <div>
                        <FontAwesomeIcon icon="handshake" color="black" size="7x" />
                        <h3>Offer Accepted</h3>
                    </div>
                )
            }
            else if (this.props.ticket.job_offered) {
                return(
                    <div>
                        <FontAwesomeIcon icon="door-open" color="black" size="7x" />
                        <h3>Position Offered</h3>
                    </div>
                )
            }
            else if (this.props.ticket.called_for_interview) {
                return(
                    <div>
                        <FontAwesomeIcon icon="phone" color="black" size="7x" />
                        <h3>Called for Interview</h3>
                    </div>
                ) 
            }
            else {
                return(
                    <div>
                        <FontAwesomeIcon icon="door-closed" color="black" size="7x" />
                        <h3>Awaiting Employer Response</h3>
                    </div>
                )
            }
        }
      
        return (
            <div className="App" style={{ padding: 12 }}>
            <Grid container spacing={24}>
                <Grid item xs={10}>
                    <h2 id="form-dialog-title">Ticket Details</h2>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="Close" onClick={this.props.close}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
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
                    <a href={this.props.ticket.resume_link} style={linkStyle}>Link</a>
                </Grid>
                <Grid item xs={6}>
                    <h2>Status</h2>
                    {applicationProgress()}
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
                    <p>{this.props.ticket.application_notes}</p>
                </Grid>
                <Grid item xs={12}>
                    
                        {/* <FormControlLabel
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
                        /> */}
                </Grid>
        
                {/* {this.state.calledForInterview ?
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
                : null} */}
                
            
                <Grid item xs={12}>
                    <Grid container spacing={8} justify="center">
                    <Grid item xs={3} >
                        
                    </Grid>
                    <Grid item xs={3} >
                        
                    </Grid>
                    </Grid>
                </Grid>

            </Grid>            
            
        </div>
        );
    }
  }
  
  export default TicketDialog;
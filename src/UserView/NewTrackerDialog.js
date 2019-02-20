import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

import Switch from '@material-ui/core/Switch';


class NewTrackerDialog extends Component {

    constructor(props) {
      super(props)
      this.state = {
        companyName: '',
        positionTitle: '',
        resumeLink: '',
        includesCoverLetter: false,
        applicationNotes: '',
        calledForInterview: false,
        jobOffered: false,
        acceptedOffer: false,
        archived: false
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

    postTicket = () => {
      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          userId: null,
          company: this.state.companyName,
          position: this.state.position,
          resumeLink: this.state.resumeLink,
          includesCoverLetter: this.state.includesCoverLetter,
          applicationNotes: this.state.applicationNotes,
          calledForInterview: this.state.calledForInterview,
          jobOffered: this.state.jobOffered,
          acceptedOffer: this.state.acceptedOffer,
          timeStamp: new Date.now(),
          archived: this.state.archived
        }
      });
    }

    render() {
      
        return (
          <div className="App" style={{ padding: 12 }}>
            <DialogTitle id="form-dialog-title">Create an Application Ticket</DialogTitle>
            <form>
              <Grid container spacing={24}>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Position"
                    value={this.state.positionTitle}
                    placeholder="The Job Title"
                    onChange={this.handleChange('positionTitle')}
                    margin="normal"
                    variant="filled"
                  />                    
                </Grid>
              
                  <Grid container spacing={0} j>
                    <Grid item xs={6}>
                      <TextField
                        label="Resume"
                        value={this.state.resumeLink}
                        placeholder="A Link to Your Resume"
                        onChange={this.handleChange('resumeLink')}
                        variant="filled"
                      />     
                    </Grid>
                    <Grid item xs={3}>
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
                  <Grid container spacing={8} justify="center">
                    <Grid item xs={3} >
                      < Button variant="contained">
                        Create
                      </Button>
                    </Grid>
                    <Grid item xs={3} >
                      < Button variant="contained" onClick={this.props.cancel}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>            
            </form>
         </div>
        );
  
    }
  }
  
  export default NewTrackerDialog;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import lightGreen from '@material-ui/core/colors/lightGreen';

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
        acceptedOffer: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSwitch = this.handleSwitch.bind(this)

    }

    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    handleSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    render() {
      
        return (
          <div className="App" style={{ padding: 12 }}>
            <DialogTitle id="form-dialog-title">Create an Application Tracker</DialogTitle>
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
              
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <TextField
                        label="Resume"
                        value={this.state.resumeLink}
                        placeholder="A Link to Your Resume"
                        onChange={this.handleChange('resumeLink')}
                        variant="filled"
                      />     
                    </Grid>
                    <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
              </Grid>
                               
            </form>
         </div>
        );
  
    }
  }
  
  export default NewTrackerDialog;
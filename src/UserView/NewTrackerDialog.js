import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Grid from '@material-ui/core/Grid';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Switch from '@material-ui/core/Switch';

library.add(faHandshake)

class NewTrackerDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      companyName: '',
      position: '',
      resumeLink: '',
      includesCoverLetter: false,
      applicationNotes: '',
      calledForInterview: false,
      jobOffered: false,
      acceptedOffer: false,
      openArchiveAlert: false,
      pleaseArchive: false,
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.postTicket = this.postTicket.bind(this)
    this.postArchivedTicket = this.postArchivedTicket.bind(this)
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSwitch = name => event => {
    if (name === 'jobOffered') {
      this.setState({acceptedOffer: false})
    }
    this.setState({ [name]: event.target.checked });
    
  };

  postTicket = event => {
    event.preventDefault();

    if (!this.state.acceptedOffer) {
      axios({
        method: 'post',
        url: 'https://appli-api.herokuapp.com/createticket',
        data: {
          userId: this.state.userId,
          companyName: this.state.companyName,
          position: this.state.position,
          resumeLink: this.state.resumeLink,
          includesCoverLetter: this.state.includesCoverLetter,
          applicationNotes: this.state.applicationNotes,
          calledForInterview: this.state.calledForInterview,
          jobOffered: this.state.jobOffered,
          acceptedOffer: this.state.acceptedOffer,
          archived: 0
        }
      }).then(response => {
        
        return this.props.retrieveTickets()          
      }).then(response => {  
        this.props.handleClose()
              
      }).catch(error => {
        console.log(error);
      });
    }
    else {
      this.setState({openArchiveAlert: true})
    }  
  }

  postArchivedTicket = decision => {

    let value = -1
    if (decision === 'yes') {
      value = 1
    }
    else {
      value = 0
    }

    axios({
      method: 'post',
      url: 'https://appli-api.herokuapp.com/createticket',
      data: {
        userId: this.state.userId,
        companyName: this.state.companyName,
        position: this.state.position,
        resumeLink: this.state.resumeLink,
        includesCoverLetter: this.state.includesCoverLetter,
        applicationNotes: this.state.applicationNotes,
        calledForInterview: this.state.calledForInterview,
        jobOffered: this.state.jobOffered,
        acceptedOffer: this.state.acceptedOffer,
        archived: value
      }
    }).then(response => {
        return this.props.retrieveTickets()          
    }).then(response => {  
        this.props.handleClose()
    }).catch(error => {
        console.log(error);
    });
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      let decoded = jwt_decode(localStorage.getItem('jwtToken'))
      this.setState({userId: decoded.id})       
    }
    else {
      this.props.history.push('/')
    }  
  }

  render() {

      const styles = {
        handshake: {
          marginLeft: "auto",
          marginRight: "auto"
        }
      }
    
      return (
        <div className="App" style={{ padding: 12 }}>
          <DialogTitle id="form-dialog-title">Create an Application Ticket</DialogTitle>
          <form onSubmit={this.postTicket}>
            <Grid container spacing={24} justify="center" align="center">
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
              
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Resume"
                    value={this.state.resumeLink}
                    placeholder="Full Link to Resume"
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
                         
            </Grid>
            <DialogContent>
                  <DialogActions>                    
                    <Button variant="contained" onClick={this.props.cancel} color="secondary">
                      Cancel
                    </Button>
                    < Button variant="contained" label="submit" type="Submit" color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </DialogContent>  

            <Dialog open={this.state.openArchiveAlert}>
              <DialogTitle>{"You've Accepted the Job Offer"}</DialogTitle>
              <DialogContent>
                <div className="handshake" >
                  <FontAwesomeIcon icon="handshake" color="black" size="7x" />
                </div>
                <DialogContentText>
                  Congratulations! It appears that you've been hired for this job. Would you like to archive this job ticket?
                </DialogContentText>
                <DialogActions>
                  <Button color="primary" onClick={() => this.postArchivedTicket('yes')}>
                    Yes
                  </Button>
                  <Button color="secondary" onClick={() => this.postArchivedTicket('no')}>
                    No
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>            
          </form>
        </div>
      );
  }
}
  
export default NewTrackerDialog;
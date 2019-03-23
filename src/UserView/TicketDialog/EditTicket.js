import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';


import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Clear';

class EditTicket extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        
        return (
            <div>
                <form onSubmit={this.postTicket}>
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
                                < Button variant="contained" label="submit" type="Submit">
                                    Create
                                </Button>
                                </Grid>
                                <Grid item xs={3} >
                                <Button variant="contained" onClick={this.props.cancel}>
                                    Cancel
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>            
                </form>
                <Button variant="contained" color="primary" onClick={this.props.toggleEditDisplay}>
                    Cancel 
                </Button>
                <Button variant="contained" color="secondary" >
                    Save
                </Button>
            </div>
        )
    }

}

export default EditTicket
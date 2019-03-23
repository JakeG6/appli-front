import React, { Component } from 'react';
import { applicationProgress } from  "../applicationProgress";

import axios from 'axios';

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
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(faCopy, faTimes)


class TicketDetails extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
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
                        <a href={this.props.ticket.resume_link} style={linkStyle}>Link</a>
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
                        <p>{this.props.ticket.application_notes}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" >
                            Delete 
                            <DeleteIcon  />
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={this.props.toggleEditDisplay}>
                            Edit 
                            <BuildIcon  />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default TicketDetails
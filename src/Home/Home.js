import React, { Component } from 'react';
import axios from 'axios';
import isAuthenticated from '../Auth/isAuthenticated';
import Lock from '../Auth/Lock'

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';




import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            dialogueOpen: false,
            loginMessage: '',
            name: '',
            password: '',
            newUsername: '',
            newPassword: '',
            returnedUser: undefined,
            registrationMessage: '',
            redirectToSignupSuccess: false
        }
     
       
    }

    render() {
       
        return (
            !isAuthenticated() ?

            <div>
                <h1 className="green home-logo">APPLi</h1>
                <Lock location={this.props.location} />
            </div>
            :
            <Redirect to="/inner" />
        ) 

    }
}

export default Home
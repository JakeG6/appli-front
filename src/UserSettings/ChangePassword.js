import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import LoadingSpinner from '../UserView/LoadingSpinner.js' 

import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';


class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state={
            oldPassword: '',
            newPassword: '',
            loading: false,
            fading: true,
            didUpdatePW: false,
            incorrectPW: false
        }
        this.updatePassword = this.updatePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    updatePassword = event => {
        event.preventDefault();
        let decoded = jwt_decode(localStorage.getItem('jwtToken'))

        this.setState({loading: true}, () => {
            return axios({
                method: 'put',
                url: `http://localhost:4242/updatepassword`,
                data: {
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                    username: decoded.name
                },
                headers: {                
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')                 
                }  
                })
                .then(response => {                          
                    console.log(response)
                    this.setState({loading: false, didUpdatePW: true})      
                 })
                .catch((error) => {
                    console.log(error);
                    this.setState({loading: false, incorrectPW: true}, () => {
                        console.log(this.state.loading)
                    })

                }
            );
        }) 
    }

    render() {

        let decoded = jwt_decode(localStorage.getItem('jwtToken'))
        //get the current time
        let currentTime = Math.floor(Date.now() / 1000)

        //if the current time on rendering is earlier than the expiration date, show the page.
        if (currentTime < decoded.exp || localStorage.getItem('jwtToken') === false) {
            return(
            <div>
            {
                this.state.loading ? 
                LoadingSpinner()
                :
                this.state.didUpdatePW ?
                <Fade in={this.state.didUpdatePW}>
                    <h1>Your Password Has Been Updated</h1>
                </Fade>
                :
                <div>
                    
                <h1>{this.state.incorrectPW ? "Error: Incorrect Password" : "Change Your Password"}</h1>
                <form onSubmit={this.updatePassword} style={{ padding: 8 }}>                    
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="component-simple">Current Password</InputLabel>
                                <Input id="component-simple" autoComplete='off' 
                                value={this.state.oldPassword}  
                                onChange={this.handleChange('oldPassword')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="component-simple">New Password</InputLabel>
                                <Input id="component-simple" autoComplete='off' 
                                value={this.state.newPassword}  
                                onChange={this.handleChange('newPassword')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="Submit" color="primary" variant="contained" label="create">Submit</Button> 
                        </Grid>
                    </Grid>                                                   
                </form>
                
                </div>
            }
            </div>
        )} //otherwise, send the user to the login page.
        else { 
          return (<Redirect to="/" />) 
        } 
    }
}

export default ChangePassword
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';

import jwt_decode from 'jwt-decode';

import { BrowserRouter as  Redirect } from "react-router-dom";

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
        this.checkUniqueUsername = this.checkUniqueUsername.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleRegistration = this.handleRegistration.bind(this)   
    }

    handleOpen = () => {
        this.setState({ dialogueOpen: true });
    };
    
    handleClose = () => {
        this.setState({ dialogueOpen: false });
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    checkUniqueUsername(username) {
        return axios.get(`/checkuniquename/${username}`)
        .then((response) => {
            if (response.data === false) {
                this.setState({registrationMessage: "Sorry, but that username is taken"})
                return false
            }
            else {
                return true
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleLogin = event => {
        event.preventDefault();

        //Make a network call somewhere
        axios.post(`/login`, {
            username: this.state.name,
            password: this.state.password
        })
        
        //?username="${this.state.name}"&password="${this.state.password}"`)
        .then((response) => {

            localStorage.setItem('jwtToken', response.data.token)
            this.props.history.push('/inner')
            
        })
        .catch( (error) => {
            console.log(error);
            this.setState({loginMessage: "There is an error with the server. please try again later."})
        })

    }

    handleRegistration = event => {
        event.preventDefault();
        //console.log('hey we are logging')
        //check that username and passwords aren't empty strings
        if (this.state.newUsername.length > 0 && this.state.newPassword.length > 0) {
            //check that the new username isn't already in the database
            this.checkUniqueUsername(this.state.newUsername)
            .then(isUnique => {

                if (isUnique === true) {
                    axios.post('/createuser', {
                        username: this.state.newUsername,
                        password: this.state.newPassword
                        })
                        .then( (response) => {
                           
                            this.setState({redirectToSignupSuccess: true}, () => {
                                this.props.history.push('/signupsuccess')

                                
                            })
                            
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
        }
        else {
            this.setState({registrationMessage: "Sorry, but we need a username and password for you to sign up"})
        }
    }

    render() {
        
        if (localStorage.getItem("jwtToken")) {
            //decode the jwt's payload.
            let decoded = jwt_decode(localStorage.getItem('jwtToken'))
            //get the current time
            let currentTime = Math.floor(Date.now() / 1000)

            //if the current time on rendering is earlier than the expiration date, show the page.
            if (currentTime < decoded.exp) {
                return (<Redirect to='/inner' />)
            }
            else {}
        }

        // let redirectToSignupSuccess = this.state.redirectToSignupSuccess

        // if (redirectToSignupSuccess === true) {
        //     return (<Redirect to='/signupsuccess' push={true}/>)
        // }

        return (
            <div>
                <h1 className="green home-logo">APPLi</h1>
                <div className="login-message">
                    <h4>{this.state.loginMessage}</h4>
                </div>
                <form onSubmit={this.handleLogin} style={{ padding: 8 }}>
                    <Grid container spacing={16} direction="row" justify="center">
                        <Grid item xs={2} >
                            <FormControl margin="normal">
                                <InputLabel htmlFor="component-simple">Name</InputLabel>
                                <Input id="component-simple" autoComplete='off' value={this.state.name}  onChange={this.handleChange('name')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} >
                            <FormControl margin="normal">
                                <InputLabel htmlFor="component-simple">Password</InputLabel>
                                <Input id="component-simple" autoComplete='off' type="password" value={this.state.password} onChange={this.handleChange('password')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button  color="secondary" label="submit" type="Submit" variant="contained" >Log In</Button>
                        </Grid>
                    </Grid>
                </form>

                <Button onClick={this.handleOpen} color="primary" variant="contained">Sign Up</Button>

                <Dialog open={this.state.dialogueOpen} onClose={this.handleClose} className="registration-popup">
                    <h2>Register for an Account</h2>
                    <form onSubmit={this.handleRegistration} style={{ padding: 8 }}>
                        <Grid container spacing={16}  justify="center">
                            <Grid item xs={6} >
                                <FormControl required={true}>
                                    <InputLabel htmlFor="component-simple">Your Username</InputLabel>
                                    <Input id="component-simple" value={this.state.newUsername} onChange={this.handleChange('newUsername')}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required={true}>
                                    <InputLabel htmlFor="component-simple">Your Password</InputLabel>
                                    <Input id="component-simple" value={this.state.newPassword} onChange={this.handleChange('newPassword')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{this.state.registrationMessage}</p>
                                <Button color="secondary" label="submit" type="Submit" variant="contained">Create Account</Button>          
                            </Grid>
                        </Grid>
                    </form>
                </Dialog>   
            </div>
        )
    }
}

export default Home
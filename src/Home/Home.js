import React, { Component } from 'react';
import axios from 'axios';
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
        return axios.get(`http://localhost:4242/checkuniquename/${username}`)
            .then((response) => {
                if (response.data === false) {
                    this.setState({registrationMessage: "Sorry, but that username is taken"})
                    return false
                }
                else {
                    return true
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleLogin = event => {

        //Make a network call somewhere
        axios.get(`http://localhost:4242/login?username="${this.state.name}"&password="${this.state.password}"`)
        .then((response) => {
            //console.log(response)
            if (response.data !== false) {
                    console.log("good job")
                        this.props.setCurrentUser(response)
                        console.log(this.props.currentUser)
                        //localStorage.setItem("authorized", "true")
                        //localStorage.setItem("currentUser", this.state)
                        this.props.history.push('/inner')
                    
            }
            else {
                this.setState({loginMessage: "Login failed: wrong username or password"})
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({loginMessage: "There is an error with the server. please try again later"})
        });

        event.preventDefault();
    }

    handleRegistration = event => {
        event.preventDefault();
        console.log('hey we are logging')
        //check that username and passwords aren't empty strings
        if (this.state.newUsername.length > 0 && this.state.newPassword.length > 0) {
            //check that the new username isn't already in the database
            this.checkUniqueUsername(this.state.newUsername)
            .then(isUnique => {
                console.log(isUnique)

                if (isUnique === true) {
                    //console.log("the username is unique")
                    axios.post('http://localhost:4242/createuser', {
                        username: this.state.newUsername,
                        password: this.state.newPassword
                        })
                        .then( (response) => {
                           
                            console.log(response)
                            this.setState({redirectToSignupSuccess: true}, () => {
                                console.log(this.state.redirectToSignupSuccess)

                                
                            })
                            
                            //this.props.history.push('/signupsuccess')
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
        let isAuthed = localStorage.getItem("authorized");

        let redirectToSignupSuccess = this.state.redirectToSignupSuccess

        if (isAuthed === "true") {
            return (<Redirect to='/inner' />)
        }

        if (redirectToSignupSuccess === true) {
            return (<Redirect to='/signupsuccess' push={true}/>)
        }

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
                                <Input id="component-simple" value={this.state.name}  onChange={this.handleChange('name')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} >
                            <FormControl margin="normal">
                                <InputLabel htmlFor="component-simple">Password</InputLabel>
                                <Input id="component-simple" value={this.state.password} onChange={this.handleChange('password')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button  color="secondary" label="submit" type="Submit" variant="contained" >Log In</Button>
                        </Grid>
                    </Grid>
                </form>
                <Button onClick={this.handleOpen} color="primary" variant="contained">Sign Up</Button>

                <Dialog open={this.state.dialogueOpen} onClose={this.handleClose}>
                    <h2>Register for an account</h2>
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
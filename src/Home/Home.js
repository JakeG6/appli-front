import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
            returnedUser: undefined

        }
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

    handleLogin = event => {
        //Make a network call somewhere
        axios.get(`http://localhost:4242/login?username="${this.state.name}"&password="${this.state.password}"`)
        .then((response) => {
            //console.log(response)
            if (response.data !== false) {
                    console.log("good job")
                        this.props.setCurrentUser(response)
                        console.log(this.props.currentUser)
                        localStorage.setItem("authorized", "true")

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
        axios.post('http://localhost:4242/createuser', {
            username: this.state.newUsername,
            password: this.state.newPassword
          })
          .then( (response) => {
            console.log(this.state.newUsername, this.state.newPassword)
            console.log(response);
            this.handleClose()
            
          })
          .catch((error) => {
            console.log(error);
          });

          event.preventDefault();
    }

    render() {

        

        return (
            <div>
                <h1 className="green home-logo" >APPLI</h1>
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
                                    <Button color="secondary" label="submit" type="Submit" variant="contained" >Log In</Button>
                        </Grid>
                    </Grid>
                </form>
                <Button onClick={this.handleOpen} color="primary" variant="contained">Sign Up</Button>

                
                
                <Dialog open={this.state.dialogueOpen} onClose={this.handleClose}>
                    <h2>Register for an account</h2>
                    <form onSubmit={this.handleRegistration} style={{ padding: 8 }}>
                        <Grid container spacing={16}  justify="center">
                            <Grid item xs={6} >
                                <FormControl required="true">
                                    <InputLabel htmlFor="component-simple">Your Username</InputLabel>
                                    <Input id="component-simple" value={this.state.newUsername} onChange={this.handleChange('newUsername')}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required="true">
                                    <InputLabel htmlFor="component-simple">Your Password</InputLabel>
                                    <Input id="component-simple" value={this.state.newPassword} onChange={this.handleChange('newPassword')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
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
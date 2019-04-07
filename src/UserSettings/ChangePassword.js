import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state={
            oldPassword: '',
            newPassword: ''
        }
        //this.updatePassword = this.updatePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    render() {

        return(
            <div>
                <h1>Change Your Password</h1>
                <form onSubmit={this.updatePassword} style={{ padding: 8 }}>
                    <Grid container>
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
                    </Grid>                
                </form>  
                        
                <Button type="Submit" color="secondary" variant="contained" label="create">Submit</Button>
                        
                                       
            </div>

        ) 
    }
}

export default ChangePassword
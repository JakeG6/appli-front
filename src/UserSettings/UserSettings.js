import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import UserStyle from './UserStyle.js'
import ChangePassword from './ChangePassword'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

class UserSettings extends Component {
    constructor(props) {
        super(props)
        this.state ={
          value: 0,
        }
        this.handleTab = this. handleTab.bind(this)
    }

    handleTab = (event, value) => {
      this.setState({value});
    };
  
    render() {

      const styles = {
        
        settingsCard: {
          margin: '5em auto',
          maxWidth: '633px'
        },
        username: {
          marginLeft: '1em'
        },
        grow: {
          flexGrow: 1
        },
        grow2: {
          flexGrow: 2
        },
        displayOption:{
          marginLeft: '1em',
          marginRight: '1em'
        },
        tab: {
          backgroundColor: 'rgb(54, 193, 54)',
          color: 'white',
          
        }
      }

      const { value } = this.state;

      let decoded = jwt_decode(localStorage.getItem('jwtToken'))
        //get the current time
        let currentTime = Math.floor(Date.now() / 1000)

        //if the current time on rendering is earlier than the expiration date, show the page.
        if (currentTime < decoded.exp || localStorage.getItem('jwtToken') === false) {
          return(
            <div style={styles.background}>
              {/* Navigation Bar */}
                <AppBar position="static" >
                  <Toolbar >
                    <Button onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
                    <Button><Link to="/inner">My Job Tickets</Link></Button>                                 
                    <div style={styles.grow}/>             
                    <h1 className="userview-logo">APPLi</h1>         
                  </Toolbar>
                </AppBar>
                {/* Settings Card */}
                <Card style={styles.settingsCard}>
                  <Tabs
                   
                    style={styles.tab}
                    value={value}
                    onChange={this.handleTab}
                    indicatorColor="primary"
                    textColor="primary"                    
                  >
                    <Tab label="User Style" style={styles.tab}  />
                    <Tab label="Reset Password" style={styles.tab}  />
                  </Tabs>
                  <CardContent>
                    {value === 0 && <UserStyle />}
                    {value === 1 && <ChangePassword />}
                  </CardContent>
                </Card>
              </div>
          )
        } else {
          return (<Redirect to="/" />) 
        }
    }
}

export default UserSettings
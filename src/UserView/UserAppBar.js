import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';

import Toolbar from '@material-ui/core/Toolbar';

class UserAppBar extends Component {

    constructor(props) {
        super(props)
        this.state= {
            anchorEl: null,
            userMenuEl: null,
            sortMenu: false,
            userMenu: false,
        }

        this.sortMenuClose = this.sortMenuClose.bind(this)
        this.sortMenuOpen = this.sortMenuOpen.bind(this)
        this.userMenuClose = this.userMenuClose.bind(this)
        this.userMenuOpen = this.userMenuOpen.bind(this)
    }

    sortMenuOpen = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    sortMenuClose(newSortOrder) {
        if (newSortOrder === 'newToOld' || newSortOrder === 'oldToNew') {
            if(newSortOrder === this.props.sortOrder) {
                this.setState({anchorEl: null})

            }  
            else {
                this.props.changeSortOrder(newSortOrder)
                this.setState({anchorEl: null})
            }     
        }
        else { 
            this.setState({anchorEl: null})
        }
    }

    userMenuOpen = (event) => {
        this.setState({userMenuEl: event.currentTarget})
    }
    
    userMenuClose() { 
        this.setState({userMenuEl: null})
    }
    
    

    render() {
        const { anchorEl, userMenuEl } = this.state;

        const styles = {
            
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
            }
        }
    
        return (
            <div>
                <AppBar position="static" >
                    <Toolbar className="green">
                        <MenuIcon 
                            aria-owns={userMenuEl ? "user-menu" : null}
                            aria-haspopup="true"
                            onClick={this.userMenuOpen}
                        />
                        <Menu 
                            id="user-menu" 
                            anchorEl={userMenuEl}
                            open={Boolean(userMenuEl)}
                            onClose={this.userMenuClose}
                        >
                            <MenuItem onClick={this.userMenuClose}>{this.props.currentUsername}</MenuItem>
                            <MenuItem onClick={this.userMenuClose}>an option</MenuItem>
                            <MenuItem onClick={this.userMenuClose}>an option</MenuItem>
                        </Menu>
                        {/* <Button  onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
                        <Button><Link to="/inner/settings">User Settings</Link></Button> */}
                        <div style={styles.grow}/>     
                        <FormControlLabel control={
                            <Switch checked={this.props.showArchived} onChange={this.props.handleSwitch('showArchived')} value="showArchived" />                   
                            }
                            labelPlacement="start"
                            label="Show Archived Tickets"
                            style={styles.displayOption}
                        />
                        <Button
                        style={styles.displayOption}      
                        aria-owns={anchorEl ? "sort-form" : null}
                        aria-haspopup="true"
                        onClick={this.sortMenuOpen}
                        >
                            Sort By
                        </Button>
                        <Menu 
                        id="sort-form" 
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.sortMenuClose}
                        >
                        <MenuItem >Sort By</MenuItem>
                        <MenuItem onClick={() => this.sortMenuClose("newToOld")}>Newest to Oldest</MenuItem>
                        <MenuItem onClick={() => this.sortMenuClose("oldToNew")}>Oldest to Newest</MenuItem>                               
                        </Menu>             
                        <div style={styles.grow}/>             
                        <h1 className="green userview-logo">APPLi</h1>         
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default UserAppBar  
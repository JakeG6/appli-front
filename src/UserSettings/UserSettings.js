import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class UserSettings extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        const styles = {
            fabStyle: {
              color: 'white',
              backgroundColor: 'rgb(54, 193, 54)',
              position: 'fixed',
              display: 'block',
              bottom: '20px',
              right: '20px'
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
            }
          }

        return(
            <div>
                <AppBar position="static" >
                    <Toolbar color={primary} className="green">
                        <Button  onClick={this.props.handleLogout}><Link to="/">LOG OUT</Link></Button>
                        <Button><Link to="/">My Job Tickets</Link></Button>                                 
                        <div style={styles.grow}/>             
                        <h1 className="green userview-logo">APPLi</h1>         
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

export default UserSettings
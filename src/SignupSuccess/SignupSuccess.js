import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class SignupSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 4000)
    }
    
    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return (
            this.state.redirect ? <Redirect to="/" />
            :   
            <div className="confirmation-page">
                <div className="confirmation-message">
                    <h1>THANKS FOR JOINING APPLI!</h1>
                    <h2>You'll be redirected to the login screen shortly.</h2>
                </div>
            </div>           
        ) 
    }
}

export default SignupSuccess
import React, { Component } from 'react'
import TicketDetails from './TicketDetails'
import EditTicket from './EditTicket'




class TicketDialog extends Component {

    constructor(props) {
      super(props)
      this.state = {

        showEditForm: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSwitch = this.handleSwitch.bind(this)
      this.toggleEditDisplay = this.toggleEditDisplay.bind(this)
    }

    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    handleSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    toggleEditDisplay() {
        this.state.showEditForm ? this.setState({showEditForm: false}) : this.setState({showEditForm: true})

    }

    render() {
      
        return (
            <div className="App" style={{ padding: 12 }}>

                {!this.state.showEditForm ?
                <TicketDetails ticket={this.props.ticket} toggleEditDisplay={this.toggleEditDisplay} 
                retrieveTickets={this.props.retrieveTickets} handleTicketClose={this.props.handleTicketClose}
                getUpdatedTicketDetails = {this.props.getUpdatedTicketDetails}/>
                :
                <EditTicket ticket={this.props.ticket} toggleEditDisplay={this.toggleEditDisplay} 
                retrieveTickets={this.props.retrieveTickets} getUpdatedTicketDetails = {this.props.getUpdatedTicketDetails}/>
                }                                      
            </div>
        );
    }
}
  
export default TicketDialog;
import React, { Component } from 'react';

import  "./applicationProgress";
import { applicationProgress } from './applicationProgress.js';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(faHandshake, faCopy, faTimes, faDoorOpen, faPhone, faDoorClosed)

class Ticket extends Component {

    constructor(props) {
      super(props)
    }

    render() {
      
      const styles = {
        card: {
          root: {
            height: '300px',
            hover: {
              cursor:'pointer'
            }
          } 
        },
                      
      }

      return (
        
        <Card  style={styles.card.root}  className={"ticket"}>
          <CardHeader
            className={"ticket-header"}
            title={this.props.ticket.company}
            subheader={this.props.ticket.position}
          />
          <CardContent>
            {applicationProgress(this.props.ticket)}
          </CardContent>
        </Card>
      )
    }
}

export default Ticket;

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function applicationProgress(ticket) {
    if (ticket.accepted_offer) {
        return (
            <div>
                <FontAwesomeIcon icon="handshake" color="black" size="7x" />
                <h3>Offer Accepted</h3>
            </div>
        )
    }
    else if (ticket.job_offered) {
        return(
            <div>
                <FontAwesomeIcon icon="door-open" color="black" size="7x" />
                <h3>Position Offered</h3>
            </div>
        )
    }
    else if (ticket.called_for_interview) {
        return(
            <div>
                <FontAwesomeIcon icon="phone" color="black" size="7x" />
                <h3>Called for Interview</h3>
            </div>
        ) 
    }
    else {
        return(
            <div>
                <FontAwesomeIcon icon="door-closed" color="black" size="7x" />
                <h3>Awaiting Employer Response</h3>
            </div>
        )
    }
}
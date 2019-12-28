import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(faHandshake, faDoorOpen, faPhone, faDoorClosed)

const brandGreen = '#36c136'


export function applicationProgress(ticket) {
    if (ticket.accepted_offer) {
        return (
            <div>
                <FontAwesomeIcon icon="handshake" color={brandGreen} size="7x" />
                <p>Offer Accepted</p>
            </div>
        )
    }
    else if (ticket.job_offered) {
        return(
            <div>
                <FontAwesomeIcon icon="door-open" color={brandGreen} size="7x" />
                <p>Position Offered</p>
            </div>
        )
    }
    else if (ticket.called_for_interview) {
        return(
            <div>
                <FontAwesomeIcon icon="phone" color={brandGreen}  size="7x" />
                <p>Called for Interview</p>
            </div>
        ) 
    }
    else {
        return(
            <div>
                <FontAwesomeIcon icon="door-closed" color={brandGreen}  size="7x" />
                <p>Awaiting Employer Response</p>
            </div>
        )
    }
}
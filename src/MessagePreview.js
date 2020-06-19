import React from 'react';
import './App.css';
import Sender from './Sender'
import Subject from './Subject'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function MessagePreview(props) {
    // const sender = props.value[0].sender
    // const subject = props.value[0].subject
    const emails = props.value
    let header = 'Sender'
    // test if this is our inbox or our sent mail
    emails.forEach(e => {
        if (e.sender === 'jane@galvanize.com') {
            header = 'Sent To'
        }
    })
    
    return (
        <MDBTable hover small>
            <MDBTableHead color="elegant-color" textWhite>
                <tr>
                    <th>{header}</th>
                    <th>Subject</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {emails.map(e => 
                    <tr className="home-view-rows" onClick={(e) => props.showMessage(e)}>
                        <td id={e.id} value={e.sender}><Sender value={e} /></td>
                        <td id={e.id} value={e.sender}><Subject value={e} /></td>
                    </tr>
                    )
                }
            </MDBTableBody>
        </MDBTable>
    )
}

export default MessagePreview;
import React from 'react';
import './App.css';
import Sender from './Sender'
import Subject from './Subject'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function MessagePreview(props) {
    // const sender = props.value[0].sender
    // const subject = props.value[0].subject
    const emails = props.value
    return (
        <MDBTable hover small>
            <MDBTableHead color="elegant-color" textWhite>
                <tr>
                    <th>Sender</th>
                    <th>Subject</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {emails.map(e => 
                    <tr className="home-view-rows" onClick={(e) => props.showMessage(e)}>
                        <td id={e.id}><Sender value={e} /></td>
                        <td id={e.id}><Subject value={e} /></td>
                    </tr>
                    )
                }
            </MDBTableBody>
        </MDBTable>
    )
}

export default MessagePreview;
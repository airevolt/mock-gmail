import React from 'react';
import { MDBBtn } from "mdbreact";
import './App.css';

function Sidebar(props) {
    const inboxSize = props.lengths.inbox
    const sentSize = props.lengths.sent
    return (
        <div className="sidebar">
            <ul>
                <MDBBtn onClick={props.send} color="primary" size="md">Compose</MDBBtn>
                <li><a href="!#" onClick={props.toHome}>Inbox({inboxSize})</a></li>
                <li><a href="!#" onClick={props.toSent}>Sent({sentSize})</a></li>
            </ul>   
        </div>
    )
}

export default Sidebar;
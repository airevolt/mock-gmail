import React from 'react';
import './App.css';

function Sender(props) {
    let name = props.value.sender
    // test if this is our inbox or our sent mail
    if(name === 'jane@galvanize.com') {
        name = props.value.recipient
    }
    return (
        <p id={props.value.id} value={props.value.sender}>{name}</p>
    )
}

export default Sender;
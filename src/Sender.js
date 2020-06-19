import React from 'react';
import './App.css';

function Sender(props) {
    return (
        <p id={props.value.id}>{props.value.sender}</p>
    )
}

export default Sender;
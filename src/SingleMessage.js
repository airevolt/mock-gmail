import React from 'react';
import './App.css';

function SingleMessage(props) {
    const message = props.value
    return (
        <div>
            <p>Date: {message.date}</p>
            <p>Sender: {message.sender}</p>
            <p>Recipient: {message.recipient}</p>
            <p>Subject: {message.subject}</p>
            <p>Message:</p>
            <textarea>{message.message}</textarea>
        </div>
    )
}

export default SingleMessage;
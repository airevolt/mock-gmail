import React from 'react';
import './App.css';


function SingleMessage(props) {
    const message = props.value
    const date = new Date(message.date).toLocaleString() // show well formatted date

    return (
        <div className="single-message">
            <div className="single-message-inner">
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Sender:</strong> {message.sender}</p>
                    <p><strong>Recipient:</strong> {message.recipient}</p>
                    <p><strong>Subject:</strong> {message.subject}</p>
                    <p><strong>Message:</strong></p>
                    <textarea readOnly>{message.message}</textarea> 
            </div>
        </div> 
    )
}

export default SingleMessage;
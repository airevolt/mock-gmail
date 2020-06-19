import React from 'react';
import './App.css';
import { MDBInput, MDBBtn } from "mdbreact";

function SingleMessage(props) {
    return (
        <div className="message">
            <div className="form-group">
                <MDBInput label="Recipient E-mail address" outline icon="user" />
            </div>
            <div className="form-group">
            <MDBInput label="Subject" outline icon="envelope" />
            </div>
            <MDBInput type="textarea" label="Message" outline />
            <MDBBtn onClick={props.send} color="primary" size="md">Send</MDBBtn>
        </div>
    )
}

export default SingleMessage;
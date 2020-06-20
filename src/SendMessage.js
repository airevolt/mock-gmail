import React from 'react';
import './App.css';
import { MDBInput, MDBBtn } from "mdbreact";

function SingleMessage(props) {
    return (
        <form onSubmit={props.sendEmail}>
            <div className="message">
                <div className="form-group">
                    <MDBInput label="Recipient E-mail address" name="recipient" outline icon="user" />
                </div>
                <div className="form-group">
                <MDBInput label="Subject" name="subject" outline icon="envelope" />
                </div>
                <MDBInput type="textarea" name="message" label="Message" outline />
                <MDBBtn type="submit" color="success" size="md">Send</MDBBtn>
            </div>
        </form>
    )
}

export default SingleMessage;
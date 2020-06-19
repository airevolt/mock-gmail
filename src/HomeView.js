import React from 'react';
import './App.css';
import { MDBInput } from "mdbreact";
import MessagePreview from './MessagePreview'

function HomeView(props) {
    const emails = props.value
    const singleMessage = props.singleMessage
    return (
        <div className="home-view">
            <MDBInput className="search-input" label="Search by Subject" />
            <h2>Emails:</h2>
            <MessagePreview value={emails} showMessage={singleMessage}/>
        </div>
    )
}

export default HomeView;
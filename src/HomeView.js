import React from 'react';
import './App.css';
import { MDBInput, MDBInputGroup, MDBBtn } from "mdbreact";
import MessagePreview from './MessagePreview'

function HomeView(props) {
    const emails = props.value
    const singleMessage = props.singleMessage
    return (
      <div className="home-view">
        <form onSubmit={props.searchMail}>
            <MDBInputGroup
            name="query"
            material
            containerClassName="mb-3 mt-0"
            hint="Search Mail"
            append={
                <MDBBtn type="submit" color="elegant" outline className="m-0 px-3 py-2 z-depth-0">
                Search
                </MDBBtn>
            }
            />
        </form>
        <MessagePreview value={emails} showMessage={singleMessage} />
      </div>
    );
}

export default HomeView;
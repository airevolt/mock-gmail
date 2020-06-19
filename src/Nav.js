import React from 'react';
import { MDBBtn } from "mdbreact";
import './App.css';

function Nav(props) {
    return (
        <header className="App-header">
            <a onClick={props.toHome}><h1>Mock Gmail</h1></a>
            <MDBBtn onClick={props.send} color="primary" size="md">Compose</MDBBtn>
        </header>
    )
}

export default Nav;
    
import React from 'react';
import { MDBBtn } from "mdbreact";
import './App.css';

function Nav(props) {
    return (
        <header className="App-header">
            <a href="!#" onClick={props.toHome}><h1>Mock Gmail</h1></a>
        </header>
    )
}

export default Nav;
    
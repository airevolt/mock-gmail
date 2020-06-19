import React from 'react';
import './App.css';

function Subject(props) {
    return (
        <p id={props.value.id}>{props.value.subject}</p>
    )
}

export default Subject;
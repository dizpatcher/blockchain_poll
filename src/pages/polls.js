import React from 'react';
import Card  from '../components/card'
import Selection from "../components/selection";

import '../App.css'

export const Polls = () => {
    return(
    <div className="d-flex">
        <div className="container poll-list">
            <Card/>
        </div>
        <div className="container poll-detail">
            <Selection/>
        </div>
    </div>)
}

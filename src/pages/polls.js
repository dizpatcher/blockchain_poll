import React from 'react';
import Card  from '../components/card'
import Selection from "../components/selection";
import ApexChart from "../components/chart";

import '../App.css'

class Polls extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            voted: "",
        }
    }

    chooseData = (voted) => {
        this.setState({voted: voted});
        console.log(this.voted)
    }

    render() {
        return(
            <div className="d-flex">
                <div className="container poll-list">
                    <Card handleVoted={this.chooseData}/>
                </div>
                <div className="container poll-detail">
                    { <ApexChart/> ? this.state.voted : <Selection/> }
                </div>
            </div>)
    }
}

export default Polls;
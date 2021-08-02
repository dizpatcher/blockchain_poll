import React from 'react';
import Card  from '../components/card'
import Selection from "../components/selection";
import ApexChart from "../components/chart";

import '../App.css'

class Polls extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            voted: null,
            id: 0
        }

        this.callbackVoted = this.callbackVoted.bind(this);
    }

    callbackVoted = (voted, id) => {
        this.setState({active: true,
                            voted: voted,
                            id: id}
                            );}

    render() {
        return(
            <div className="d-flex">
                <div className="container poll-list">
                    <Card pollVoted={this.callbackVoted}/>
                </div>
                <div className="container poll-detail">
                    {this.state.active
                    ? <div>
                            { this.state.voted ? <ApexChart id={this.state.id}/> : <Selection id={this.state.id}/> }
                      </div>
                    : null
                    }
                </div>
            </div>)
    }
}

export default Polls;
import React from 'react';

import Card  from '../components/card';
import Selection from "../components/selection";
import ApexChart from "../components/chart";

import '../App.css'

class Polls extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            active: false,
            voted: null,
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
                    <Card pollVoted={this.callbackVoted} polls={this.props.polls}/>
                </div>
                <div className="container poll-detail">
                    {this.state.active
                    ? <div>
                            { this.state.voted
                                ? <ApexChart poll={this.props.polls[this.state.id]} />
                                : <Selection poll={this.props.polls[this.state.id]} vote={this.props.vote} />
                            }
                      </div>
                    : null
                    }
                </div>
            </div>
        )
    }
}

export default Polls;
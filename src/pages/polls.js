import React from 'react';
import Web3 from 'web3';

import Card  from '../components/card'
import Selection from "../components/selection";
import ApexChart from "../components/chart";

import Contract from "../blockchain/contract.json";

import '../App.css'

class Polls extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            voted: null,
            id: 0,
            account: props.account,
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
                    <Card pollVoted={this.callbackVoted} Polls={this.props.polls}/>
                </div>
                <div className="container poll-detail">
                    {this.state.active
                    ? <div>
                            { this.state.voted
                                ? <ApexChart id={this.state.id} Polls={this.props.polls}/>
                                : <Selection id={this.state.id} active={this.state.active} Polls={this.props.polls} vote={this.props.vote}/> }
                      </div>
                    : null
                    }
                    <p>{this.state.account}</p>
                    {console.log(Contract.abi, Contract.address)}
                </div>
            </div>)
    }
}

export default Polls;
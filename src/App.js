import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Navbar} from "./components/navbar";
import {Loading} from "./components/loading";
import {Jumbotron} from "./components/jumbotron";
import Polls from "./pages/polls";
import FormPoll from "./pages/formpoll";

import './App.css';

import Web3 from "web3";
import Contract from "./blockchain/contract.json";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            loading: true,
        }

        this.createPoll = this.createPoll.bind(this)
        this.vote = this.vote.bind(this)
        this.getPolls = this.getPolls.bind(this)
    }

    async componentDidMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        if (window.ethereum) {

            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.setState({account: accounts[0]})
            const platform = new web3.eth.Contract(Contract.abi, Contract.address)
            this.setState({platform})

            // getting the polls
            const polls = await this.getPolls()
            this.setState({polls})

            // auto-refresh the poll page
            platform.events.PollCreated().on('data', (data) => ( { event: data.event, payload: data.returnValues } )).subscribe(async () => {this.state.polls  = await this.getPolls()})

            this.setState({ loading: false})
        } else {
            window.alert('The metamask was not found. Make sure that it is installed for the current browser.')
        }
    }

    createPoll(question, thumb, options) {
        this.setState({ loading: true})

        options = options.map(opt => Web3.utils.fromAscii(opt))
        this.state.platform.methods.createPoll(question, thumb || '', options ).send({from: this.state.account})

        this.setState({ loading: false})
    }

    vote(pollId, voteNumber) {
        this.setState({ loading: true})

        this.state.platform.methods.vote(pollId, voteNumber).send({from: this.state.account})

        this.setState({ loading: false})
    }

    async getPolls() {

        // function normalizeVoter(rawVoter) {
        //         return {
        //             id: rawVoter[0],
        //             votedIds: rawVoter[1].map((id) => parseInt(id))
        //         }
        // }
        //
        // function normalizePoll(rawPoll, voter) {
        //     return {
        //         id: parseInt(rawPoll[0]),
        //         question: rawPoll[1],
        //         image: rawPoll[2],
        //         options: rawPoll[3].map((opt) => Web3.utils.toAscii(opt)).replace(/\u0000/g, ''),
        //         votes: rawPoll[4].map((n) => parseInt(n)),
        //         voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(rawPoll[0]) != undefined),
        //     }
        // }

        const rawVoter = await this.state.platform.methods.getVoter(this.state.account).call({from: this.state.account})
        const totalPolls = await this.state.platform.methods.getTotalPolls().call({from: this.state.account})
        const voter = {
                        id: rawVoter[0],
                        votedIds: rawVoter[1].map((id) => parseInt(id))
        }

        const polls = []
        for (let i=0; i<totalPolls; i++) {
            const rawPoll = await this.state.platform.methods.getPoll(i).call()
            const poll = {
                id: parseInt(rawPoll[0]),
                question: rawPoll[1],
                image: rawPoll[2],
                options: rawPoll[3].map((opt) => Web3.utils.toAscii(opt)), //.replace(/\\u0000/g, ''),
                votes: rawPoll[4].map((n) => parseInt(n)),
                voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(rawPoll[0])) !== undefined,
            }
            polls.push(poll)
        }

        return polls
    }

    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    <Jumbotron/>
                    <Switch>
                        {this.state.loading
                            ? <Route exact path={'/'}><Loading/></Route>
                            : <Route path={'/'} exact render={(props) => (
                                <Polls {...props}
                                       vote={this.vote}
                                       loading={this.state.loading}
                                       polls={this.state.polls}
                                />)}
                            />
                        }
                        <Route path={'/creation'} exact render={(props) => (
                            <FormPoll {...props}
                                      createPoll={this.createPoll}
                                      loading={this.state.loading}
                            />)}
                        />
                    </Switch>
                </BrowserRouter>

            </div>
        ) ;
    }
}

export default App;

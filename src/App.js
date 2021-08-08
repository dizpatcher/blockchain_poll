import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar} from "./components/navbar";
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
        //this.getPolls = this.getPolls.bind(this)
    }

    async componentDidMount() {
        //await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        if (window.ethereum) {

            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.setState({account: accounts[0]})
            const platform = new web3.eth.Contract(Contract.abi, Contract.address)
            this.setState({platform})


            // getting the Polls
            const totalPolls = await  platform.methods.getTotalPolls().call({from: this.state.account})
            console.log(totalPolls)
            const rawVoter = await platform.methods.getVoter(this.state.account).call({from: this.state.account})
            const voter = {
                id: rawVoter[0],
                votedIds: rawVoter[1].map((id) => parseInt(id))
            }

            const polls = []
            for (let i=0; i<totalPolls; i++) {
                const rawPoll = await platform.methods.getPoll(i).call({from: this.state.account})
                const poll = {
                    id: parseInt(rawPoll[0]),
                    question: rawPoll[1],
                    image: rawPoll[2],
                    options: rawPoll[3].map((opt) => Web3.utils.toAscii(opt)).replace(/\\u0000/g, ''),
                    votes: rawPoll[4].map((n) => parseInt(n)),
                    voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(rawPoll[0])),
                }
                polls.push(poll)
            }

            this.setState({polls})
            this.setState({ loading: false})
        } else {
            window.alert('Браузер не подддерживает Эфириум. Установите Метамаск')
        }
    }

    // async loadWeb3() {
    //     if (window.ethereum) {
    //         window.web3 = new Web3(window.ethereum)
    //         await window.ethereum.send('eth_requestAccounts')
    //     } else if (window.web3) {
    //         window.web3 = new Web3(window.web3.currentProvider)
    //     } else {
    //         window.alert('Браузер не подддерживает Эфириум. Установите Метамаск')
    //     }
    // }
    //
    // async loadBlockchainData() {
    //     const web3 = window.web3
    //     // Load account
    //     const accounts = await web3.eth.getAccounts()
    //     this.setState({account: accounts[0]})
    //     console.log("acc: ", this.state.account)
    //
    //     const platform = new web3.eth.Contract(Contract.abi, Contract.address)
    //     this.setState({platform: platform})
    //     this.setState({loading: false})
    //     console.log("platform: ", platform)
    // }

    createPoll(question, thumb, options) {
        this.setState({ loading: true})

        options = options.map(opt => Web3.utils.fromAscii(opt))
        this.state.platform.methods.createPoll(question, thumb || '', options ).send({from: this.state.account})

        this.setState({ loading: false})
    }

    vote(pollId, voteNumber) {
        this.setState({ loading: true})

        this.state.platform.methods.vote(pollId, voteNumber).send({from: this.state.account})
        console.log("State from vote: ", this.state)

        this.setState({ loading: false})
    }

    // getPolls() {
    //
    //     // function normalizeVoter(rawVoter) {
    //     //         return {
    //     //             id: rawVoter[0],
    //     //             votedIds: rawVoter[1].map((id) => parseInt(id))
    //     //         }
    //     // }
    //     //
    //     // function normalizePoll(rawPoll, voter) {
    //     //     return {
    //     //         id: parseInt(rawPoll[0]),
    //     //         question: rawPoll[1],
    //     //         image: rawPoll[2],
    //     //         options: rawPoll[3].map((opt) => Web3.utils.toAscii(opt)).replace(/\u0000/g, ''),
    //     //         votes: rawPoll[4].map((n) => parseInt(n)),
    //     //         voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(rawPoll[0]) != undefined),
    //     //     }
    //     // }
    //
    //     console.log("State from getPolls: ", this.state)
    //     console.log(this.state.platform)
    //     const rawVoter = this.state.platform.methods.getVoter(this.state.account).call()
    //     const totalPolls = this.state.platform.methods.getTotalPolls().call()
    //     const voter = {
    //                     id: rawVoter[0],
    //                     votedIds: rawVoter[1].map((id) => parseInt(id))
    //     }
    //
    //     const polls = []
    //     for (let i=0; i<totalPolls; i++) {
    //         const rawPoll = this.state.platform.methods.getPoll(i).call()
    //         const poll = {
    //             id: parseInt(rawPoll[0]),
    //             question: rawPoll[1],
    //             image: rawPoll[2],
    //             options: rawPoll[3].map((opt) => Web3.utils.toAscii(opt)).replace(/\\u0000/g, ''),
    //             votes: rawPoll[4].map((n) => parseInt(n)),
    //             voted: voter.votedIds.length && voter.votedIds.find((votedId) => votedId === parseInt(rawPoll[0])),
    //         }
    //         polls.push(poll)
    //     }
    //
    //     return polls
    // }

    render() {
        console.log("app.js  Polls: ", this.state)
        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    <Jumbotron/>
                    <Switch>
                        {this.state.loading
                            ? <Route exact path={'/'}><div id="loader" className="text-center"><p className="text-center">Loading...</p></div></Route>
                            : <Route path={'/'} exact render={(props) => (
                                <Polls {...props}
                                       account={this.state.account}
                                       vote={this.vote}
                                       loading={this.state.loading}
                                    //Polls={this.state.polls}
                                />)}
                            />
                        }
                        <Route path={'/creation'} exact render={(props) => (
                            <FormPoll {...props}
                                      createPoll={this.createPoll}
                                      account={this.state.account}
                            />)}
                        />
                    </Switch>
                </BrowserRouter>

            </div>
        ) ;
    }
}

export default App;

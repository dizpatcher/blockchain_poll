import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar} from "./components/navbar";
import {Jumbotron} from "./components/jumbotron";
import Polls from "./pages/polls"
import FormPoll from "./pages/formpoll";

import './App.css';
import Web3 from "web3";
import fromAscii from 'web3-utils';
import Contract from "./blockchain/contract.json";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            loading: true,
        }

        this.createPoll = this.createPoll.bind(this)
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Браузер не подддерживает Эфириум. Установите Метамаск')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        console.log(this.state.account)

        const platform = new web3.eth.Contract(Contract.abi, Contract.address)
        this.setState({platform})
        this.setState({loading: false})
        console.log(platform)
    }

    createPoll(question, thumb, options) {
        options = options.map(opt => Web3.utils.fromAscii(opt))
        this.state.platform.methods.createPoll(question, thumb || '', options ).send({from: this.state.account})
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    <Jumbotron/>
                    <Switch>
                        <Route path={'/'} exact render={(props) => (
                            <Polls {...props}
                                   account={this.state.account}
                            />)}
                        />
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

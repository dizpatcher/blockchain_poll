import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Navbar} from "./components/navbar";
import {Jumbotron} from "./components/jumbotron";
import {Polls} from "./pages/polls"
import {Creation} from "./pages/poll_creation"

import './App.css';

function App() {

    return (
    <div className="App">
        <BrowserRouter>
        <Navbar/>
        <Jumbotron/>
        <Switch>
            <Route path={'/'} exact component={Polls}/>
            <Route path={'/creation'} exact component={Creation}/>
        </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;

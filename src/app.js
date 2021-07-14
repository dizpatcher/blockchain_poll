import {Navbar} from "./components/navbar";
import {Jumbotron} from "./components/jumbotron";
import {Content} from "./components/content";
import FormPoll from "./components/formpoll";
import './App.css';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Jumbotron/>
        <FormPoll/>
        <Content/>
    </div>
  );
}

export default App;

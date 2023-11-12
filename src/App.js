import logo from './logo.svg';
import './App.css';
import Hello from './Component';
import {root} from './index';

function App() {    
  return (
    <div className="App">
      <header className="App-header">
        <div id="div">
          <h1 id="title">React</h1>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        <br/>
          Learn React
        </a>
        <br/>
        <button id="nextButton" onClick={handleClick}>Next</button>
      </header>
    </div>
  );
}

function handleClick() {
  root.render(<Hello/>);
} 

export default App;
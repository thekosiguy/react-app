import blank_face from './blank_face.png'
import speaker from './assets/speaker.png'
import './App.css';
import RandomPage from './RandomPage';
import {root} from './index';
import useSound from 'use-sound';
import wooow from './assets/wooow.mp3';

function App() {    
  const [playSound] = useSound(wooow);

  return (
    <div className="App">
      <header className="App-header">
        <div id="div">
          <h1 id="title">Random App ;) Made For Fun...Yup.</h1>
        </div>
        <br/>
        <img src={blank_face} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: 'none'}}
        >
        <br/>
          <p id="reactLink">React Stuff Yea??</p>
        </a>
        <button id="nextButton" onClick={handleClick}>Next!</button>
        <div className="speakerContainer">
          <img id="speaker" src={speaker} onClick={playSound} width={60} height={60} alt="speaker"/>
        </div>
      </header>
    </div>
  );
}

function handleClick() {
  root.render(<RandomPage/>);
} 

export default App;
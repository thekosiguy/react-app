import {root} from './index';
import RandomPage from './RandomPage';
import { React } from 'react'
import { createClient } from 'pexels';
import { Player, BigPlayButton } from 'video-react'
import blank_face from './blank_face.png'
import {useState} from 'react'
import "../node_modules/video-react/dist/video-react.css";

const client = createClient(process.env.REACT_APP_pexels_api_key);

const getVideoURL = async () => {
    let randomPage = Math.floor((Math.random() * 400486)) + 1 
    let response = await client.videos.popular({ per_page: 1, page: randomPage, videoHeight : 500, videoWidth: 1000});
    let url = await response.videos[0].video_files[1].link;
    return url
}

let initialVid = false;

function RandomPage2() {
   let [videoURL, setURL] = useState("");

    const randomVid = async () => {
      let url = await getVideoURL();
      setURL(url);
    }

    if (initialVid === false) {
      randomVid();
      initialVid = true;
    }

    return (
        <div className="randomPage2">
            <h1 style={{fontSize: "60px", textAlign : "center", fontStyle: "italic", color: "red", background : "limegreen", border : "10px solid black"}}>Heyo. Heyo.</h1>
            <div id="player">
              <Player
                  playsInline
                  poster={blank_face}
                  src={videoURL}
                  fluid={false}
                  height={500}
                  width={1000}>
                  <BigPlayButton position="center"/>
              </Player>
            </div>;
            <br/><br/><br/>
            <button id="newVidButton" onClick={randomVid}>Random Vid!</button>
            <br/>
            <button id="backButton" onClick={handleClick}>Back!</button>
        </div>
      );
}

function handleClick() {
  root.render(<RandomPage/>);
}     
  
export default RandomPage2;
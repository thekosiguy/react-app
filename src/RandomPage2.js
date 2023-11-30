import {root} from './index';
import RandomPage from './RandomPage';
import { React } from 'react'
import { createClient } from 'pexels';
import { Player, BigPlayButton} from 'video-react'
import Sea from './assets/Sea2.mp4'
import blank_face from './blank_face.png'
import "../node_modules/video-react/dist/video-react.css";

const client = createClient('TCUDvDLIQ8KlFIy2Zl2caBClPw5lHOHCDI0TvpB04rv8vJmkiHvHTPg6');

function RandomPage2() {
  client.videos.popular({ per_page: 1 }).then(videos => {});
      return (
        <div className="randomPage2">
            <h1 style={{fontSize: "60px", textAlign : "center", fontStyle: "italic", color: "red", background : "limegreen", border : "10px solid black"}}>Heyo. Heyo.</h1>
            <div id="player">
              <Player
                  playsInline
                  autoPlay={true}
                  poster={blank_face}
                  src={Sea}>
                  <BigPlayButton position="center"/>
                </Player>
            </div>
            <br/><br/><br/>
            <button id="backButton" onClick={handleClick}>Back!</button>
        </div>
      );
}

function handleClick() {
  root.render(<RandomPage/>);
}   
  
export default RandomPage2;
import {root} from './index';
import RandomPage2 from './RandomPage2';
import {Helmet} from 'react-helmet';
import techno from './Image/Techno.jpg';
import swal from 'sweetalert2';
import {useState} from 'react';
import useSound from 'use-sound';
import speaker from './assets/speaker.png'
import aaah_yeete from './assets/aaah_yeete.mp3';

function RandomPage() {
  let count = 0, score = 0;
  const listOfOperators = ["+", "-", "*", "/"];
  let operator, firstVal, secVal, answer;

  let [imageURL, setURL] = useState(techno);
  let [imageAlt, setAlt] = useState("random_image");
  let [category, setCategory] = useState("nature");
  let [background, setBackground] = useState("randomPage default");

  let blobURL;
  let backgroundValue = 1;
  const buttonBackground = {background: "yellow"};
  const border = {border: "thick solid black"};

  const getImage = async () => {
    try{
      const imageData = await fetch('https://api.api-ninjas.com/v1/randomimage?category=' + category, {
      headers: {
        'Accept': 'image/jpg',
        'X-Api-Key': 'jLa8OLVwSKLXntiOBkooRw==lFaSI0n5kEj1MDaa',
      }
      });

      const blob = await imageData.blob();
      blobURL = URL.createObjectURL(blob);
      setURL(imageURL = blobURL);
      setAlt(imageAlt = 'random_image');

    } catch (error) {
        console.log('Error: ', error);
    }
  }

  function increment() {
    operator = listOfOperators[Math.floor(Math.random() * 3)];
    firstVal = Math.floor(Math.random() * 15) + 1;
    secVal = Math.floor(Math.random() * 15) + 1;
    answer = eval(firstVal + operator + secVal);

    if (count % 10 === 0 && count !== 0) {
      swal.fire("Fun Title...", "Checkpoint! well done you..", "success");
    } else {
      swal.fire({
        title: "Question time!",
        input: "text",
        inputLabel: "What's " + firstVal + " " + operator + " " + secVal + "?", 
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Input something!';
          }
        }
      }).then((result) => {
        if (!result.isDismissed){
          if (result.value == answer) {
            score++;
            swal.fire("Yay!", "Well done champ!", "success");
          } else {
              if (!result.isDismissed) {
                score--;
                swal.fire("Sad times..", "Wrong answer mate..", "error");
            }
          }

        document.getElementById("score").innerHTML = score;
        }
      })
    }

    count++;
    document.getElementById("value").innerHTML = count;
   }

   const handleChange = (event) => {
    setCategory(event.target.value)
    getImage();
   }

   const changeThemeButton = () => {
      let randValue;

      do {
        randValue = Math.floor((Math.random() * 7)) + 1 
      } while (randValue ===  backgroundValue);

      backgroundValue = randValue;

      switch(backgroundValue) {
        case 1:
          setBackground("randomPage ".concat("default"));
          break;
        case 2:
          setBackground("randomPage ".concat("randomTheme"));
          break;
        case 3:
          setBackground("randomPage ".concat("randomTheme2"));
          break;
        case 4:
          setBackground("randomPage ".concat("randomTheme3"));
          break;
        case 5:
          setBackground("randomPage ".concat("randomTheme4"));
          break;
        case 6:
          setBackground("randomPage ".concat("randomTheme5"));
          break;
        default:
          break;
      }
   }

   const [playSound] = useSound(aaah_yeete);

   const getMap = (nameOfPlace) => {
    var requestOptions = {
      method: 'GET',
    };

    let longitude, latitude, coordinates, searchAgain;
    
    if (nameOfPlace.value.length === undefined) {
      swal.fire("BIG BOI!", "Enter something..-_-", "error");
    } else {
      fetch ("https://api.geoapify.com/v1/geocode/search?text="+nameOfPlace.value+"&lang=en&lim=1&type=city&apiKey=a8acdb5f74644df0a4925021bd354663", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result !== undefined) {
            if (result.features.length > 0) {
              document.getElementById("mapInput").setAttribute("hidden", "hidden");
                document.getElementById("mapDiv").removeAttribute("hidden");
                const map = new window.Microsoft.Maps.Map("#mapDiv");

                longitude = result.features[0].geometry.coordinates[0];
                latitude = result.features[0].geometry.coordinates[1];
                console.log(latitude)

                navigator.geolocation.getCurrentPosition(function (position) {
                  var loc = new window.Microsoft.Maps.Location(
                      latitude,
                      longitude);

                var pin = new window.Microsoft.Maps.Pushpin(loc);
                map.entities.push(pin);
              
                map.setView({ center: loc, zoom: 10 })});
                
                searchAgain = document.createElement("button");
                searchAgain.textContent = "Search Again!";
                searchAgain.setAttribute("id", "searchButton");
                searchAgain.addEventListener("click", () => {
                  document.getElementById("mapDiv").setAttribute("hidden", "hidden");
                  document.getElementById("mapInput").removeAttribute("hidden");
                  document.getElementById("searchButton").remove();
                })
                document.body.appendChild(searchAgain);
            } else {
                swal.fire("Wrong :/", "Enter valid name of city or landmark!", "error");
            }
          }
        })
        .catch(error => {
          swal.fire("HMMM..", "Something fucked up happened..shieeeet.", "error")
          console.log("Error", error);
        });
      }
    }

    function nextPage() {
      root.render(<RandomPage2/>);
    } 

    return (
      <div className={background}>
        <Helmet>
          <script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?callback=GetMap&userLocation=48.8584,2.2945&key=AqaMjsyOpg5niS9Tyb6APJ_6I8JBrWZdb_HOK2ot-d8m357jJXalI3Xl7W2rAJf5'></script>
        </Helmet>
        <h2 id="randomHeader">Random <span id="pageHeader">Page!</span></h2>
        <br/>
        <select id="options" onChange={handleChange}>
          <option value="nature">Nature</option>
          <option value="city">City</option>
          <option value="technology">Tech</option>
          <option value="food">Food</option>
          <option value="still_life">Still Life</option>
          <option value="abstract">Abstract</option>
          <option value="wildlife">Wildlife</option>
        </select>
        <br/>
        <img src={imageURL} onClick={getImage} className="Image" width={550} height={500} alt={imageAlt} />
        <br />
        <button id="changeThemeButton" onClick={changeThemeButton}>Random Theme!</button>
        <a
          className="App-link"
          href="./index"
          rel="noopener noreferrer"
        >
        <p style={{...buttonBackground, ...border}}>Back</p>
        </a>
        <div className="speakerContainer">
          <img id="speaker" src={speaker} onClick={playSound} width={60} height={60} alt="speaker"/>
        </div>
        <br />
        <div className="countDiv">
          <p id="buttonGameTitle">Mini Button Game! :)</p>
          <p id="value">{count}</p>
          <p id="scoreEl">Score: <span id="score">{score}</span></p>
          <button id="incrementButton" onClick={increment}>Go!</button>
        </div>
        <div id="mapDiv"></div>
        <div id="mapInput">
          <input id="nameOfPlace" type="text" placeholder="Name of city or landmark.." />
          <br /><br />
         <button id="mapButton" onClick={() => getMap(document.getElementById("nameOfPlace"))}>Map Map Map!</button>
        </div>
        <button id="next" onClick={nextPage}>Next Page!</button>
      </div>
    );
}

export default RandomPage;
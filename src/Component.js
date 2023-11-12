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
      console.log("clicked")
      let randValue;

      do {
        randValue = Math.floor((Math.random() * 4)) + 1 
      } while (randValue ===  backgroundValue);

      backgroundValue = randValue;
      console.log(backgroundValue)

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
        default:
          break;
      }
   }

   const [playSound] = useSound(aaah_yeete);

    return (
      <div className={background}>
          <h2 id="randomHeader">Random <span id="pageHeader">Page!</span></h2>
        <br/>
        <select id="options" onChange={handleChange}>
          <option value="nature">Nature</option>
          <option value="city">City</option>
          <option value="technology">Tech</option>
          <option value="food">Food</option>
          <option value="still_life">Still Life</option>
          <option value="abstract">Abstract</option>
          <option value="wildlife">wildlife</option>
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
        <br />
        <div className="countDiv">
          <p id="buttonGameTitle">Mini Button Game! :)</p>
          <p id="value">{count}</p>
          <p id="scoreEl">Score: <span id="score">{score}</span></p>
          <button id="incrementButton" onClick={increment}>Go!</button>
        </div>
        <div className="speakerContainer">
          <img id="speaker" src={speaker} onClick={playSound} width={60} height={60} alt="speaker"/>
        </div>
      </div>
    );
}

export default RandomPage;
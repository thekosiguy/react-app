import techno from './Image/Techno.jpg';
import swal from 'sweetalert2';
import {useState} from 'react';

function Hello() {
  let count = 0, score = 0;
  const listOfOperators = ["+", "-", "*", "/"];
  let operator, input, firstVal, secVal, answer;

  let [imageURL, setURL] = useState(techno);
  let [imageAlt, setAlt] = useState("random_image");
  let [category, setCategory] = useState("nature");

  let blobURL;

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
      swal.fire("Fun Title", "Checkpoint! well done you..", "success");
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
        if (result.value == answer) {
          score++;
          document.getElementById("score").innerHTML = score;
          swal.fire("Yay!", "Well done champ!", "success");
      } else {
          swal.fire("Sad times..", "Wrong answer mate..", "error");
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

    return (
      <div className="randomPage">
        <h1 id="randomHeader">Random <span id="imagesHeader">Images!</span></h1>
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
        <img src={imageURL} onClick={getImage} className="Image" width={600} height={400} alt={imageAlt} />
        <a
          className="App-link"
          href="./index"
          rel="noopener noreferrer"
        >
        <br />
          Back
        </a>
        <br />
        <div className="countDiv">
          <p id="buttonGameTitle">Mini Button Game!</p>
          <p id="value">{count}</p>
        </div>
        <br/>
        <button id="button" onClick={increment}>Increment!</button>
        <div id="scoreDiv"><h3 id="scoreEl">Score: <span id="score">{score}</span></h3></div>
      </div>
    );
}

export default Hello;
const url = "https://opentdb.com/api.php?amount=10"
let cards 
const triviaContainer = document.querySelector(".triviaContainer");
let score = 0
let card = document.querySelector(".child")
let counter = 0
let scoreDiv = document.querySelector(".scoreDiv")
let correctBtn = document.getElementsByClassName("correct")
let wrongBtn = document.getElementsByClassName("wrong")
let nextBtn = document.querySelector(".next")
let scoreCounter = document.querySelector(".scoreCounter")
let triviaTitle = document.querySelector(".triviaTitle")
let endDiv = document.querySelector(".endDiv")

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    // console.log(res.results[0].category)
    cards = res.results
    for (let i = 0; i < res.results.length; i++){
      triviaCard()
    }

    function triviaCard() {

      let htmlTemplate = `
          <div class="template">
              <h2>${cards[counter].category}</h2>
              <p>Question: ${cards[counter].question}</p>
              <button class="correct">${cards[counter].correct_answer}</button>
              <button class="wrong">${cards[counter].incorrect_answers[0]}</button>
              <button class="wrong">${cards[counter].incorrect_answers[1]}</button>
              <button class="wrong">${cards[counter].incorrect_answers[2]}</button>
          </div>
          `;
    
      triviaContainer.removeChild(triviaContainer.firstElementChild)
      triviaContainer.insertAdjacentHTML("beforeend", htmlTemplate);
    }
    document.addEventListener("click", e => {
      if (e.target.matches(".next")) {
  
        counter++
        triviaCard()
      } else if (counter === 10) {
        triviaContainer.removeChild(triviaContainer.firstElementChild)
        gameOver()
      }
      
    })
  })

  .catch((error) => {
    console.error("Something went wrong...", error);
  });


  document.addEventListener("click", e => {
    if (e.target.matches(".correct")) {
      score++
      scoreDiv.innerHTML = `Score: ${score}`
      // this.classList.add("green")
    } else {
      // this.classList.add("red")
    }

    for(let i = 0; i < wrongBtn.length; i++)
    {
        wrongBtn[i].classList.add('red');
    }

    for(let i = 0; i < correctBtn.length; i++)
    {
        correctBtn[i].classList.add('green');
    }
  })

console.log(counter)

function gameOver() {
      
    let finalScore = `
      <h1> Game Over!</h1>
      <p> Your Score: ${score} out of 10</p>
    `;

    nextBtn.classList.add("hide")
    triviaTitle.classList.add("hide")
    scoreDiv.classList.add("hide")
    
    endDiv.insertAdjacentHTML("afterend", finalScore);
    }



  // console.log(score)

  //push api data into trivia card
  //put answers into buttons
  //one button has point, all others 0
  //turn incorrect buttons red after answer selected
  //10 questions, score of 8 passes (levels?)
  //refresh button for new questions
  //gold tier: skip question, track score even on reload

  //if counter = 10, game over
  //show score and comment

  //fix 11 out of ten. only allow score to go up once per question




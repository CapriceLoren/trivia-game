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
let refreshBtn = document.querySelector(".refresh")
let triviaBtn = document.getElementsByClassName("triviaBtn")

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    cards = res.results
    for (let i = 0; i < res.results.length; i++){
      triviaCard()
    }

    function triviaCard() {
      let additionalHTML = () => {
        if (cards[counter].type === "multiple") {
          return (
            `
              <button class="triviaBtn wrong">${cards[counter].incorrect_answers[1]}</button>
              <button class="triviaBtn wrong">${cards[counter].incorrect_answers[2]}</button>
            `
          )
        } else {
          return ""
        }
      }

      let htmlTemplate = `
          <div class="template">
              <h2>${cards[counter].category}</h2>
              <p>Question: ${cards[counter].question}</p>
              <button class="triviaBtn correct">${cards[counter].correct_answer}</button>
              <button class="triviaBtn wrong">${cards[counter].incorrect_answers[0]}</button>
              ${additionalHTML()}
          </div>
          `;
      
      triviaContainer.removeChild(triviaContainer.firstElementChild)
      triviaContainer.insertAdjacentHTML("beforeend", htmlTemplate);
    }
    document.addEventListener("click", e => {
      if (e.target.matches(".next")) {
  
        counter++
        triviaCard()
      } else if (counter === 9) {
        setTimeout(removeContainer, 2000)

        function removeContainer () {
        triviaContainer.removeChild(triviaContainer.firstElementChild)}
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

function gameOver() {
      
  let finalScore = `
    <div class = "final">
      <h1> Game Over!</h1>
      <p> Your Score: ${score} out of 10</p>
    </div>
    `;
  
    refreshBtn.classList.remove("hide")
    nextBtn.classList.add("hide")
    triviaTitle.classList.add("hide")
    scoreDiv.classList.add("hide")
    
    endDiv.insertAdjacentHTML("afterend", finalScore);
}
    
document.addEventListener("click", e => {
  if (e.target.matches(".refresh")) {
    window.location.reload();
  }
})




  // center triva buttons
  // put padding around trivia buttons
  // randomize trivia buttons
  // change button hover




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
      } else if (counter === 9) {
        setTimeout(removeContainer, 2000)

        function removeContainer () {
        triviaContainer.removeChild(triviaContainer.firstElementChild)}
        gameOver()
      }
      console.log(counter)
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
      <h1> Game Over!</h1>
      <p> Your Score: ${score} out of 10</p>

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

console.log(refreshBtn)


  // console.log(score)


  // center triva and refresh buttons
  // put padding around trivia buttons




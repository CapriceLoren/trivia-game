const url = "https://opentdb.com/api.php?amount=10"
let cards 
const triviaContainer = document.querySelector(".triviaContainer");
let score = 0
let card = document.querySelector(".child")
let counter = 0
let scoreDiv = document.querySelector(".scoreDiv")
let correctBtn = document.getElementsByClassName("correct")
let wrongBtn = document.getElementsByClassName("wrong")

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
              <h2>${cards[0].category}</h2>
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
    console.log(wrongBtn)

    for(let i = 0; i < wrongBtn.length; i++)
    {
        wrongBtn[i].classList.add('red');
    }

    for(let i = 0; i < correctBtn.length; i++)
    {
        correctBtn[i].classList.add('green');
    }

  })



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




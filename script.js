const url = "https://opentdb.com/api.php?amount=10"
let cards 
const triviaContainer = document.querySelector(".triviaContainer");
console.log(typeof triviaContainer)
let score = 0
let card = document.querySelector(".child")
let counter = 0
let scoreDiv = document.querySelector(".scoreDiv")

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
              <h1>${cards[0].category}</h1>
              <p>Question: ${cards[counter].question}</p>
              <button class="correct">${cards[counter].correct_answer}<button>
              <button>${cards[counter].incorrect_answers[0]}</button>
              <button>${cards[counter].incorrect_answers[1]}</button>
              <button>${cards[counter].incorrect_answers[2]}</button>
          </div>
          `;
    
      
      triviaContainer.removeChild(triviaContainer.firstElementChild)
      triviaContainer.insertAdjacentHTML("beforeend", htmlTemplate);
    }

    // function counterInt() {
    //   counter++
    // }
      
    document.addEventListener("click", e => {
      if (e.target.matches(".correct")) {
        score++
        scoreDiv.innerHTML = `Score: ${score}`
        // this.classList.add("green")
      } else {
        // this.classList.add("red")
      }

      // counter++
      // triviaCard()

    })

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

  // console.log(score)

  //push api data into trivia card
  //put answers into buttons
  //one button has point, all others 0
  //turn incorrect buttons red after answer selected
  //10 questions, score of 8 passes (levels?)
  //refresh button for new questions
  //gold tier: skip question, track score even on reload




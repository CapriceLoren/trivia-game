const url = "https://opentdb.com/api.php?amount=10"

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    // console.log(res.results)
    triviaCard(res.results)
    })
  .catch((error) => {
    console.error("Something went wrong...", error);
  });

  //push api data into trivia card
  //put answers into buttons
  //one button has point, all others 0
  //turn incorrect buttons red after answer selected
  //10 questions, score of 8 passes (levels?)
  //refresh button for new questions
  //gold tier: skip question, track score even on reload


const triviaContainer = document.querySelector(".triviaContainer");



function triviaCard(arr) {
  console.log(arr)
  arr.forEach((data) => {
    let htmlTemplate = `
        <h1>${data.category}</h1>
        <p>Question: ${data.question}</p>
        <button>${data.correct_answer}<button>
        <button>${data.incorrect_answers[0]}</button>
        <button>${data.incorrect_answers[1]}</button>
        <button>${data.incorrect_answers[2]}</button>
      </div>
    `;

  triviaContainer.insertAdjacentHTML("afterend", htmlTemplate);
});
}

// triviaCard()
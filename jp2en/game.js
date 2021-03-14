const card = document.getElementById('card');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const progreeText = document.querySelector('#progressText');
const progreeBarFull = document.querySelector('#progreeBarFull');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let maxQuestions = 0;
let param = "";
let incorrectAnswers = [];

startGame = () => {
    localStorage.clear();
    questionCounter = 0;
    score = 0;
    param = location.search.match(/\d+/gi);
    availableQuestions = questions[param];
    maxQuestions = availableQuestions.sentence.length;
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.sentence.length === 0 || questionCounter > maxQuestions) {
        const result = {
          chapter: parseInt(param, 10)+1,
          incorrect: incorrectAnswers.sort()
        }
        localStorage.setItem('result', JSON.stringify(result));
        return window.location.assign('./end.html');
    }
    if (card.className === 'open') {
      card.addEventListener('transitionend', setCard);
      flipCard();
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.sentence.length);
    currentQuestion = availableQuestions.sentence[questionsIndex];
    incorrectAnswers.push(currentQuestion.question);
    setCard(currentQuestion);

    availableQuestions.sentence.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

setCard = currentQuestion => {
  cardFront.innerHTML = currentQuestion.jp;
  cardBack.innerHTML = currentQuestion.answer;
  card.removeEventListener('transitionend', setCard);
}

flipCard = () => {
  card.className = card.className === '' ? 'open' : '';
}

startGame();

card.addEventListener('click', () => {
  flipCard();
})

correct.addEventListener('click', () => {
  incorrectAnswers.pop();
  getNewQuestion();
})

incorrect.addEventListener('click', () => {
  getNewQuestion();
})

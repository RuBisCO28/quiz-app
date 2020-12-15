const question = document.querySelector('#question');
const progreeText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progreeBarFull = document.querySelector('#progreeBarFull');
const check = document.getElementById('check');
const next = document.getElementById('next');

let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let maxQuestions = 0;
let param = "";

const SCORE_POINTS = 100;

startGame = () => {
    questionCounter = 0;
    score = 0;
    param = location.search.substring(4,5);
    availableQuestions = questions[param];
    maxQuestions = availableQuestions.sentence.length;
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.sentence.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.sentence.length);
    currentQuestion = availableQuestions.sentence[questionsIndex];

    let audio = document.createElement('audio');
    audio.src = currentQuestion.question;
    audio.controls = true;
    question.appendChild(audio);

    availableQuestions.sentence.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

checkAnswer = () => {
    const myAnswer = document.getElementById("msheet").value;
    let judge = myAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if(judge === 'correct') {
        incrementScore(SCORE_POINTS);
    }
    document.getElementById("asheet").value = judge + '\n' + currentQuestion.answer + '\n' + currentQuestion.jp;
}

nextQuestion = () => {
    getNewQuestion();
    question.removeChild(question.firstChild);
    document.getElementById("msheet").value = "";
    document.getElementById("asheet").value = "";
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();

check.addEventListener('click', () => {
    checkAnswer();
})

next.addEventListener('click', () => {
    nextQuestion();
})
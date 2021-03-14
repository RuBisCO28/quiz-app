const saveScoreBtn = document.querySelector('#saveScoreBtn');
const forCopy = document.getElementById('forcopy');
const result = localStorage.getItem('result');

forCopy.innerHTML = result;

saveScore = e => {
    //e.preventDefault()

    //console.log(JSON.parse(localStorage.getItem('result')));

    //localStorage.setItem('highScores',JSON.stringify(highScores))
    //window.location.assign('./index.html')
}

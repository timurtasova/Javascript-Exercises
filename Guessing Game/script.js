"use strict";

//      Variables
let score = document.getElementById("score");
let highscore = document.getElementById("highscore");
let realNumber = document.getElementById("real-number");
const reset = document.getElementById("reset");
const gameTitle = document.getElementById("game-title");
const secretNumber = document.getElementById("secret-number");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
let showcase = document.getElementById(".showcase");

let currentScore = 0;
let currentHighscore = 0;

if(!localStorage.getItem("liveScore") && !localStorage.getItem("liveHighscore")){
    score.textContent = 0;
    highscore.textContent = 0;
}
else if(localStorage.getItem("liveScore") && !localStorage.getItem("liveHighscore")){
highscore.textContent = 0;
score.textContent = localStorage.getItem("liveScore");
}
else if(localStorage.getItem("liveScore") && localStorage.getItem("liveHighscore")) {
    score.textContent = localStorage.getItem("liveScore");
    highscore.textContent = localStorage.getItem("liveHighscore");
}


card1.addEventListener("click", guessNum);
card2.addEventListener("click", guessNum);
card3.addEventListener("click", guessNum);
reset.addEventListener("click", resetGame);

randomNum();
function guessNum(){
    currentScore = localStorage.getItem("liveScore");
    if(!localStorage.getItem("liveHighscore")){
        currentHighscore = 0;
    }
    else{
        currentHighscore = localStorage.getItem("liveHighscore");
    }
    if(this.textContent == realNumber.textContent){
        secretNumber.classList.add("alert-success");
        secretNumber.classList.remove("alert-danger");
        score.parentElement.classList.add("alert-success");
        score.parentElement.classList.remove("alert-danger");
        currentScore++;
        if(currentScore > currentHighscore){
            currentHighscore = currentScore;
            localStorage.setItem("liveHighscore", currentHighscore);
        }
        localStorage.setItem("liveScore", currentScore);
        
    }
    else{
        secretNumber.classList.add("alert-danger");
        secretNumber.classList.remove("alert-success");
        score.parentElement.classList.remove("alert-success");
        score.parentElement.classList.add("alert-danger");
        currentScore--;
        localStorage.setItem("liveScore", currentScore);
    }
    score.textContent = currentScore;
    highscore.textContent = currentHighscore;
    randomNum();

}


function randomNum(){
    let num = Math.random()*3;
    return realNumber.textContent = Math.ceil(num); 
}

function resetGame(){
    currentHighscore = 0;
    currentScore = 0;
    score.textContent = 0;
    highscore.textContent= 0;
    localStorage.clear();
}
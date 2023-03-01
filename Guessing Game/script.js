"use strict";

let checkBtn = document.getElementById("check");
let answer = document.getElementById("mark");
let input = document.getElementById("input-area");
let score = document.getElementById("score-data");
let highScore = document.getElementById("high-score-data");
let restartBtn = document.getElementById("restart");
let GameZone = document.querySelector(".game-zone");
let alert = document.querySelector(".alert");
let score_box = document.getElementById("score");

let userScore = 0;
let userHighScore = 0


restartBtn.addEventListener("click", function(){
    window.location.reload();
})

checkBtn.addEventListener("click", startChallenge);

function startChallenge(event){
    event.preventDefault();
    if(input.value){
        if(input.value > 0 && input.value < 4){
            alert.classList.add("inactive");
            randomNumber();
                    
        }
        else {
            alert.classList.remove("inactive");
        }
    }
}

function randomNumber(){
    let num = Math.random()*3
    num = Math.ceil(num);
    console.log(num);
    if(input.value == num){
        answer.innerHTML = `
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">${num}</span>
        </div>`;
        userScore++;
        score.innerHTML = userScore;
        if(userScore > userHighScore){
            userHighScore = userScore;
        }
        highScore.innerHTML = userHighScore;
        if(userScore < 0){
            score_box.classList.remove("bg-success");
            score_box.classList.add("bg-danger");
        } 
        else {
            score_box.classList.remove("bg-danger");
            score_box.classList.add("bg-success");
        }
    }
    else {
        answer.innerHTML = `
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">${num}</span>
        </div>`;
        userScore--;
        score.innerHTML = userScore;
        highScore.innerHTML = userHighScore;
        if(userScore < 0){
            score_box.classList.remove("bg-success");
            score_box.classList.add("bg-danger");
        } 
        else {
            score_box.classList.remove("bg-danger");
            score_box.classList.add("bg-success");
        }
    }

    return num;
}


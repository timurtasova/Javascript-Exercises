"use strict";

//                      ---QUIZ DATA---

const htmlQuizData = [
    {
        question: "What is HTML?",
        a: "HTML describes the structure of a webpage",
        b: "HTML is the standard markup language mainly used to create web pages",
        c: "HTML consists of a set of elements that helps the browser how to view the content",
        d: "All of the mentioned",
        correct: "d"
    },
    {
        question: "What is the correct syntax of doctype in HTML5?",
        a: "</doctype html>",
        b: "<doctype html>",
        c: "<doctype html!>",
        d: "<!doctype html>",
        correct: "d"
    },
    {
        question: "HTML stands for __________",
        a: "HyperText Markup Language",
        b: "HyperText Machine Language",
        c: "HyperText Marking Language",
        d: "HighText Marking Language",
        correct: "a"
    },
    {
        question: "Which of the following is used to read an HTML page and render it?",
        a: "Web server",
        b: "Web network",
        c: "Web browser",
        d: "Web matrix",
        correct: "c"
    },
    {
        question: "What is DOM in HTML?",
        a: "Language dependent application programming",
        b: "Hierarchy of objects in ASP.NET",
        c: "Application programming interface",
        d: "Convention for representing and interacting with objects in html documents",
        correct: "d"
    }

];

const cssQuizData = [
    {
        question: "What is CSS?",
        a: "CSS is a style sheet language",
        b: "CSS is designed to separate the presentation and content, including layout, colors, and fonts",
        c: "CSS is the language used to style the HTML documents",
        d: "All of the mentioned",
        correct: "d"
    },
    {
        question: "Which of the following tag is used to embed css in html page?",
        a: "<css>",
        b: "<!DOCTYPE html>",
        c: "<style>",
        d: "<script>",
        correct: "c"
    },
    {
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        a: "tag",
        b: "id",
        c: "class",
        d: "both class and tag",
        correct: "c"
    },
    {
        question: "Which of the following CSS framework is used to create a responsive design?",
        a: "django",
        b: "rails",
        c: "larawell",
        d: "bootstrap",
        correct: "d"
    },
    {
        question: "Which of the following CSS property is used to make the text bold?",
        a: "text-decoration: bold",
        b: "font-weight: bold",
        c: "font-style: bold",
        d: "text-align: bold",
        correct: "b"
    }
];

const jsQuizData = [
    {
        question: "Which of the following is correct about JavaScript?",
        a: "JavaScript is an Object-Based language",
        b: "JavaScript is Assembly-language",
        c: "JavaScript is an Object-Oriented language",
        d: "JavaScript is a High-level language",
        correct: "a"
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        a: "It is an ordered list of values",
        b: "It is an ordered list of objects",
        c: "It is an ordered list of string",
        d: "It is an ordered list of functions",
        correct: "a"
    },
    {
        question: "Which of the following is not javascript data types?",
        a: "Null type",
        b: "Undefined type",
        c: "Number type",
        d: "All of the mentioned",
        correct: "d"
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        a: "Position",
        b: "Window",
        c: "Standard",
        d: "Location",
        correct: "b"
    },
    {
        question: "Which of the following can be used to call a JavaScript Code Snippet?",
        a: "Function/Method",
        b: "Preprocessor",
        c: "Triggering Event",
        d: "RMI",
        correct: "a"
    }
];

const sqlQuizData = [
    {
        question: "What is SQL Server?",
        a: "SQL Server is a relational database management system",
        b: "SQL Server is a software whose main purpose is to store and retrieve data",
        c: "SQL Server is a highly secure server and does not allow any database file manipulation during execution",
        d: "All of the mentioned",
        correct: "a"
    },
    {
        question: "When was the first version of Microsoft SQL Server released?",
        a: "1991",
        b: "1990",
        c: "1988",
        d: "1983",
        correct: "c"
    },
    {
        question: "Which database is used by SQL Server Agent for scheduling alerts and jobs, and recording operators?",
        a: "temp",
        b: "model",
        c: "msdb",
        d: "master",
        correct: "c"
    },
    {
        question: "Which of the stored procedure is used to test the SQL injection attack?",
        a: "xp_reg",
        b: "xp_write",
        c: "xp_regwrite",
        d: "all of the mentioned",
        correct: "c"
    },
    {
        question: "Backing up your SQL Server database is essential for _______ your data.",
        a: "replication",
        b: "protecting",
        c: "preventing",
        d: "none of the mentioned",
        correct: "b"
    }
];




//                      ---FORM SECTION---

//      Form Variables
const alert = document.getElementById("alert");
const starter = document.querySelector(".btn-start");
const btnStart = document.getElementById("btnStart");
const startText = document.getElementById("start-text");
const submit = document.getElementById("submit");

//      Form Actions
submit.addEventListener("click", submitUser);

const userName = document.getElementById("userName");
const userSurname = document.getElementById("userSurname");
const topic = document.getElementById("inputGroupSelect04");

function submitUser(){
    if(userName.value.length >= 3 && userSurname.value.length >= 3 && topic.value !== "Choose your topic.."){
        document.getElementById("form-card").classList.add("inactive");
        startText.innerText = `${topic.value}`;
        starter.classList.remove("inactive");
        userResultName.innerText = userName.value + " " + userSurname.value;
        alert.innerHTML = `<p id="alert-text" class="mb-0 alert alert-success"><strong>OOPS!</strong> You should check in on some of those fields above.</p>`
    }
    else{
        alert.innerHTML = `<p id="alert-text" class="mb-0 alert alert-danger"><strong>OOPS!</strong> You should check in on some of those fields above.</p>`
    }

}
//------------------------------------------------------------------------------------------

//                      ---QUIZ SECTION---


//      Quiz Variables
const quizCard = document.getElementById("quiz-card");
const quizTopic = document.getElementById("quiz-topic");
const question = document.getElementById("question");
const textA = document.getElementById("textA");
const textB = document.getElementById("textB");
const textC = document.getElementById("textC");
const textD = document.getElementById("textD");
const answers = document.querySelectorAll(".answer");
let score = 0;
let currentQuiz = 0;

//      Quiz Actions
btnStart.addEventListener("click", startQuiz);


function currentQuizData() {
    let quizFor;
    if(topic.value == "HTML"){ 
        quizTopic.innerText = topic.value; 
        quizFor = htmlQuizData; 
    }
    else if(topic.value == "CSS"){
         quizTopic.innerText = topic.value; 
         quizFor = cssQuizData; 
        }
    else if(topic.value == "JavaScript"){ 
        quizTopic.innerText = topic.value; 
        quizFor = jsQuizData; 
    }
    else if(topic.value == "SQL"){ 
        quizTopic.innerText = topic.value;
        quizFor = sqlQuizData;
    }
    return quizFor;
}

function startQuiz(){
    starter.classList.add("inactive");
    quizCard.classList.remove("inactive");
    deselectAnswers();
        question.innerText = currentQuizData()[currentQuiz].question;
        textA.innerText = currentQuizData()[currentQuiz].a;
        textB.innerText = currentQuizData()[currentQuiz].b;
        textC.innerText = currentQuizData()[currentQuiz].c;
        textD.innerText = currentQuizData()[currentQuiz].d;
}

function deselectAnswers() {
    answers.forEach(answer => answer.checked = false);
}

function selectedAnswer(){
    let selected;
    answers.forEach(answer => {
        if(answer.checked){
            selected = answer.id;
        }
    })
    return selected;
}


const btnNext = document.getElementById("next-question");

btnNext.addEventListener("click", nextQuestion);

function nextQuestion(){
    const answer = selectedAnswer();
    if(answer){
        if(answer == currentQuizData()[currentQuiz].correct){
            score++;
        }
        currentQuiz++;

        if(currentQuiz < currentQuizData().length){
            startQuiz();
        }
        else {
            quizCard.classList.add("inactive");
            resultCard.classList.remove("inactive");
            if(score <= 2){
                resultCard.classList.add("danger-bg");
                resultCard.classList.remove("success-bg")
                userResult.innerText = `Your result is ${score}/${currentQuiz} Sorry! You have not passed the exam :(`;
                currentQuiz = 0;
                score = 0;
            }
            else {
                resultCard.classList.add("success-bg");
                resultCard.classList.remove("danger-bg")
                userResult.innerText = `Your result is ${score}/${currentQuiz} Congratulations! you have passed the exam :)`;
                currentQuiz = 0;
                score = 0;
            }
        }
    }
}




//                      ---RESULT PANEL---


//      Result Panel Variables
const btnAnswer = document.querySelector(".btn-again");
const resultCard = document.querySelector(".card-result");
const userResultName = document.getElementById("user-info");
const userResult = document.getElementById("user-result");

//      Result Panel Actions

btnAnswer.addEventListener("click", showAnswer);

function showAnswer(){
    resultCard.classList.add("inactive");
    starter.classList.remove("inactive");

}



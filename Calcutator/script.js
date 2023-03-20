"use strict";

//  Variables
const screenDisplay = document.querySelector(".calc-screen");
const buttons = document.querySelectorAll(".actions button");
const number = document.querySelectorAll(".number");

//  Array: To keeping the inserted numbers
let numbers = [];

// Add Inserted Value
let addValue = function(button) {
    numbers.push(button.textContent);    
    screenDisplay.value = numbers.join("");
}
// Add "bg-danger" When false inserting
let danger = function() {
    screenDisplay.classList.add("danger");
    setTimeout(() => screenDisplay.classList.remove("danger"), 500);
}
// Calculate Total Value
let calculator = function(val) {
    return new Function( 'return (' + val + ')' )();
}

let dotCounter = 0;

// Mouse Event
buttons.forEach(button => button.addEventListener("click", () => calculate(button)));

// Keyboard Event
document.addEventListener("keydown", (e) => {
    // Keyboard event controller
    if(e.key === "Backspace"){
        calculate(document.querySelector("#delete"));
    }
    else if(e.key === "Enter"){
        calculate(document.querySelector("#equal"));
    }
    else if(e.key === "Escape"){
        calculate(document.querySelector("#clear"));
    }
    else if(e.key === ","){
        calculate(document.querySelector("#dot"));
    }

    // Keyboard event controller: Numbers
    for(let button of buttons){
        if(e.key === button.textContent){
            calculate(button);
        }
    }
});

// Process Controller
function calculate(button) {
    // Backspace
    if(button.id === "delete"){
        numbers.pop() == "." ? dotCounter = 0 : dotCounter;
        screenDisplay.value = numbers.join("");
        screenDisplay.value == "" ? screenDisplay.value += 0 : screenDisplay;
    }
    // Clear all
    else if(button.id === "clear"){
        numbers = [];
        screenDisplay.value = 0;
    }
    // Add dot
    else if(button.id === "dot"){
        if(dotCounter == 0){
            addValue(button);
            dotCounter = 1;
        }
    }
    // Calculate
    else if(button.id === "equal"){ 
        let lastIndex = numbers[numbers.length-1]; 
        if(lastIndex == "+" || lastIndex == "-" || lastIndex == "*" || lastIndex == "/") {
           danger();
        }
        else {
            screenDisplay.value = calculator(screenDisplay.value);
            numbers = [];
            dotCounter = 0;
        } 
    }
    // Transaction control
    else if(button.classList.contains("process")){
        let lastIndex = numbers[numbers.length-1];
        if(lastIndex == "+" || lastIndex == "-" || lastIndex == "*" || lastIndex == "/" || lastIndex == "."){            
            danger();
        }
        else {
            if(numbers.length < 1 && button.textContent !== "-"){
                danger();
            }
            else {
                addValue(button);
                dotCounter = 0;
            }
        }
    }
    // Add a number
    else {
        addValue(button);
    }

}

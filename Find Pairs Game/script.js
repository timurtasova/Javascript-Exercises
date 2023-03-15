// I need to learn use API's. Because when I wanted to restart the game I noticed that there was no data in the array("icons"). So, I will...


"use strict";



//Puzzle icons
let icons = [
    'fa-solid fa-lemon',
    'fa-solid fa-apple-whole',
    'fa-solid fa-leaf',
    'fa-solid fa-seedling',
    'fa-solid fa-carrot',
    'fa-solid fa-pepper-hot',
    'fa-solid fa-cow',
    'fa-solid fa-spider',
    'fa-solid fa-lemon',
    'fa-solid fa-apple-whole',
    'fa-solid fa-leaf',
    'fa-solid fa-seedling',
    'fa-solid fa-carrot',
    'fa-solid fa-pepper-hot',
    'fa-solid fa-cow',
    'fa-solid fa-spider'
];

const container = document.querySelector(".container");

getBoxes(16);

//Creat Boxes
function getBoxes(num) {
    for (let i = 0; i < num; i++) {
        // Create boxes & icons
        let box = document.createElement("button");
        let getIcon = document.createElement("i");
        box.classList.add("box", "active");

        // Assign icons randomly
        let randomNum = Math.floor(Math.random() * icons.length);
        getIcon.className = icons[randomNum];
        getIcon.classList.add("hidden");
        icons.splice(randomNum, 1);

        // Add box & icons to document
        box.appendChild(getIcon);
        container.appendChild(box);
    }
}
console.log(icons.length)


const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restart");

// Restart Game
restartBtn.addEventListener("click", (e)=> {
    // for(let box of boxes){
    //     box.firstElementChild.remove();
    //     box.remove();
    // }
    // getBoxes(16);

window.location.reload();

})


// Event: Choose box
boxes.forEach(box => box.addEventListener("click", (e) => {
   

    box.firstElementChild.classList.remove("hidden");

    // visibility controller
    let visible = document.querySelectorAll("i:not(.hidden)"); 

    // Prevent more than 2 boxes show
    if(visible.length > 2){
        for(let vis of visible){
            vis.classList.add("hidden");
        }
    }

    // When choices are true
    if(visible.length == 2){
        if(visible[0].className === visible[1].className){
            visible.forEach(a => {
                a.parentElement.classList.remove("active");
                a.parentElement.disabled = "disabled";
                a.parentElement.style.backgroundColor = "green";
                a.classList.add("visible");
                a.classList.add("hidden"); 
            })
            console.log(visible)
        }

        // When choices are false
        else if(visible[0].className !== visible[1].className){
            visible.forEach(a => {
                a.classList.add("hidden"); 
            })
        }
        
    }
}));


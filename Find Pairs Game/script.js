// I need to learn use API's. Because when I wanted to restart the game I noticed that there was no data in the array("icons"). So, I will...


"use strict";



// Icon Store
let iconStorage = [
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

let icons;

const container = document.querySelector(".container");

// Pull Icon From Icon Storage
let pull_Icon = () => icons = [...iconStorage];


pull_Icon();
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



const boxes = container.querySelectorAll(".box");
const restartBtn = document.querySelector(".restart");

// Event: Choose box
boxes.forEach(box => box.addEventListener("click", () => {    

    // When the game over
    let inactive = container.querySelectorAll(".box:not(.active)");
    if (inactive.length == boxes.length - 2) {
        // all boxes will be hidden
        boxes.forEach(box => box.classList.add("hidden"));
        restartBtn.style.transform = "translateX(-110%)";
        restartBtn.className = "again";
    }

    // Boxes will be visible for each click
    box.firstElementChild.classList.remove("hidden");

    // Variable of visible boxes
    let visible = container.querySelectorAll("i:not(.hidden)");


    // Check for the boxes which chosen
    if (visible.length == 2) {
        if (visible[0].className === visible[1].className) {
            visible.forEach(vis => {
                vis.parentElement.classList.remove("active");
                vis.parentElement.disabled = "disabled";
                vis.parentElement.style.backgroundColor = "green";
                vis.classList.add("visible");
            });
            for (let vis of visible) {
                vis.classList.add("hidden");
            }
        }
        else {
            // if choices are false, the boxes will be disabled for 0.7s
            boxes.forEach(x => {
                x.disabled = "disabled";
                x.classList.remove("active");
            });
            setTimeout(() => {
                boxes.forEach(x => {
                    x.disabled = false;
                    x.firstElementChild.classList.add("hidden");
                    x.classList.add("active");
                    boxes.forEach(x => {
                        if (x.style.backgroundColor == "green") {
                            x.disabled = "disabled";
                            x.classList.remove("active");
                        }
                    });
                });
            }, 700);
        }
    }
    else if (visible.length > 2) {
        for (let vis of visible) {
            vis.classList.add("hidden");
        }

        // Check: at least 2 of them are the same? 
        switch (visible.length == 3) {
            case visible[0].className === visible[2].className:
                visible[0].parentElement.classList.remove("active");
                visible[0].parentElement.disabled = "disabled";
                visible[0].parentElement.style.backgroundColor = "green";
                visible[0].classList.add("visible");
                visible[2].parentElement.classList.remove("active");
                visible[2].parentElement.disabled = "disabled";
                visible[2].parentElement.style.backgroundColor = "green";
                visible[2].classList.add("visible");
                visible[1].classList.remove("visible");
                visible[1].classList.add("hidden");
                break;
            case visible[1].className === visible[2].className:
                visible[1].parentElement.classList.remove("active");
                visible[1].parentElement.disabled = "disabled";
                visible[1].parentElement.style.backgroundColor = "green";
                visible[1].classList.add("visible");
                visible[2].parentElement.classList.remove("active");
                visible[2].parentElement.disabled = "disabled";
                visible[2].parentElement.style.backgroundColor = "green";
                visible[2].classList.add("visible");
                visible[0].classList.remove("visible");
                visible[0].classList.add("hidden");
                break;
        }
    }
}));

// Restart Game
restartBtn.addEventListener("click", (e) => {
    pull_Icon();
    let newIcon = document.querySelectorAll("i");
    restartBtn.className = "restart";
    restartBtn.style.transform = "translateX(10%)";
    boxes.forEach(box => {
        box.style.backgroundColor = "#E21818";
        box.disabled = false;
        box.classList.add("active");
        box.classList.remove("hidden");
    })
    newIcon.forEach(icon => {
        let randomNum = Math.floor(Math.random() * icons.length);
        icon.className = icons[randomNum];
        icon.classList.add("hidden");
        icons.splice(randomNum, 1);
    });
});

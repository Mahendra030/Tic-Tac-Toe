let body = document.querySelector("body");
let squares = document.querySelectorAll(".square");
let gameStatus = document.querySelector(".status-text");
let newGame = document.querySelector("#new-game-btn");
let resetGame = document.querySelector("#reset-btn");

let playerX = true;
let counter = 0;

// const winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

body.addEventListener("keydown", onEnter);

function onEnter(event){
    if (event.key == "Enter"){
        body.removeEventListener("keydown", onEnter);
        gameStatus.innerHTML = "Player X's Turn";
        resetGame.classList.remove("hidden");
        playGame();        
    }
}

function playGame() {
    for (let index = 0; index < squares.length; index++) {
        const element = squares[index];
        element.addEventListener("click", onClick);
    }
}

function onClick() {
    this.removeEventListener("click", onClick)
    counter++;
    if (playerX) {
        this.firstChild.innerHTML = "X";
        playerX = false;
        gameStatus.innerHTML = "Player O's Turn";
    } else {
        this.firstChild.innerHTML = "O";
        playerX = true;
        gameStatus.innerHTML = "Player X's Turn";
    }
    gameWin();
}

function gameWin() {
    let box = []; 
    for (let i = 0; i < 9; i++) {
        box[i] = document.querySelector(".box" + (i+1)).innerText;
    }
    if(counter == 9) {
        gameStatus.classList.add("winner");
        gameStatus.innerHTML = "Game Draws...";
        disableBoxes();
    }
    checkWin(box, [0,1,2]);
    checkWin(box, [3,4,5]);
    checkWin(box, [6,7,8]);
    checkWin(box, [0,3,6]);
    checkWin(box, [1,4,7]);
    checkWin(box, [2,5,8]);
    checkWin(box, [0,4,8]);
    checkWin(box, [2,4,6]);
}

function checkWin(box, arr) {
    if ((box[arr[0]] === box[arr[1]]) && (box[arr[1]] == box[arr[2]]) && box[arr[1]] != ""){
        gameStatus.classList.add("winner");
        if (playerX) {
            gameStatus.innerHTML = "🎉 Player O Wins 🎉";
            disableBoxes();
        } else {
            gameStatus.innerHTML = "🎉 Player X Wins 🎉";
            disableBoxes();
        }
    }
}

function disableBoxes() {
    for (let index = 0; index < squares.length; index++) {
        const element = squares[index];
        element.removeEventListener("click", onClick);
    }
    resetGame.classList.add("hidden");
    newGame.classList.remove("hidden");
}

resetGame.addEventListener("click",onReset);
newGame.addEventListener("click", onReset);

function onReset() {
    for (let i = 0; i < squares.length; i++) {
        const element = squares[i];
        element.firstChild.innerHTML = "";
    }
    gameStatus.innerHTML = "Press Enter to Play";
    counter = 0;
    playerX = true;
    newGame.classList.add("hidden");
    gameStatus.classList.remove("winner");
    body.addEventListener("keydown", onEnter);
}
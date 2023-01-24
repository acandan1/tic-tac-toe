/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */

const Player = (sign) => {
    return { sign };
}

const gameBoard = (() => {
    const array = [['', '', ''],
    ['', '', ''],
    ['', '', '']];
    function createDisplay() {
        const board = document.getElementsByClassName("gameboard");
        for (let i=0; i < array.length; i++){
            for (let j=0; j < array[i].length; j++) {
                const cell = document.createElement("div");
                cell.className = "game-grid";
                cell.id = i+ " " + j;
                board[0].appendChild(cell);
            } 
        }
    }
    function updateDisplay(row, col, sign) {
        document.getElementById(row +" "+ col).innerHTML = sign;
    }
    function addX(row, col) {
        array[row][col] = "X";
        updateDisplay(row, col, "X");
    }
    function addO(row, col) {
        array[row][col] = "O";
        updateDisplay(row, col, "O");
    }

    return {createDisplay, addX, addO};
})();

const displayController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let currentTurn = playerX;

    const content = document.getElementsByClassName("content");
    const displayString = document.createElement("h1");
    displayString.innerHTML = "Player X's turn!"
    displayString.className = "string";
    content[0].appendChild(displayString);

    let winnerBoolean = false;
    let roundNum = 0;

    const cells = document.getElementsByClassName("game-grid");

    function restartRound() {
        winnerBoolean = false;
        roundNum = 0;
        displayString.innerHTML = "Player X's turn!";
        currentTurn = playerX;
        [...cells].forEach((cell) => {
            cell.innerHTML = "";
        });
    }

    const button = document.createElement("button");
    button.innerHTML = "Restart";
    button.id = "btn";
    button.addEventListener('click', (event) => {
        restartRound();
    });
    content[0].appendChild(button);

    function toggleTurn() {
        if (roundNum === 9) {
            displayString.innerHTML = "It's a tie!"
            return;
        }
        if (currentTurn === playerX) {
            currentTurn = playerO;
            displayString.innerHTML = "Player O's turn!"
        } else {
            currentTurn = playerX;
            displayString.innerHTML = "Player X's turn!"
        }
    }

    
    function checkWinner () {
        const cellCheck = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i=0; i < cellCheck.length; i++) {
            if (cells[cellCheck[i][1]].innerHTML !== "") {
                if (cells[cellCheck[i][1]].innerHTML === cells[cellCheck[i][0]].innerHTML && cells[cellCheck[i][0]].innerHTML === cells[cellCheck[i][2]].innerHTML) {
                    if (cells[cellCheck[i][1]].innerHTML === 'X') {
                        displayString.innerHTML = "Player X has won!";
                    } else {
                        displayString.innerHTML = "Player O has won!";
                    }
                    winnerBoolean = true;
                }
            }
        }
    }

    function display() {
        gameBoard.createDisplay();
        [...cells].forEach((cell) => {
            cell.addEventListener('click', (event) => {
                if (cell.innerHTML !== "" || winnerBoolean === true) {
                    return;
                }
                if (currentTurn === playerO) {
                    gameBoard.addO(cell.id.charAt(0), cell.id.charAt(2));
                } else {
                    gameBoard.addX(cell.id.charAt(0), cell.id.charAt(2));
                }
                roundNum++;
                toggleTurn();
                checkWinner();
            });
        });
    }
    return {display};
})();

displayController.display();



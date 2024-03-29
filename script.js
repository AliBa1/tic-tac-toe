const gameBoard = () => {
    const rows = 3;
    const columns = rows;
    const positions = rows*columns;

    let board = Array.from({ length: positions }, () => null);
    let winningMarker;

    const getBoard = () => { return board; }
    const getWinningMarker = () => { return winningMarker; }

    const empty = () => {
        board = Array.from({ length: positions }, () => null);
    }

    const place = (position, marker) => {
        position = Number(position);    

        if (board[position] == null){
            board[position] = marker;
        } else {
            // console.warn("The spot has already been filled. Try again");
            place(newPosition, marker);
        }
    }
    

    // returns array with [bool, winningMarker] if true
    const checkWin = () => {
        // check each row, column, and cross for a win
        let inARow = 1;
        let marker;

        // check rows
        // start on second spot in row and compare to previous in row
        for(let i=1; i<positions; i+=rows) {
            inARow = 1;
            for (let j=i; j<(i+rows-1); j++) {
                marker = board[j];
                if (marker == board[j-1] && marker != null) {
                    inARow++;
                }

                if (inARow == rows) {
                    winningMarker = marker;
                    console.warn("Win by row");
                    return [true, winningMarker];
                }
            }
        }

        // check columns
        // start on second spot in column and compare to previous in column
        for(let i=rows; i<positions; i++) {
            inARow = 1;
            for (let j=i; j<positions; j+=rows) {
                marker = board[j];
                if (marker == board[j-rows] && marker != null) {
                    inARow++;
                }

                if (inARow == rows) {
                    winningMarker = marker;
                    console.warn("Win by column");
                    return [true, winningMarker];
                }
            }
        }

        // check crosses
        // check both crosses in any shape grid
        inARow = 1;
        for (let j=rows+1; j<positions; j+=(rows+1)) {
            marker = board[j];
            if (marker == board[j-(rows+1)] && marker != null) {
                inARow++;
            }

            if (inARow == rows) {
                winningMarker = marker;
                console.warn("Win by cross 1");
                return [true, winningMarker];
            }
        }
        
        inARow = 1;
        for (let j=rows+1; j<positions-1; j+=(rows-1)) {
            marker = board[j];
            if (marker == board[j-(rows-1)] && marker != null) {
                inARow++;
            }

            if (inARow == rows) {
                winningMarker = marker;
                console.warn("Win by cross 2");
                return [true, winningMarker];
            }
        }

        // check if tied when board full
        // const boardNotFull = board.some(element => element === null);
        const boardFull = board.every(element => element !== null);
        if (winningMarker == undefined && boardFull) {
            winningMarker = 'tie';
            console.warn("Tied");
            return [true, winningMarker];
        }
        
        return false;
    }

    return{ getBoard, getWinningMarker, empty, place, checkWin };
};

const Player = (name, marker, turn) => {
    const playerName = name;
    const playerMarker = marker;
    const isPlayerTurn = turn;

    const getPlayerName = () => { return name; }
    const getPlayerMarker = () => { return marker; }
    const getPlayerTurn = () => { return turn; }

    return { getPlayerName, getPlayerMarker, getPlayerTurn };
};

const displayController = (() => {
    const setupForm = document.querySelector("form");
    let p1InputName;
    let p2InputName;
    let p1InputTurn;
    let p2InputTurn;

    const gameDiv = document.querySelector(".game");
    const gameGrid = document.getElementsByClassName("game-grid");
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");
    const box5 = document.getElementById("box5");
    const box6 = document.getElementById("box6");
    const box7 = document.getElementById("box7");
    const box8 = document.getElementById("box8");
    const box9 = document.getElementById("box9");
    const boxIds = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
    const restartButton = document.querySelector(".restart-button");
    const gameResultText = document.querySelector(".game-result");

    const getP1InputName = () => { return p1InputName; }
    const getP2InputName = () => { return p2InputName; }
    const getP1InputTurn = () => { return p1InputTurn; }
    const getP2InputTurn = () => { return p2InputTurn; }

    const setupGame = () => {
        gameDiv.classList.remove("hide");
        setupForm.classList.add("hide");

        p1InputName = document.getElementsByName('player1_name')[0].value;
        p2InputName = document.getElementsByName('player2_name')[0].value;
        const radioButtons = document.getElementsByName('who_starts');
        let inputFirstTurn;

        if (!p1InputName || !p2InputName) {
            alert('Please fill in all required fields.');
            return;
        }

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                inputFirstTurn = radioButtons[i].value;
                break;
            }
        }

        if (inputFirstTurn == 'player1') {
            p1InputTurn = true;
            p2InputTurn = false;
        } else {
            p1InputTurn = false;
            p2InputTurn = true;
        }

        game.play();
    }

    const showForm = () => {
        gameDiv.classList.add("hide");
        setupForm.classList.remove("hide");
    }

    const updateBoard = (board) => {
        console.log(board);

        for (let i=0; i<boxIds.length; i++) {
            while (boxIds[i].firstChild) {
                boxIds[i].removeChild(boxIds[i].firstChild);
            }

            if (board[i] == "X") {
                const xImg = document.createElement('img');
                xImg.classList.add('X-img');
                xImg.src = "images/alpha-x.svg";
                xImg.alt = "X";
                boxIds[i].appendChild(xImg);
            } else if (board[i] == "O") {
                const oImg = document.createElement('img');
                oImg.classList.add('O-img');
                oImg.src = "images/alpha-o.svg";
                oImg.alt = "O";
                boxIds[i].appendChild(oImg);
            }
        }
    }

    const win = (player) => {
        let name = player.getPlayerName();
        gameResultText.textContent = name + ' has won the game!';
        console.log(name + ' has won the game!');
    }

    const tie = () => {
        gameResultText.textContent = "It's a tie!";
        console.log("It's a tie!");
    }

    const turn = (player) => {
        let name = player.getPlayerName();
        gameResultText.textContent = 'It is ' + name + "'s turn.";
        console.log('It is ' + name + "'s turn.");
    }

    return { setupGame, showForm, updateBoard, win, tie, turn, restartButton, boxIds, getP1InputName, getP2InputName, getP1InputTurn, getP2InputTurn };
})();

const game = (() => {
    let player1;
    let player1name;
    let player1marker;
    let player1turn;

    let player2;
    let player2name;
    let player2marker;
    let player2turn;

    let board;
    let boardArray;
    let winMarker;
    let placePosition;
    let gameOver;

    const checkGameOver = () => {
        gameOver = board.checkWin();
        if (gameOver[0]) {
            winMarker = gameOver[1];
        }
    }

    const switchTurns = () => {
        player1turn = !player1turn;
        player2turn = !player2turn;
    }

    const endGame = (() => {
        if (winMarker == player1marker) {
            displayController.win(player1);
        } else if (winMarker == player2marker) {
            displayController.win(player2);
        } else if (winMarker == 'tie') {
            displayController.tie();
        } else {
            console.error("There is no winner or tie?");
        }
    })

    const newGame = ((p1name, p1marker, p1turn, p2name, p2marker, p2turn) => {
        console.warn("Starting new gane");
        resetGameVariables(p1name, p1marker, p1turn, p2name, p2marker, p2turn);
        displayController.updateBoard(boardArray);
        showTurn();
    });

    const showTurn = () => {
        if (player1turn == true) {
            displayController.turn(player1);
        } else if (player2turn == true) {
            displayController.turn(player2);
        } else {
            console.error("No player has a turn!");
        }
    }

    const playTurn = ((player, playerMarker) => {
        board.place(placePosition, playerMarker);
        displayController.updateBoard(boardArray);
        switchTurns();
        checkGameOver();
        if (winMarker == undefined) {
            showTurn();
        } else {
            endGame();
        }
    })

    const boxClicked = (index) => {
        placePosition = index;
    
        if (player1turn == true) {
            playTurn(player1, player1marker);
        } else if (player2turn == true) {
            playTurn(player2, player2marker);
        } else {
            console.error("No player has a turn!");
        }
    };

    const play = (() => {
        newGame(displayController.getP1InputName(), "X", displayController.getP1InputTurn(), 
                displayController.getP2InputName(), "O", displayController.getP2InputTurn());

        displayController.restartButton.addEventListener("click", () => {
            // newGame();
            displayController.showForm();
        });

        displayController.boxIds.forEach((box, index) => {
            box.addEventListener("click", () => {
                if (winMarker == undefined) {
                    boxClicked(index);
                }
            });
        });
    });

    const resetGameVariables = ((p1name, p1marker, p1turn, p2name, p2marker, p2turn) => {
        player1 = Player(p1name, p1marker, p1turn);
        player1name = player1.getPlayerName();
        player1marker = player1.getPlayerMarker();
        player1turn = player1.getPlayerTurn();
        player2 = Player(p2name, p2marker, p2turn);
        player2name = player2.getPlayerName();
        player2marker = player2.getPlayerMarker();
        player2turn = player2.getPlayerTurn();
        board = gameBoard();
        board.empty();
        boardArray = board.getBoard();
        winMarker = board.getWinningMarker();
        gameOver = false;
    }) 

    return { play };
})();
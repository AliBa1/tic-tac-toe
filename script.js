// fix game win
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
        switch (true) {
            case (position>positions-1 || position<0):
                console.warn("The position you entered is out of range. Try again");
                let newPosition = displayController.getPlace();
                place(newPosition, marker);
                break;
            default:
                if (board[position] == null){
                    board[position] = marker;
                } else {
                    console.warn("The spot has already been filled. Try again");
                    let newPosition = displayController.getPlace();
                    place(newPosition, marker);
                }
                break;

        }     
    }

    // returns array with [bool, winningMarker] if true
    const checkWin = (marker1, marker2) => {
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
                console.warn("Win by cross");
                return [true, winningMarker];
            }
        }
        
        inARow = 1;
        for (let j=(rows*2)-1; j<positions; j+=(rows-1)) {
            marker = board[j];
            if (marker == board[j-(rows-1)] && marker != null) {
                inARow++;
            }

            if (inARow == rows) {
                winningMarker = marker;
                console.warn("Win by cross");
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
    const showBoard = (board) => {
        console.log(board);
    }

    const win = (player) => {
        let name = player.getPlayerName();
        console.log(name + ' has won the game!');
    }

    const tie = () => {
        console.log("It's a tie!");
    }

    const turn = (player) => {
        let name = player.getPlayerName();
        console.log('It is ' + name + "'s turn.");
    }

    function getPlace () {
        const placePosition = prompt('Place your marker (1-9): ');
        console.log(`You entered: ${placePosition}`);
        return placePosition-1;
    }

    return { showBoard, win, tie, turn, getPlace };
})();

// display:
// when hover show a light version of an X or O depending on turn
// make display work with any num of positions (optional)
const displayToSite = (() => {
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
    const gameResultText = document.querySelector(".game-result");

    


    const updateBoard = (board) => {
        // to test
        // board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'O'];

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
            } else {
                // do nothing
            }
        }
    }

    const win = (player) => {
        let name = player.getPlayerName();
        // console.log(name + ' has won the game!');
        gameResultText.textContent = name + ' has won the game!';
    }

    const tie = () => {
        // console.log("It's a tie!");
        gameResultText.textContent = "It's a tie!";
    }

    const turn = (player) => {
        let name = player.getPlayerName();
        // console.log('It is ' + name + "'s turn.");
        gameResultText.textContent = 'It is ' + name + "'s turn.";
    }

    function getPlace () {
        const placePosition = prompt('Place your marker (1-9): ');
        console.log(`You entered: ${placePosition}`);
        return placePosition-1;
    }

    return { updateBoard, win, tie, turn, getPlace };
})();

const game = (() => {
    let player1 = Player("Ali", "X", true);
    let player1name = player1.getPlayerName();
    let player1marker = player1.getPlayerMarker();
    let player1turn = player1.getPlayerTurn();

    let player2 = Player("Spider", "O", false);
    let player2name = player2.getPlayerName();
    let player2marker = player2.getPlayerMarker();
    let player2turn = player2.getPlayerTurn();

    let board = gameBoard();
    let boardArray = board.getBoard();
    let winMarker = board.getWinningMarker();
    let placePosition;
    let gameOver = false;


    function play() {
        playTurn();
        checkGameOver();
        if (winMarker == undefined) {
            play();
        } else {
            endGame();
        }
    }

    const playTurn = () => {
        if (player1turn == true) {
            displayController.turn(player1);
            displayToSite.turn(player1);
            updateBoardGetPosition();
            board.place(placePosition, player1marker);
            switchTurns();
        } else if (player2turn == true) {
            displayController.turn(player2);
            displayToSite.turn(player2);
            updateBoardGetPosition();
            board.place(placePosition, player2marker);
            switchTurns();
        } else {
            console.error("No player has a turn!");
        }

    }

    const checkGameOver = () => {
        gameOver = board.checkWin();
        if (gameOver[0]) {
            winMarker = gameOver[1];
        }
    }

    const updateBoardGetPosition = () => {
        displayController.showBoard(boardArray);
        displayToSite.updateBoard(boardArray);
        placePosition = displayController.getPlace();

    }

    const switchTurns = () => {
        player1turn = !player1turn;
        player2turn = !player2turn;
    }

    const endGame = (() => {
        displayController.showBoard(boardArray);
        displayToSite.updateBoard(boardArray);
        if (winMarker == player1marker) {
            displayController.win(player1);
            displayToSite.updateBoard(boardArray);
            displayToSite.win(player1);
        } else if (winMarker == player2marker) {
            displayController.win(player2);
            displayToSite.updateBoard(boardArray);
            displayToSite.win(player2);
        } else if (winMarker == 'tie') {
            displayController.tie();
            displayToSite.updateBoard(boardArray);
            displayToSite.tie();
        } else {
            console.error("There is no winner or tie?");
        }
    })

    const newGame = (() => {
        board.empty();
        // resetGameVariables(player1name, player1marker, player1turn,
        //                    player2name, player2marker, player2turn);
        resetGameVariables(player1name, player1marker, true, player2name, player2marker, false);
        play();
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
        boardArray = board.getBoard();
        winMarker = board.getWinningMarker();
        gameOver = false;
    }) 

    return { play, newGame, boardArray };
})();


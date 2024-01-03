// check game tie (testing)
// add functions to check gameboard vars
// fix if placing at same position
// fix checkWin

const gameBoard = () => {
    const rows = 3;
    const columns = rows;
    const positions = rows*columns;

    let board = new Array(positions);
    let winningMarker;

    const empty = () => {
        board = new Array(positions);
    }

    const place = (position, marker) => {
        position = Number(position);
        // if (position>positions-1 || position<0) {
        //     console.warn("The position you entered is out of range. Try again");
        //     let newPosition = displayController.getPlace();
        //     place(newPosition, marker);
        // } else {
        //     if (board[position] == null){
        //         board[position] = marker;
        //     } else {
        //         console.warn("The spot has already been filled. Try again");
        //         let newPosition = displayController.getPlace();
        //         place(newPosition, marker);
        //     }
        // }

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

    // returns array with bool, winningMarker if true
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
                console.warn(winningMarker);
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
                console.warn(winningMarker);
                return [true, winningMarker];
            }
        }

        // check if tied when board full
        const boardNotFull = board.some(element => element === null);
        if (winningMarker == null && boardNotFull) {
            winningMarker = 'tie';
            console.warn("Tied");
            return [true, winningMarker];
        }
        
        return false;

    }

    // const getWinMarker = (value) => { 
    //     if (value == undefined) {
    //         return winningMarker; 
    //     } else {
    //         return value;
    //     }
    // }

    return{ board, winningMarker, empty, place, checkWin };
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
    const showTable = (board) => {
        console.log(board);
    }

    const win = (Player) => {
        let name = Player.getPlayerName();
        console.log(name + ' has won the game!');
        // gameBoard.empty();
    }

    const tie = () => {
        console.log("It's a tie!");
        // gameBoard.empty();

    }

    const playerTurn = (name) => {
        // let name = Player.getPlayerName();
        console.log('It is ' + name + "'s turn.");
    }

    function getPlace () {
        const placePosition = prompt('Place your marker (1-9): ');
        console.log(`You entered: ${placePosition}`);
        return placePosition-1;
    }

    return { showTable, win, tie, playerTurn, getPlace };
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
    let boardArray = board.board;
    let winMarker = board.winningMarker;
    let placePosition;
    let gameOver = false;


    function play() {
        // if (turn == player1name) {
        //     displayController.playerTurn(player1name);
        //     displayController.showTable(boardArray);
        //     placePosition = displayController.getPlace();
        //     board.place(placePosition, player1marker);

        //     if (board.checkWin() == true) {
        //         displayController.showTable(boardArray);
        //         displayController.win();
        //         // add more
        //         newGame();
        //     } else {
        //         turn = player2name;
        //         play();
        //     }
        // }

        // if (turn == player2name) {
        //     displayController.playerTurn(player2name);
        //     displayController.showTable(boardArray);
        //     let placePosition = displayController.getPlace();
        //     board.place(placePosition, player2marker);
        //     if (board.checkWin() == true) {
        //         displayController.showTable(boardArray);
        //         displayController.win();
        //         // add more
        //         newGame();
        //     } else {
        //         turn = player1name;
        //     }
        // }

        // while (winMarker == undefined) {
        //     playTurn();
        //     checkGameOver();
        // }
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
            displayController.playerTurn(player1name);
            displayController.showTable(boardArray);
            placePosition = displayController.getPlace();
            board.place(placePosition, player1marker);
            // player1.turn = false;
            // player2.turn = true;
            player1turn = false;
            player2turn = true;
        } else if (player2turn == true) {
            displayController.playerTurn(player2name);
            displayController.showTable(boardArray);
            let placePosition = displayController.getPlace();
            board.place(placePosition, player2marker);
            // player1.turn = true;
            // player2.turn = false;
            player1turn = true;
            player2turn = false;
        } else {
            console.error("No player has a turn!");
        }

    }

    const checkGameOver = () => {
        gameOver = board.checkWin();
        if (gameOver[0]) {
            // winMarker = board.winningMarker;
            winMarker = gameOver[1];
            console.warn(winMarker);
            // endGame();
        }
    }

    const endGame = (() => {
        displayController.showTable(boardArray);
        if (winMarker == player1marker) {
            displayController.win(player1);
        } else if (winMarker == player2marker) {
            displayController.win(player2);
        } else if (winMarker == 'tie') {
            displayController.tie();
        } else {
            console.error("There is no winner or tie?");
        }

        // newGame();
    })

    const newGame = (() => {
        board.empty();
        // player1turn = true;
        // player2turn = false;
        play();
    // }, 5000);
    });

    return { play, newGame };
})();
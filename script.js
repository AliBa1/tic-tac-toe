// const GameBoard = (() => {})
const gameBoard = (function() {
    const rows = 3;
    const columns = rows;
    const positions = rows*columns;

    let board = new Array(positions);

    const empty = () => {
        board = new Array(positions);
    }

    const place = (position, marker) => {
        if (board[position] == NULL){
            board[position] = marker;
        } else {
            console.warn("The spot has already been filled");
        }
        
    }

    const checkWin = (marker1, marker2) => {
        // let index = 0;
        // let firstMarkerPos = [];
        // let secondMarkerPos = [];
        // board.forEach (position => {
        //     index += 1;
        //     if (position == marker1) {
        //         firstMarkerPos.push(index);
        //     } else if (position == marker2) {
        //         secondMarkerPos.push(index);
        //     }
        // })

        // if (firstMarkerPos == [1,2,3] ||
        //     firstMarkerPos == [4,5,6] ||
        //     firstMarkerPos == [7,8,9] ||)

        // check each row, column, and cross for a win instead of ^^^^^
    }

    return{ empty, place, checkWin };
})();

const Player = (() => {

})

const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
  })();

const displayController = (() => {
    const showTable = (board) => {
        // empty the table then fill with new board
    }

    const win = () => {

    }

    const tie = () => {
        
    }

    const playerTurn = (player) => {
        
    }


    return { showTable, win, tie, playerTurn};
})
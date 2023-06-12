const X = 'X';


const Gameboard = (() => {
    let board = [
        '', 'x', 'x',
        '', 'x', 'o',
        'x', 'o', 'o'
    ]

    const getBoard = () => {
        return board;
    }

    return ({
        getBoard
    });

})();

const Gameplay = (() => {

})();

const DisplayController = (() => {

    const renderBoard = () => {
        let board = Gameboard.getBoard();
        for (var i=0; i<board.length; i++) {
            let mark = document.querySelector(`#tile${String(i+1)} > div`);
            if(board[i]) {
                mark.classList.add(board[i]);
            }
        }
    }

    return({
        renderBoard
    })
})();

const Player = (mark) => {
    
}

console.log(Gameboard.getBoard());
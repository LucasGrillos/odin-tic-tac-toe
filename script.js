const X = 'x';
const Y = 'y';

const Player = (mark) => {
    mark = mark;

    const getMark = () => {
        return mark;
    }

    return {
        getMark
    }
}

const Gameboard = (() => {
    let board = [
        '', 'x', 'x',
        '', 'x', 'o',
        'x', 'o', 'o'
    ]

    const getBoard = () => {
        return board;
    }

    const checkTile = (tileNumber) => {
        return(board[tileNumber]);
    }

    return ({
        getBoard, checkTile
    });

})();

const Gameplay = (() => {

    let player1 = Player(X);
    let player2 = Player(Y);
    let turn = 0;

    const createPlayers = (player, mark) => {
    }

    const tryMove = (tileNumber) => {
        if(!Gameboard.checkTile(tileNumber)) {
            console.log("NOT FULL")
        }
        else {
            console.log("FULL");
        }
    }

    return ({
        tryMove
    })

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

    const bindTileListeners = () => {
        let tiles = Array.from(document.getElementById('gameboard').children);
        tiles.map( tile => {
            tile.addEventListener("click", () => {
                Gameplay.tryMove(Number(tile.id[tile.id.length-1]-1));
            })
        })
    }

    return({
        renderBoard, bindTileListeners  
    })
})();


console.log(Gameboard.getBoard());
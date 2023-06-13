const X = 'x';
const Y = 'o';

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
        '', '', '',
        '', '', '',
        '', '', ''
    ]

    const getBoard = () => {
        return board;
    }

    const checkTileFull = (tileNumber) => {
        return(board[tileNumber]);
    }

    const addMark = (tileNumber, mark) => {
        board[tileNumber] = mark;
    }

    return ({
        getBoard, checkTileFull, addMark
    });

})();

const Gameplay = (() => {

    let player1 = Player(X);
    let player2 = Player(Y);
    let turn = 1;

    const createPlayers = (player, mark) => {

    }

    const getCurrentPlayer = () => {
        return (turn % 2 == 0 ? player2.getMark() : player1.getMark() )
    } 

    const clickTile = (tileNumber) => {
        if(!Gameboard.checkTileFull(tileNumber)) {
            Gameboard.addMark(tileNumber, getCurrentPlayer())
            turn++;
            DisplayController.renderBoard();
        }

        else {
            console.log("FULL");
        }
    }

    return ({
        clickTile, 
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
                Gameplay.clickTile(Number(tile.id[tile.id.length-1]-1));
            })
        })
    }

    return({
        renderBoard, bindTileListeners  
    })
})();


console.log(Gameboard.getBoard());
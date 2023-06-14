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
        // returns 'x' or 'o'
    } 

    const clickTile = (tileNumber) => {
        if(!Gameboard.checkTileFull(tileNumber)) {
            Gameboard.addMark(tileNumber, getCurrentPlayer())
            turn++;
            DisplayController.renderBoard();
        }

        else {
            DisplayController.fullFlashRed(tileNumber);
        }
    }

    return ({
        clickTile, 
    })

})();

const DisplayController = (() => {

    const renderBoard = () => {
        let board = Gameboard.getBoard();
        for(var i=0; i<board.length;i++) {
            if(board[i]) {
                let tile = document.querySelector(`#tile${i}`);
                let markDiv = document.createElement('div');
                markDiv.classList.add("mark", String(board[i]));
                tile.appendChild(markDiv);
            }
        }
    }

    const bindTileListeners = () => {
        let tiles = Array.from(document.getElementById('gameboard').children);
        tiles.map( tile => {
            tile.addEventListener("click", () => {
                Gameplay.clickTile(Number(tile.id[tile.id.length-1])); // argument passed is the tile number the mark would be added to.
            })
        })
    }

    const fullFlashRed = (tileNumber) => {
        let tile = document.getElementById(`tile${tileNumber}`);
        tile.classList.add('flash-red');
        setTimeout(function() {
            tile.classList.remove('flash-red')
        }, 100)
    }

    return({
        renderBoard, bindTileListeners, fullFlashRed
    })
})();


console.log(Gameboard.getBoard());
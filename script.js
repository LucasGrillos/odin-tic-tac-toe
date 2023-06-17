const X = 'x';
const O = 'o';

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
    let player2 = Player(O);
    let playerScore = {'x': 0, 'o': 0}
    let turn = 1;

    const winConditions = [
        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,4,8],
        [2,4,6]
    ];

    const createPlayers = (player, mark) => {

    }

    const incrementPlayerScore = (curPlayer) => {
        playerScore[curPlayer]+=1;
    }

    const getCurrentPlayer = () => {
        return (turn % 2 == 0 ? player2.getMark() : player1.getMark() )
        // returns 'x' or 'o'
    }

    const checkWin = (curPlayer) => {
        let board = Gameboard.getBoard();
        let curIndices = [];
        for (var i=0;i<board.length;i++) {
            if (board[i] == curPlayer) {
                curIndices.push(i);
            }
        }

        let winArray = winConditions.filter(winCondition => {
            let checkSubset = winCondition.every((el) => {
                return curIndices.includes(el);
            })

            if(checkSubset) {
                return winCondition;
            }
        }).flat()
        if (winArray.length) {
            incrementPlayerScore(curPlayer);
            DisplayController.displayWin(curPlayer, winArray);
        };
    } 

    const clickTile = (tileNumber) => {
        if(!Gameboard.checkTileFull(tileNumber)) {
            let curPlayer = getCurrentPlayer();
            Gameboard.addMark(tileNumber, curPlayer);
            turn++;
            DisplayController.renderBoard();
            checkWin(curPlayer);
        }

        else {
            DisplayController.fullFlashRed(tileNumber);
        }
    }

    const getPlayerScore = (curPlayer) => {
        return playerScore[curPlayer];
    }

    return ({
        clickTile, getPlayerScore
    })

})();

const DisplayController = (() => {

    let winMessageDiv = document.getElementById('wm-div');
    let winMessageH1 = document.getElementById('wm-h1');
    let xScore = document.getElementById('x-score');
    let oScore = document.getElementById('o-score');
    let tiles = Array.from(document.getElementById('gameboard').children); 

    const tileListener = (event) => {
        Gameplay.clickTile(Number(event.target.id[event.target.id.length-1])); // argument passed is the tile number the mark would be added to.
    }

    const updateScore = () => {
        xScore.textContent = `X SCORE: ${Gameplay.getPlayerScore(X)}`
        oScore.textContent = `O SCORE: ${Gameplay.getPlayerScore(O)}`
    }

    const renderBoard = () => {
        let board = Gameboard.getBoard();
        for(var i=0; i<board.length;i++) {
            let tile = document.querySelector(`#tile${i}`);
            
            if(board[i] && !tile.firstChild) {
                let markDiv = document.createElement('div');
                markDiv.classList.add("mark", String(board[i]));
                tile.appendChild(markDiv);
            }
        }
    }

    const bindTileListeners = () => {
        tiles.map( tile => {
            tile.addEventListener("click", tileListener);
        })
    }

    const displayWin = (curPlayer, winArray) => {
        winMessageH1.textContent = `Player ${curPlayer.toUpperCase()} wins!`
        winMessageDiv.classList.add("add-visibility")
        updateScore();

        for (var i = 0; i<=8; i++) {
            if (winArray.includes(i)) {
                document.getElementById(`tile${i}`).classList.add('win-green')
            }
        }

        tiles.map( tile => {
            tile.removeEventListener("click", tileListener);
        })

        //document.addEventListener
    }

    const fullFlashRed = (tileNumber) => {
        let tile = document.getElementById(`tile${tileNumber}`);
        tile.classList.add('flash-red');
        setTimeout(function() {
            tile.classList.remove('flash-red')
        }, 100)
    }

    return({
        renderBoard, bindTileListeners, fullFlashRed, displayWin, updateScore
    })
})();


console.log(Gameboard.getBoard());
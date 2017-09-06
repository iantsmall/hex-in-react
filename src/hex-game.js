import React from "react";
import HexBoard from "./hex-board.js";
import {convertArrayToMatrix} from "./utils.js";
import {gridPoints} from "react-hex";

const getNeighbors = (hex, matrix) => {
    const getHex = (x, y) => {
        return matrix[y] !== undefined
            ? matrix[y][x]
            : undefined
    };
    const upLeft = getHex(hex.x, hex.y - 1);
    const upRight = getHex(hex.x + 1, hex.y - 1);
    const left = getHex(hex.x - 1, hex.y);
    const right = getHex(hex.x + 1, hex.y);
    const downLeft = getHex(hex.x - 1, hex.y + 1);
    const downRight = getHex(hex.x, hex.y + 1);
    return [
        upLeft,
        upRight,
        right,
        downRight,
        downLeft,
        left
    ];
};

const findPath = (origin, desination, hexes) => {
    //convert raw hexes into more useful matrix storage
    const originType = hexes[origin];
    const destinationType = hexes[desination];
    if (originType !== destinationType) {
        return false; //return false, as these are not matching hexes
    }
    //store board width/height size (calculation not cheap)
    const bsize = Math.sqrt(hexes.length);
    //make new hexArray containing grid data (ensures filled in array)
    const hexArray = gridPoints("pointy-topped", 1, 1, 1, bsize, bsize).map((point, index) => {
        return {owner: hexes[index], x: point.gridX, y: point.gridY, visited: false};
    });
    //get origin and desination hexes
    const originHex = hexArray[origin];
    const destinationHex = hexArray[desination];
    //convert array to matrix
    const hexGrid = convertArrayToMatrix(hexArray, bsize);
    //simple breadth first search for path in matrix of hexes
    const toVisit = [originHex]; //hexes to visit
    //while toVisit is not empty visit the next hex.
    console.log("Starting path finding " + originHex.owner);
    for (let nextHex = toVisit.shift(); nextHex !== undefined; nextHex = toVisit.shift()) {
        console.log("    Visting" + JSON.stringify(nextHex));
        nextHex.visited = true;
        //check if next hex is the desintation, return true if yes
        if (nextHex === destinationHex) {
            return true; //we've found our destination, we can return true
        }
        // add neighbors to toVisit IF they have the same owner AND they haven't already been visited
        const neighbors = getNeighbors(nextHex, hexGrid);
        for (let nextNeighbor = neighbors.shift(); neighbors.length > 0; nextNeighbor = neighbors.shift()) {
            const isVisitable = nextNeighbor !== undefined && nextNeighbor.owner === nextHex.owner && !nextNeighbor.visited;
            if (isVisitable) {
                console.log("        Adding" + JSON.stringify(nextNeighbor));
                toVisit.push(nextNeighbor);
            }
        }
    }
    console.log("Finished path finding");
    return false;
};

const calculateWinner = (hexes) => {
    //calculate winner of HexTile game by determining which has a winning path
    const isblueWinner = findPath(0, hexes.length - 1, hexes);
    const isRedWinner = !isblueWinner && findPath(1, hexes.length - 2, hexes);
    if (isblueWinner) {
        return "blue";
    } else if (isRedWinner) {
        return "red";
    }
};

class HexGame extends React.Component {
    constructor(props) {
        super(props);
        const initHexes = Array(Math.pow(props.boardSize + 2, 2));
        const boardSize = props.boardSize + 2;
        for (let i = 0; i < boardSize; ++i) {
            const top = i;
            const bottom = initHexes.length - 1 - i;
            const left = i * boardSize;
            const right = left + boardSize - 1;
            //fill in top and bottom w/ red, fill in left and right w/ blue
            initHexes[top] = "red";
            initHexes[left] = "blue";
            initHexes[right] = "blue";
            initHexes[bottom] = "red";
        }
        for (let i = 0; i < boardSize; ++i) {}
        this.state = {
            history: [
                {
                    hexes: initHexes
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const hexes = Array.from(current.hexes);
        //check if this hex is alredy defined OR if there is already a winner
        if (hexes[i] || calculateWinner(hexes)) {
            return;
        }
        hexes[i] = this.state.xIsNext
            ? "red"
            : "blue";
        this.setState({
            history: history.concat([
                {
                    hexes: hexes
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

    render() {
        const boardSize = this.props.boardSize + 2;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.hexes);

        const moves = history.map((step, move) => {
            const desc = move
                ? "Move #" + move
                : "Game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext
                ? "Red"
                : "Blue");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <HexBoard type="pointy-topped" size={10} width={boardSize} height={boardSize} oX={4} oY={4} hexes={current.hexes} onClick={key => this.handleClick(key)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default HexGame;

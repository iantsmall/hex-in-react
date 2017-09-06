import React from "react";
import HexBoard from "./hex-board.js";
import {convertArrayToMatrix} from "./utils.js";
import {gridPoints} from "react-hex";

const calculateWinner = (hexes) => {
    function findPath(origin, desination, hexes) {
        const originType = hexes[origin];
        const destinationType = hexes[desination];
        if (originType !== destinationType) {
            return []; //return an empty path, as these are not matching hexes
        }
        //create matrix of hexes
        const bsize = Math.sqrt(hexes.length); //store board width/height size;
        //make new hexArray containing grid data (ensures filled in array)
        const hexArray = gridPoints("pointy-topped", 1, 1, 1, bsize, bsize).map((point, index) => {
            return {owner: hexes[index], x: point.gridX, y: point.gridY};
        });
        //convert array to matrix
        const hexGrid = convertArrayToMatrix(hexArray, bsize);
        //TODO implement simple depth first search for path in matrix of hexes
        const path = [];
        return path;
    }
    //TODO calculate winner of HexTile game
    const path = findPath(0, hexes.length - 1, hexes);
    return path !== undefined && path.length > 0;
}


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
        if (calculateWinner(hexes) || hexes[i]) {
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

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Hex, { gridPoints } from "react-hex";

class Board extends React.Component {
    getType() {
        let { type } = this.props;
        return type === undefined ? "pointy-topped" : type;
    }

    getSize() {
        let { size } = this.props;
        return size === undefined ? 10 : size;
    }

    getOffsetX() {
        let { oX } = this.props;
        return oX === undefined ? 100 : oX;
    }

    getOffsetY() {
        let { oY } = this.props;
        return oY === undefined ? 100 : oY;
    }

    getWidth() {
        let { width } = this.props;
        return width === undefined ? 25 : width;
    }

    getHeight() {
        let { height } = this.props;
        return height === undefined ? 25 : height;
    }

    getOnClick() {
        let { onClick } = this.props;
        return onClick === undefined
            ? i => {
                  console.log("No onClick defined, click unhandled");
              }
            : onClick;
    }

    render() {
        const type = this.getType();
        const size = this.getSize();
        const oX = this.getOffsetX();
        const oY = this.getOffsetY();
        const width = this.getWidth();
        const height = this.getHeight();
        const board = this;
        const onClick = this.getOnClick();

        const points = gridPoints(type, oX, oY, size, width, height);

        const hexes = points.map((point, i) => {
            const { props } = point;
            const key = i;
            const owner = board.props.hexes[key];
            const fill = owner === undefined ? "white" : owner;
            return (
                <Hex
                    key={key}
                    {...props}
                    fill={fill}
                    stroke="grey"
                    onClick={() => onClick(key)}
                />
            );
        });

        //return the gameboard containing hexes
        return (
            <svg width="100%" height="100%">
                {hexes}
            </svg>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    hexes: []
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
        hexes[i] = this.state.xIsNext ? "red" : "blue";
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
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.hexes);

        const moves = history.map((step, move) => {
            const desc = move ? "Move #" + move : "Game start";
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
            status = "Next player: " + (this.state.xIsNext ? "Red" : "Blue");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        type="pointy-topped"
                        size={10}
                        width={9}
                        height={9}
                        oX={10}
                        oY={10}
                        hexes={current.hexes}
                        onClick={key => this.handleClick(key)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(hexes) {
    //TODO calculate winner of HexTile game
    return null;
}

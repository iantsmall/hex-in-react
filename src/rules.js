import React from "react";
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';

class Rules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render(){
        const that = this;
        const handleClose = () => that.close();
        return (
            <Modal id="coming-soon" show={this.state.showModal} onHide={ handleClose }>
                <Modal.Header closeButton>
                <Modal.Title>Rules of Hex</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hex is a simple board game for two players</p>
                    <div id="rules-origin">
                        <h2>Origin</h2>
                        <p>Hex is a board game invented in 1942 by Peit Hein and independently re-invented in 1948 by John Nash.</p>
                    </div>
                    <div id="rules-description">
                        <h2>Description</h2>
                        <p>
                            The hex board is an {this.props.boardSize}x{this.props.boardSize} hexagonal tiling in a rhombus shape.
                            Two players, red and blue, are assigned opposite edges of the board.
                            The board is empty at the start of the game, and the players have to put the pieces, one by one.
                        </p>
                    </div>
                    <div id="rules-objective">
                        <h2>Objective</h2>
                        <p>The goal for each player is to establish an unbroken chain with the own pieces connecting the two sides of the board marked with the own colour.</p>
                    </div>
                    <div id="rules-playing">
                        <h2>Playing the game</h2>
                        <ul>
                            <li>The color that every player will use is randomly choiced. The player with red pieces makes the first move.</li>
                            <li>Moves entails in placing an own piece on an unoccupied hexagon; placed pieces cannot be moved.</li>
                            <li>There is no limit for the number of pieces, so that players place new pieces until one of them reaches the victory.</li>
                            <li>Optional: The player who makes the first move has some advantage; between expert players, this advantage is almost definitive. In order to balance the options to win the game, the swap option is used: after the first move, the player who uses blue pieces has the option to swap colors instead of moving; if so, the other player (the one who made the first move) has to make a new move, but from now on he has to use blue pieces.</li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

Rules.propTypes = {
    boardSize: PropTypes.number.isRequired,
};

export default Rules;

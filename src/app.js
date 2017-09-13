import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Grid, Row, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import HexGame from "./hex-game.js";
import Rules from "./rules.js";
import ComingSoonModal from "./coming-soon-modal.js";

// ========================================

class App extends React.Component {

    render() {

        const hexGame = (<HexGame boardSize={9} ref={(childRef) => { this.board = childRef; }}/>);
        const handleHexClick = (() => {
            ReactDOM.render(hexGame, document.getElementById("viewport"));
        });

        const rulesModal = (<Rules ref={(childRef) => { this.rulesModal = childRef; }}/>);
        const handleRulesClick = (() => {
            this.rulesModal.open();
        });

        const comingSoonModal = ( <ComingSoonModal ref={(childRef) => { this.comingSoonModal = childRef; }}/> );
        const handleComingSoonClick = (() => {
            this.comingSoonModal.open();
        });

        const handleSelect = ((navFunction) => {
            navFunction();
        });

        return (
            <Grid id="app">
                <Row>
                    <Col xs={12}>
                        <div id="alert"></div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
                            <NavItem eventKey={handleHexClick} href="/home">Hex in React</NavItem>
                            <NavItem eventKey={handleRulesClick} title="Item">Game Rules</NavItem>
                            <NavItem eventKey={handleComingSoonClick} title="Item">Coming Soon</NavItem>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Jumbotron id="viewport">
                            <HexGame boardSize={9}/>
                        </Jumbotron>
                    </Col>
                </Row>
                {comingSoonModal}
                {rulesModal}
            </Grid>
        )
    }
}

export default App;

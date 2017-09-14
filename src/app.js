import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap';
import HexGame from "./hex-game.js";
import Rules from "./rules.js";
import ComingSoonModal from "./coming-soon-modal.js";

// ========================================

class App extends React.Component {

    render() {

        //define child components
        const hexGame = (<HexGame boardSize={9} ref={(childRef) => {this.board = childRef;}}/>);
        const rulesModal = (<Rules boardSize={9} ref={(childRef) => {this.rulesModal = childRef;}}/>);
        const comingSoonModal = (<ComingSoonModal ref={(childRef) => {this.comingSoonModal = childRef;}}/>);

        const handleRulesClick = (() => {
            this.rulesModal.open();
        });

        const handleComingSoonClick = (() => {
            this.comingSoonModal.open();
        });

        const handleSelect = ((navFunction) => {
            navFunction();
        });

        const navbarInstance = (
            <Navbar inverse collapseOnSelect onSelect={handleSelect}>
                <Navbar.Header>
                    <Navbar.Brand><a href="#">Hex in React</a></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Navbar.Text>
                            A "React in Every Framework" Project
                        </Navbar.Text>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={handleRulesClick} title="Item">Game Rules</NavItem>
                        <NavItem eventKey={handleComingSoonClick} title="Item">Coming Soon</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

        return (
            <div id="app">
                {navbarInstance}
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <div id="alert"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Jumbotron id="viewport" className="modal-container">
                                <HexGame boardSize={9}/> {comingSoonModal}
                                {rulesModal}
                            </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default App;

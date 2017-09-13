import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
    Button,
    Alert,
    Grid,
    Row,
    Col,
    Jumbotron,
    Navs,
    Nav,
    NavItem,
} from 'react-bootstrap';
import HexGame from "./hex-game.js";
import Rules from "./rules.js";

// ========================================

class App extends React.Component {

    handleRulesClick() {
        let rules = (<Rules boardSize={9}/>);
        const alert = (<Alert bsStyle="info">Loaded Rules</Alert>);
        ReactDOM.render( alert, document.getElementById("alert"));
        ReactDOM.render( rules, document.getElementById("viewport"));
    }

    handleHexClick() {
        let hexGame = (<HexGame boardSize={9}/>);
        const alert = (<Alert bsStyle="info">Loaded Hex Game</Alert>);
        ReactDOM.render(alert, document.getElementById("alert"));
        ReactDOM.render(hexGame, document.getElementById("viewport"));

    }

    render() {
        let handleSelect = ((navFunction) => {
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
                            <NavItem eventKey={this.handleHexClick} href="/home">Hex in React</NavItem>
                            <NavItem eventKey={this.handleRulesClick} title="Item">Game Rules</NavItem>
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
            </Grid>
        )
    }
}

export default App;

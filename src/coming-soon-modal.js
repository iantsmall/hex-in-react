import React from "react";
import {Modal} from 'react-bootstrap';

class ComingSoonModal extends React.Component {

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
                <Modal.Title>Coming Soon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This is a simple road map for coming features.</p>
                    <div id="planned-features">
                        <h2>Planned Features</h2>
                        <ul>
                            <li>Improved UI for rules and features</li>
                            <li>Nicer framing graphics for game</li>
                            <li>Fancier board and tile images</li>
                            <li>Improved </li>
                        </ul>
                    </div>
                    <div id="bug-fixes">
                        <h2>Known Bugs</h2>
                        <ul>
                            <li>Move steps cause game panel to grow continiously</li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ComingSoonModal;

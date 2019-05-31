import React from "react";
import {Modal} from 'react-bootstrap';

class ComingSoonModal extends React.Component {

    constructor(props) {
        super(props);
        //TODO take coming "features" from properties as an array of strings
        //TODO take known "bugs" from properties as an array of strings
        this.state = {
            showModal: false,
            features: [
                "Improved UI for rules and features",
                "Nicer framing graphics for game",
                "Fancier board and tile images",
                "improved 'Nav' menu",
                "Conversion to react-redux for state management"
            ],
            bugs: []
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

        const features = this.state.features.map((feature, idx) => {
            return (<li key={"feature_" + idx}>{feature}</li>);
        });

        const bugs = this.state.bugs.map((bug, idx) => {
            return (<li key={"bug_" + idx}>{bug}</li>);
        });

        return (
            <Modal id="coming-soon" show={this.state.showModal} onHide={ handleClose }>
                <Modal.Header closeButton>
                <Modal.Title>Coming Soon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This is a simple road map for coming features.</p>
                    <div id="planned-features">
                        <h2>Planned Features</h2>
                        <ul>{features}</ul>
                    </div>
                    <div id="bug-fixes">
                        <h2>Known Bugs</h2>
                        <ul>{bugs}</ul>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ComingSoonModal;
